import { Injectable } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';

@Injectable()
export class CustomDateAdapter extends MomentDateAdapter {
  constructor() {
    super('en-GB');
  }

  public parse(value: any, parseFormat: string | string[]): moment.Moment | null {
    const format = 'DD-MM-YYYY';
    return moment(value, format);
  }

  public format(date: moment.Moment, displayFormat: string): string {
    const format = 'DD-MM-YYYY';
    const result = date.locale(this.locale).format(format);
    return result;
  }
}