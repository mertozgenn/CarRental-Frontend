import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  isAuthenticated = false
  userId : number
  loggedUser : User

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.authService.getUserId().subscribe(response => {
        this.userId = response
        console.log(response)
        if(this.userId != null){
          this.getLoggedUser(response)
        }
    })
  }

  getLoggedUser(userId:number){
    this.authService.getUser(userId).subscribe(response => {
      this.loggedUser = response.data[0]
      console.log(response.data)
      this.isAuthenticated = this.authService.isAuthenticated()
    })
  }

}
