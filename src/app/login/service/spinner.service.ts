import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  @Output()
  spinnerEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  getSpinnerEvent = () => {
    return this.spinnerEvent;
  }

  showSpinner = (value: boolean) => {
    this.spinnerEvent.emit(value);
  }
}
