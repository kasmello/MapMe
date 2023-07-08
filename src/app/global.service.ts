import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

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
