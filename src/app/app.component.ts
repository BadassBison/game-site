import { MediaMatcher } from '@angular/cdk/layout';
import {ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'game-site';

  constructor() {}

  log(evt: any) {
    console.log({ evt });
  }
}
