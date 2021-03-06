import { Image } from "./image";

export interface CarDto{
    carId:number;
    description:string;
    colorName:string;
    brandName:string;
    modelYear:string;
    dailyPrice:number;
    images:Image[]
}