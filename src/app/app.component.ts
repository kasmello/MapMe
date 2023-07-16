import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalService } from './global.service';
import { transitionFadeLeft } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [transitionFadeLeft]
})
export class AppComponent {
  title = 'MapMe';
  dark = true;
  constructor (private titleService: Title, private globalService: GlobalService) {
    this.titleService.setTitle('🗺️MapMe - Travel in convenience');
  }

  ngOnInit() {
    this.globalService.currLightingMode.subscribe((value) => {
      this.dark = value;
    });
  }

  switchMode() {
    this.globalService.changeLightMode();
    console.log(`dark mode set to ${this.dark}`)
  }
}
