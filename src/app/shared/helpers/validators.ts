import { ValidatorFn, FormArray, FormGroup } from '@angular/forms';


export class CustomValidators {

  static isPasswordsSame(): ValidatorFn {
    return (formGroup: FormGroup): { [key: string]: any } | null => {
      const valid = (formGroup.parent && formGroup.parent.value && formGroup.parent.value.password) === formGroup.value;
      return valid ? null : { error: 'Passwords does not match' };
    };
  }
}
