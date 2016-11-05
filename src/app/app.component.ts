import {Component} from '@angular/core';
import {FmImageScaleService} from './service/fm-image-scale.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private fmImageService: FmImageScaleService) {
  }

  onImageSelected(event: any) {

    let file: File = event.target.files[0];
    try {
      console.log("vorher size: " + file.size);
      if (this.fmImageService.needScale(file)) {
        var scaledImage = this.fmImageService.scaleImage(file);
        scaledImage.subscribe((value: File) => {
          console.log("new size: " + value.size);
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
}
