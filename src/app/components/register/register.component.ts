import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private toastrService: ToastrService, private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      companyName: ["", Validators.required]
    })
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).subscribe(response => {
        localStorage.setItem("token", response.data.token)
        this.authService.getUserId().subscribe(userId => {
          localStorage.setItem("userId", userId.toString())
          this.addCustomer()
        })
      }, responseError => {
        this.toastrService.error(responseError.error)
      })
    }
  }

  addCustomer() {
    let customerModel: Customer = Object.assign({}, this.registerForm.value)
    this.customerService.add(customerModel).subscribe(response => {
      this.router.navigateByUrl("").then(() => {
        location.reload()
      })
    })
  }
}
