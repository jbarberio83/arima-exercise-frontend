import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pager } from '../../../models/pager';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent{
  
  @Input() pager: Pager;
  @Output() pageEmitter: EventEmitter<number> =  new EventEmitter();

  constructor() { }

  goPage(page) {
    this.pager.currentPage = page;
    this.pageEmitter.emit(this.pager.currentPage);
  }

}
