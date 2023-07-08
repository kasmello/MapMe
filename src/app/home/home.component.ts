import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  destinationCount = 1
  convertToOrdinal ?: any;
  formArray: FormArray;
  constructor(private global: GlobalService, private formBuilder: FormBuilder) {
    this.convertToOrdinal = (item: number) => {
      if (this.destinationCount === 1) {
        return ""
      } else {
        return global.convertToOrdinal(item) + " "
      }
      
    }
    this.formArray = this.formBuilder.array([]);
  }

  ngOnInit() {
    this.formArray.push(this.formBuilder.control(''));
  }

  addItem(i: number) {
    this.destinationCount += 1;
    this.formArray.insert(i + 1, this.formBuilder.control(''));
  }

  removeItem(i: number) {
    this.destinationCount -= 1;
    this.formArray.removeAt(i);
  }

  onDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.formArray.controls, event.previousIndex, event.currentIndex);
  }

}
