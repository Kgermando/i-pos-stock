import { Component, Input } from '@angular/core';
import { IStock } from '../../../models/stock.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table-entree',
  templateUrl: './table-entree.component.html',
  styleUrl: './table-entree.component.scss'
})
export class TableEntreeComponent {
  @Input() isLoading!: boolean;
  @Input() datalist: IStock[] = [];

  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;
  @Input() length: number = 0;



  onPageChange(event: PageEvent): void {
    this.isLoading = true;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize; 
  }
}
