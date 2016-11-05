/*
 * Copyright 2016 SWM Services GmbH
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

declare var EXIF: any;

const MAX_ALLOWED_FILE_SIZE: number = 15 * 1024 * 1024;
const MIN_SCALED_FILE_SIZE: number = 2 * 1024 * 1024;

const IMAGE_MAX_BORDER_LENGTH: number = 1600;


/**
 *
 * @author xie.fei
 * @since 1.0
 */

@Injectable()
export class FmImageScaleService {

  private isSafari: boolean = false;

  constructor() {
    let userAgent = navigator.userAgent.toLowerCase();
    this.isSafari = userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1;
  }

  needScale(file: File): boolean {
    if (!file.type.match(/image.*/)) {
      throw 'Ausgewählte File ist kein Image';
    }

    if (file.size > MAX_ALLOWED_FILE_SIZE) {
      throw 'Dateigröße ist größer als: ' + MAX_ALLOWED_FILE_SIZE;
    }

    // Falls die Dateigröße größer als oder gleich 2MB ist, wird true geliefert.
    return file.size >= MIN_SCALED_FILE_SIZE;
  }



  scaleImage(file: File): Observable<File> {

    return Observable.create((observer) => {
      let observableImage: Observable<HTMLImageElement> = this.convertFileToImage(file);
      observableImage.subscribe((image) => {

        document.body.appendChild(image);

        let orientation = undefined;
        if (this.isSafari) {
          let orientation = EXIF.getTag(image, 'Orientation');
        }
        let canvas = this.reduceImageSize(image, file.name, orientation);

        document.body.appendChild(canvas);

        canvas.toBlob((blob) => {
          let b: any = blob;
          b.lastModifiedDate = new Date();
          b.name = name;
          observer.next(<File>b);
        }, 'image/jpeg', 0.8);

      });
    });
  }


  convertFileToImage(file: File): Observable<HTMLImageElement> {
    return Observable.create((observer) => {
      let fileReader = new FileReader();
      fileReader.onload = (event: Event) => {
        let image = new Image();
        image.onload = () => {
          observer.next(image);
        };
        image.src = fileReader.result;

      };
      fileReader.readAsDataURL(file);
    });
  }


  reduceImageSize(image: HTMLImageElement, name: string, orientation?: number) {
    let w = 0, h = 0;
    if (image.width > IMAGE_MAX_BORDER_LENGTH || image.height > IMAGE_MAX_BORDER_LENGTH) {
      if (image.width > image.height) {
        w = IMAGE_MAX_BORDER_LENGTH;
        h = Math.round(image.height * (IMAGE_MAX_BORDER_LENGTH / image.width));
      } else {
        h = IMAGE_MAX_BORDER_LENGTH;
        w = Math.round(image.width * (IMAGE_MAX_BORDER_LENGTH / image.height));
      }
    } else {
      w = image.width;
      h = image.height;
    }

    let canvas = document.createElement('canvas');
    // safari does for edgewise images only set the orientation
    if (orientation && ( orientation === 6 || orientation === 8)) {
      canvas.width = h;
      canvas.height = w;
    } else {
      canvas.width = w;
      canvas.height = h;
    }

    let context = canvas.getContext('2d');
    if (orientation) {
      // http://stackoverflow.com/questions/20600800/
      if (orientation === 6) {
        context.transform(0, 1, -1, 0, h, 0);
      } else if (orientation === 3) {
        context.transform(-1, 0, 0, -1, w, h);
      } else if (orientation === 8) {
        context.transform(0, -1, 1, 0, 0, w);
      }
    }

    context.drawImage(image, 0, 0, w, h);

    return canvas;

  }
}
