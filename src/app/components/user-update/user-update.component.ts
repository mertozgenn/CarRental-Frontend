import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  userForm:FormGroup
  email : string
  firstName : string
  lastName : string
  companyName : string
  newPasswordForm : FormGroup
  savedCard: CreditCard;
  userToUpdate : User = {companyName:"", email:"", firstName:"", lastName:""}

  constructor(private formBuilder:FormBuilder, private authService:AuthService,
               private toastrService:ToastrService, private router:Router, private customerService : CustomerService,
                private userService : UserService, private creditCardService:CreditCardService) { }

  ngOnInit(): void {
    this.getUserDetails()
    this.getSavedCard()
    this.createUserForm();
    this.createNewPasswordForm()
  }

  createUserForm(){
    this.userForm = this.formBuilder.group({
      email:["", Validators.required],
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      companyName:["", Validators.required]
    })
  }

  createNewPasswordForm(){
    this.newPasswordForm = this.formBuilder.group({
      newPassword : ["", Validators.required],
      newPasswordAgain : ["", Validators.required]
    })
  }

  getUserDetails(){
    this.userService.getUser().subscribe(response => {
      this.userToUpdate = response.data
    })
  }
  getSavedCard() {
    this.creditCardService.getCreditCard().subscribe((response) => {
      this.savedCard = response.data;
    });
  }

  update(){
    if(this.userForm.valid){
      let userModel = Object.assign({}, this.userForm.value)
      this.userService.updateUser(userModel).subscribe(response => {
        this.toastrService.info(response.message)
        this.updateCustomer()
      }, responseError => {
        this.toastrService.error(responseError.error)
      })
    }else{
      this.toastrService.error("Forum Hatalı", "Hata")
    }
  }

  updatePassword(){
    if(this.newPasswordForm.valid){
      let newPasswordModel = Object.assign({}, this.newPasswordForm.value)
      if(newPasswordModel.newPassword == newPasswordModel.newPasswordAgain){
        this.userService.changePassword(newPasswordModel.newPassword).subscribe(response => {
          this.toastrService.success("Şifre Değiştirildi", "Başarılı")
        }, responseError => {
          this.toastrService.error("Hata oluştu", "Hata")
        })
      }else{
        this.toastrService.error("Yeni Şifreler Aynı Değil", "Hata")
      }
    }
  }

  updateCustomer(){
    let customerModel : Customer = Object.assign({}, this.userForm.value)
    customerModel.userId = parseInt(localStorage.getItem("userId")!)
    this.customerService.update(customerModel).subscribe(response => {
      this.router.navigate([""])
    })
  }

  deleteCard(){
    this.creditCardService.delete(this.savedCard).subscribe(response => {
      this.toastrService.success("Silindi", "Başarılı")
    }, responseError => {
      this.toastrService.error("Hata oluştu", "Başarısız")
    })
  }
}
