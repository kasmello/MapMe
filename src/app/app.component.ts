import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalService } from './global.service';
import { transitionFadeLeft } from './animations';
import { env } from 'src/env';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [transitionFadeLeft]
})
export class AppComponent {
  title = 'MapMe';
  dark = true;
  private key = env.key;
  private geocodingUrl = env.geocodingUrl;
  constructor (private titleService: Title, private globalService: GlobalService, private router: Router) {
    this.titleService.setTitle('🗺️MapMe - Travel in convenience');
  }

  ngOnInit() {
    this.router.navigate(['/'])
    this.globalService.currLightingMode.subscribe((value) => {
      this.dark = value;

    });
    this.loadScript(`https://maps.googleapis.com/maps/api/js?key=${this.key}&libraries=places&loading=async`)
  }

  initMap() {

  }

  async loadScript(name: string) {
    let script = await document.createElement('script');
    script.type = await 'text/javascript';
    script.src = await name;
    await document.getElementsByTagName('head')[0].appendChild(script);
    await console.log('Script Loaded');

  }

  initialiseNavigation() {
    this.router.navigate(['/'])
  }


  switchMode() {
    this.globalService.changeLightMode();
    console.log(`dark mode set to ${this.dark}`)
  }
}
