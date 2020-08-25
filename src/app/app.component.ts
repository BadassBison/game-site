import { MediaMatcher } from '@angular/cdk/layout';
import {ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'game-site';
  mobileQuery: MediaQueryList;

  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    // this.mobileQuery = media.matchMedia('(max-width: 600px)');
    // this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    // this.mobileQuery.addListener(this.mobileQueryListener);
  }
}
