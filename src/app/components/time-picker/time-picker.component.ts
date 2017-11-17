import {FocusMonitor} from '@angular/cdk/a11y';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Component, ElementRef, Input, OnDestroy, Renderer2, forwardRef} from '@angular/core';
import {FormBuilder, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs/Subject';

import { Timer } from '../../models/timer.model';

@Component({
  selector: 'time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
  providers: [
    {provide: MatFormFieldControl, useExisting: TimePickerComponent, multi: true},
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true
    }
  ],
  host: {
    '[class.floating]': 'shouldPlaceholderFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class TimePickerComponent implements MatFormFieldControl<Timer>, OnDestroy, ControlValueAccessor {

  static nextId = 0;
  
  parts: FormGroup;

  stateChanges = new Subject<void>();

  focused = false;

  ngControl = null;

  errorState = false;

  controlType = 'time-picker';

  get empty() {
    let n = this.parts.value;
    return !n.hrs && !n.mins && !n.meridiem;
  }

  get shouldPlaceholderFloat() {
    return this.focused || !this.empty;
  }

  id = `time-picker-${TimePickerComponent.nextId++}`;

  describedBy = '';

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): Timer | null {
    let n = this.parts.value;
    if (n.hrs.length == 2 && n.mins.length == 2 && n.meridiem.length == 2) {
      return new Timer(n.hrs, n.mins, n.meridiem);
    }
    return null;
  }
  set value(tel: Timer | null) {
    tel = tel || new Timer('', '', '');
    this.parts.setValue({hrs: tel.hrs, mins: tel.mins, meridiem: tel.meridiem});
    this.stateChanges.next();
  }

  writeValue(tel: Timer | null): void {
    tel = tel || new Timer('', '', '');
    this.parts.setValue({hrs: tel.hrs, mins: tel.mins, meridiem: tel.meridiem});
    // this.stateChanges.next();
  };
  registerOnChange(fn: (value: any) => void): void {
    this.parts.valueChanges.subscribe(fn);
  };
  registerOnTouched(fn: any): void {};

  constructor(fb: FormBuilder, private fm: FocusMonitor, private elRef: ElementRef,
              renderer: Renderer2) {
    this.parts =  fb.group({
      'hrs': '',
      'mins': '',
      'meridiem': '',
    });

    fm.monitor(elRef.nativeElement, renderer, true).subscribe((origin) => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }

}
