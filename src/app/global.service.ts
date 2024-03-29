import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private dark = new BehaviorSubject<boolean>(true);
  private destinationList = new BehaviorSubject<any>([]);

  currLightingMode = this.dark.asObservable();
  currDestinations = this.destinationList.asObservable();


  mode = 'desktop';
  constructor(private platform: Platform) {
    if (this.platform.ANDROID||this.platform.IOS) {
      this.mode = 'mobile';
    } 
    console.log("MODE: " + this.mode)
  }
  

  changeLightMode() {
    this.dark.next(!this.dark.value)
  }



  changeList(newList: string[]) {
    this.destinationList.next(newList)
  }

 

  


  convertToOrdinal = (number: number) => {
    const suffixes: { [key: number]: string } = {
      1: "st",
      2: "nd",
      3: "rd"
    };
  
    const suffix = (number % 10 in suffixes && number % 100 - number % 10 !== 10)
      ? suffixes[number % 10]
      : "th";
  
    return number.toString() + suffix;
  }



}
