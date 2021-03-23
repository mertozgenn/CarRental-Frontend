import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CategoryComponent } from './components/category/category.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentComponent } from './components/rent/rent.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"", pathMatch:"full", component:CategoryComponent, outlet:"filter"},
  {path:"cars", component:CarComponent},
  {path:"cars/add", component:CarAddComponent}, 
  {path:"colors/add", component:ColorAddComponent}, 
  {path:"brands/add", component:BrandAddComponent}, 
  {path:"cars", component: CategoryComponent, outlet:"filter"},
  {path:"cars/:carId", pathMatch:"full", component:CarDetailComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/color/:colorId", component:CategoryComponent, outlet:"filter"},
  {path:"cars/color", component: CategoryComponent, outlet : "filter"},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/brand/", component: CategoryComponent, outlet : "filter"},
  {path:"customers", component:CustomerComponent},
  {path:"rentals", component:RentalComponent},
  {path:"colors", component:ColorComponent},
  {path:"brands", component:BrandComponent},
  {path:"rent/:carId", component:RentComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
