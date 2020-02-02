import { Component, Input } from '@angular/core';
import { Car } from '../../models/car';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html'
})
export class CarsComponent {

  @Input() cars: Car[] = [];

  constructor() { }

}
