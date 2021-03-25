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
import { RentComponent } from './components/rent/rent.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"", pathMatch:"full", component:CategoryComponent, outlet:"filter"},
  {path:"cars", pathMatch:"full", component:CarComponent},
  {path:"cars/add", pathMatch:"full", component:CarAddComponent}, 
  {path:"cars/update/:carId", component: CarUpdateComponent},
  {path:"colors/add", pathMatch:"full", component:ColorAddComponent}, 
  {path:"colors/update/:colorId", component: ColorUpdateComponent},
  {path:"brands/add", pathMatch:"full", component:BrandAddComponent}, 
  {path:"brands/update/:brandId", component: BrandUpdateComponent},
  {path:"cars", pathMatch:"full", component: CategoryComponent, outlet:"filter"},
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
