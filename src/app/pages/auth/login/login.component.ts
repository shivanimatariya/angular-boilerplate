import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userDetail: User;
  invalidLogin = false;
  constructor(private localDataService: LocalStorageService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userDetail = new User();
  }

  loginUser() {
    this.invalidLogin = false;
    const data = this.localDataService.getUserData();
    if (data && data.length) {
      const user = data.find(x => x.userName === this.userDetail.userName && x.password === this.userDetail.password);
      if (user) {
        swal.fire({
          title: 'Login successful!',
          text: 'You will be redirected to app',
          icon: 'success',
          timer: 1000
        });
        this.localDataService.setCurrentUserData(user);
        this.router.navigate(['/main/dashboard']);
      } else {
        this.invalidLogin = true;
      }
    }
  }

}
