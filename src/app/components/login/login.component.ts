import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:UntypedFormGroup

  constructor(private formBuilder:UntypedFormBuilder, private authService:AuthService,
               private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["", Validators.required],
      password:["", Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.info(response.message)
        localStorage.setItem("token", response.data.token)
        this.setUserId()
        this.router.navigate([""])
      }, responseError => {
        this.toastrService.error(responseError.error)
      })
    }
  }

  setUserId(){
    this.authService.getUserId().subscribe(userId => {
      localStorage.setItem("userId", userId.toString())
      location.reload()
    })
  }

}
