import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  isAuthenticated = false
  userId : any
  loggedUser : User = {companyName:"", lastName:"", firstName:"", email:""}

  constructor(private userService:UserService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
        this.userId = localStorage.getItem("userId")
        console.log(this.userId)
        if(this.userId != null){
          this.getLoggedUser(this.userId)
        }
  }

  getLoggedUser(userId:number){
    this.userService.getUser(userId).subscribe(response => {
      this.loggedUser = response.data[0]
      console.log(response.data)
      this.isAuthenticated = this.authService.isAuthenticated()
    })
  }

  logout(){
    localStorage.clear()
    location.reload()
    this.router.navigate([""])
  }

}
