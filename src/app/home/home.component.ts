import { Component } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  destinationCount = 1
  convertToOrdinal ?: any;
  constructor(private global: GlobalService) {
    this.convertToOrdinal = (item: number) => {
      if (this.destinationCount === 1) {
        return ""
      } else {
        return global.convertToOrdinal(item) + " "
      }
      
    }
  }

  incrementDestinationCount() {
    this.destinationCount += 1;
  }

  decrementDestinationCount() {
    this.destinationCount -= 1;
  }

  getRange(count: number): number[] {
    return Array(count).fill(0).map((_, index) => index + 1);
  }
}
