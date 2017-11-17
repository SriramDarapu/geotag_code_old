import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SharedDataService {

  public OnThemeSwitch: Subject<boolean> = new Subject<boolean>();
  locationSelected: Subject<any> = new Subject<any>();

  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      extraClasses: ['success-snackbar']
    });
  }
  
}