import { FormControl, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';

export class CustomValidators extends Validators {

  static validateDate(date: FormControl) {
    if (date.value && date.value.length > 0) {
      const aDate = moment(date.value, 'DD/MM/YYYY', true);
      return (!aDate.isValid()) ? { invalidDate: true } : null;
    } else {
      return null;
    }
  }

  static dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const sDate = moment(group.controls[from].value, 'DD/MM/YYYY', true);
      const eDate = moment(group.controls[to].value, 'DD/MM/YYYY', true);

      return (sDate.isAfter(eDate)) ? { dateGreater: true } : null;
    }
  }
}