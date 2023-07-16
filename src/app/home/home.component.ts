import { Component, ViewChildren, ElementRef, AfterViewInit, QueryList } from '@angular/core';
import { GlobalService } from '../global.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { fadeInAnimation } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInAnimation]
})
export class HomeComponent {
  private inputSubject = new Subject<string>();
  @ViewChildren('inputRef') addresstexts:  QueryList<ElementRef>;
  placeholderGenerator ?: any;
  formArray: FormArray;
  autocomplete: google.maps.places.Autocomplete | undefined;

  constructor(private global: GlobalService, private formBuilder: FormBuilder) {
    this.placeholderGenerator = (item: number) => {
      if (item === 0) {
        return "Enter your starting point"
      }
      else if (this.formArray.length === 2) {
        return "Enter your destination"
      } else {
        return `Enter your ${global.convertToOrdinal(item)} destination`
      }
      
    }
    this.formArray = this.formBuilder.array([]);
  }

  ngOnInit() {
    this.formArray.push(this.formBuilder.control(''));
    this.formArray.push(this.formBuilder.control(''));
    this.inputSubject.pipe(debounceTime(600)).subscribe(value => {
      // Execute your action here
      console.log('Input not edited for some time: calling api for', value);
      if (this.autocomplete !== undefined) {
        // this.autocomplete.getPlace();
      }
      
    });
  }

  ngAfterViewInit() {
    this.addresstexts.forEach(ref => this.getPlaceAutocomplete(ref));
  }

  async addItem(i: number) {
    this.formArray.insert(i + 1, this.formBuilder.control(''));
    console.log(this.formArray.controls.map(control => control.value))
    await this.delay(10);
    this.addresstexts.forEach(ref => this.getPlaceAutocomplete(ref));
  }

  removeItem(i: number) {
    this.formArray.removeAt(i);
  }

  onDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.formArray.controls, event.previousIndex, event.currentIndex);
  }

  updateControlValue(i: number, value: string): void {
    const control = this.formArray.controls[i];
    control.setValue(value);
    // this.inputSubject.next(value);
  }

  getPlaceAutocomplete(e: ElementRef) {
    const autocomplete = new google.maps.places.Autocomplete(e.nativeElement,
        {
            componentRestrictions: { country: 'AU' } // 'establishment' / 'address' / 'geocode'
        });
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  // invokeEvent(place: Object) {
  //     this.setAddress.emit(place);
  // }

}
