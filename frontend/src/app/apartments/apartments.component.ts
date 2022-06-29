import { Component, OnInit } from '@angular/core';
import { Apartment } from '../apartment';
import { ApartmentService } from '../apartment.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {

  apartments: Apartment[];

  constructor(private apartmentService: ApartmentService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getApartments();
  }

  getApartments(): void {
    this.apartmentService.getApartments().subscribe(
      (apartments) => this.apartments = apartments
    );
  }

  addApartment(country: string, year: number, travellers: number, stays: number, avg: number): void {
    //TODO: validar campos
    country = country.trim();
    year = year;
    if (!country || !year) {
      return;
    }

    this.apartmentService.addApartment({country, year, travellers, stays, avg}).subscribe(
      _ => this.getApartments()
    );
  }

  deleteAparmtents(): void {
    this.apartmentService.deleteApartments().subscribe(
      _ => this.getApartments()
    );
  }

  deleteApartment(country: string, year: number): void{
    this.apartmentService.deleteApartment(country, year).subscribe(
      _ => this.getApartments()
    );
  }

  deleteApartments(): void{
    this.apartmentService.deleteApartments().subscribe(
      _ => this.getApartments()
    );
  }

  goBack(): void {
    this.location.back();
  }

}
