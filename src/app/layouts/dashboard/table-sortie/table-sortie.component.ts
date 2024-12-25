import { Component, Input } from '@angular/core';
import { ICommandeLine } from '../../../models/commande_line.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table-sortie',
  templateUrl: './table-sortie.component.html',
  styleUrl: './table-sortie.component.scss'
})
export class TableSortieComponent {
  @Input() isLoading!: boolean;
  @Input() datalist: ICommandeLine[] = [];
  
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
