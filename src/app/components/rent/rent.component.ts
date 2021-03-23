import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private rentalService:RentalService) { }

  ngOnInit(): void {
  }

}
