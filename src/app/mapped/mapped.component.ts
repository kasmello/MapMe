import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { transitionFadeLeft } from '../animations';

@Component({
  selector: 'app-mapped',
  templateUrl: './mapped.component.html',
  styleUrls: ['./mapped.component.scss'],
  animations: [transitionFadeLeft]
})
export class MappedComponent {
  loading = false;
  dark = true;
  constructor(private globalService: GlobalService) {

  }

  ngOnInit() {
    this.globalService.currLightingMode.subscribe((value) => {
      this.dark = value
    })
  }

}
