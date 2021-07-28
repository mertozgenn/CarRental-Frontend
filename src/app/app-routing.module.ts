import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CategoryComponent } from './components/category/category.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentComponent } from './components/rent/rent.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { LoginGuard } from './guards/login.guard';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:HomepageComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"pay", component:PaymentComponent, canActivate:[LoginGuard]},
  {path:"user/update", component:UserUpdateComponent, canActivate:[LoginGuard]},
  {path:"cars", pathMatch:"full", component:CarComponent},
  {path:"cars/add", pathMatch:"full", component:CarAddComponent, canActivate:[LoginGuard]}, 
  {path:"cars/update/:carId", component: CarUpdateComponent, canActivate:[LoginGuard]},
  {path:"colors/add", pathMatch:"full", component:ColorAddComponent, canActivate:[LoginGuard]}, 
  {path:"colors/update/:colorId", component: ColorUpdateComponent, canActivate:[LoginGuard]},
  {path:"brands/add", pathMatch:"full", component:BrandAddComponent, canActivate:[LoginGuard]}, 
  {path:"brands/update/:brandId", component: BrandUpdateComponent, canActivate:[LoginGuard]},
  {path:"cars", pathMatch:"full", component: CategoryComponent},
  {path:"cars/:carId", pathMatch:"full", component:CarDetailComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/color/:colorId", component:CategoryComponent},
  {path:"cars/color", component: CategoryComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/brand/", component: CategoryComponent},
  {path:"customers", component:CustomerComponent, canActivate:[LoginGuard]},
  {path:"rentals", component:RentalComponent, canActivate:[LoginGuard]},
  {path:"colors", component:ColorComponent, canActivate:[LoginGuard]},
  {path:"brands", component:BrandComponent, canActivate:[LoginGuard]},
  {path:"rent/:carId", component:RentComponent, canActivate:[LoginGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
