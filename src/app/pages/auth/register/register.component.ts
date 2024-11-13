import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/models/register';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CustomValidators } from 'src/app/shared/helpers/validators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerData: Register;
  registerForm: FormGroup;
  userNameExists = false;
  constructor(private localDataService: LocalStorageService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.compose([Validators.required, CustomValidators.isPasswordsSame()])]
    });
  }

  ngOnInit() {
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  get isPasswordsSame() {
    return this.registerData.password === this.registerData.confirmPassword;
  }

  registerUser() {
    this.registerData = this.registerForm.value;
    this.userNameExists = false;
    if (!this.isPasswordsSame) {
      return;
    }
    const data = this.localDataService.getUserData();
    if (data && data.length > -1) {
      const userNameExists = data.find(x => x.userName.toLowerCase() === this.registerData.userName.toLowerCase());
      if (userNameExists) {
        this.userNameExists = true;
        return;
      }
      data.push({ userName: this.registerData.userName, password: this.registerData.password });
      this.localDataService.setUserData(data);
      swal.fire({
        title: 'Registraton successful!',
        text: 'Login to continue with app',
        icon: 'success'
      });
      this.resetForm();
    }
  }

  resetForm() {
    this.registerForm.reset();
  }

}
