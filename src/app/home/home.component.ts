import { Component, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { GlobalService } from '../global.service';
import { FormBuilder, FormArray } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
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
  mode?: string;
  changeList?: any;
  currIndex: number;

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
    this.mode = global.mode;
    this.changeList = global.changeList;
  }

  ngOnInit() {
    this.formArray.push(this.formBuilder.control(''));
    this.formArray.push(this.formBuilder.control(''));
    // this.inputSubject.pipe(debounceTime(600)).subscribe(value => {
      // Execute your action here
      // console.log('Input not edited for some time: calling api for', value);
      // if (this.autocomplete !== undefined) {
        // this.autocomplete.getPlace();
      // }
      
    // });
  }

  ngAfterViewInit() {
    
    setTimeout(() => {this.addresstexts.forEach(ref => this.getPlaceAutocomplete(ref))},500);
  }

  async addItem(i: number) {
    this.formArray.insert(i + 1, this.formBuilder.control(''));
    await setTimeout(() => {this.addresstexts.forEach(ref => this.getPlaceAutocomplete(ref))},10);
  }

  removeItem(i: number) {
    this.formArray.removeAt(i);
  }

  onDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.formArray.controls, event.previousIndex, event.currentIndex);
  }

  updateControlValue(value: any): void {
    const control = this.formArray.controls[this.currIndex];
    if (value != null) {
      control.setValue(value);
      
    }
    console.log(value)
    

  }

  updateIndex(i: number) {
    this.currIndex = i
  }

  getPlaceAutocomplete(e: ElementRef) {
    
    const autocomplete = new google.maps.places.Autocomplete(e.nativeElement,
        {
            componentRestrictions: { country: 'AU' }, // 'establishment' / 'address' / 'geocode'
            fields: ['place_id']
        });
    autocomplete.addListener('place_changed', () => this.updateControlValue(autocomplete.getPlace().place_id));
  }


  updateList() {
    this.global.changeList(this.formArray.controls.map(item => item.value));
  }

  // invokeEvent(place: Object) {
  //     this.setAddress.emit(place);
  // }

}
