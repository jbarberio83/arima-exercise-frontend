import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from '../../../models/car';
import { Pager } from '../../../models/pager';
import { CarService } from '../../../services/car.service';
import { CustomValidators } from './_helpers/custom-forms.validator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  filterForm: FormGroup;
  submitted: boolean = false;
  cars: Car[];
  pager: Pager = new Pager(1);
  sDate: string;
  eDate: string;
  isLoaded: boolean = false;

  constructor(private carService: CarService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      sDate: ['', [Validators.required, CustomValidators.validateDate]],
      eDate: ['', [Validators.required, CustomValidators.validateDate]]
    }, {validator: CustomValidators.dateLessThan('sDate', 'eDate')});

    this.getCarsByPage();
  }

  get f() { return this.filterForm; }

  onSubmit() {
    this.submitted = true;
    if (this.filterForm.invalid) {
      return;
    }
    this.sDate = this.filterForm.value.sDate.split('/').reverse().join('/');
    this.eDate = this.filterForm.value.eDate.split('/').reverse().join('/');
    this.pager.currentPage = 1;
    this.getCarsByPage();
  }

  reset() {
    this.submitted = false;
    this.filterForm.reset();
    this.pager.currentPage = 1;
    this.sDate = undefined;
    this.eDate = undefined;
    this.getCarsByPage();
  }

  goPage(page: number) {
    this.pager.currentPage = page;
    this.getCarsByPage();
  }

  getCarsByPage() {
    this.carService.getCars(this.pager.currentPage, this.sDate, this.eDate)
      .subscribe(response => {
        this.isLoaded = true;
        this.cars = response.data;
        this.pager = response.pager;
      });
  }

}
