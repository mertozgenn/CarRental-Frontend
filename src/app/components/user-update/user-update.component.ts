import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  userForm:FormGroup
  userToUpdate : User = {companyName:"", email:"", firstName:"", lastName:""}

  constructor(private formBuilder:FormBuilder, private authService:AuthService,
               private toastrService:ToastrService, private router:Router, private customerService : CustomerService,
                private userService : UserService) { }

  ngOnInit(): void {
    this.getUserDetails()
    console.log(this.userToUpdate)
    this.createUserForm()
  }

  createUserForm(){
    this.userForm = this.formBuilder.group({
      email:["", Validators.required],
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      companyName:["", Validators.required]
    })
  }

  getUserDetails(){
    this.userService.getUser(parseInt(localStorage.getItem("userId")!)).subscribe(response => {
      this.userToUpdate = response.data[0]
    })
  }

  update(){
    if(this.userForm.valid){
      console.log(this.userForm.value)
      let userModel = Object.assign({}, this.userForm.value)
      this.userService.updateUser(userModel).subscribe(response => {
        this.toastrService.info(response.message)
        this.updateCustomer()
        console.log(response)
      }, responseError => {
        this.toastrService.error(responseError.error)
        console.log(responseError)
      })
    }
  }

  updateCustomer(){
    let customerModel : Customer = Object.assign({}, this.userForm.value)
    customerModel.userId = parseInt(localStorage.getItem("userId")!)
    this.customerService.update(customerModel).subscribe(response => {
      console.log(response)
      this.router.navigate([""])
    })
  }
}
