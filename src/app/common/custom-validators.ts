import { AbstractControl, FormControl, ValidationErrors, Validators } from "@angular/forms";

export class CustomValidators {

  static notOnlyWhitespace(control: FormControl): ValidationErrors {

    if ((control.value != null) && (control.value.trim().length === 0)){
      return { 'notOnlyWhitespace':true}
    }
    else{
      return null as any;
    }
  }

}
