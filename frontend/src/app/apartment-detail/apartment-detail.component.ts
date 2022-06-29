import { Component, OnInit } from '@angular/core';
import { Apartment } from '../apartment';
import { ApartmentService } from '../apartment.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit {

  apartment: Apartment;

  constructor(private apartmentService: ApartmentService, 
    private route: ActivatedRoute,
    private location: Location) {
      this.apartment = {
        country: '',
        year: Number(),
        travellers: Number(),
        stays: Number(),
        avg: Number()
      }
    }

  ngOnInit(): void {
    this.getApartment();
  }

  getApartment(): void {
    this.apartmentService.getApartment(this.route.snapshot.paramMap.get('country'), parseInt(this.route.snapshot.paramMap.get('year')))
    .subscribe(
      apartment => this.apartment = apartment
    );
  }

  saveApartment(): void {
    this.apartmentService.updateApartment(this.apartment)
      .subscribe(_ => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
