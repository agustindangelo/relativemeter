import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface ISpinnerState {
  show: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  public spinner$: Subject<any>;

  constructor() {
    this.spinner$ = new Subject<any>();
  }

  show() {
    this.spinner$.next(true);
  }

  hide() {
    this.spinner$.next(false);
  }
}
