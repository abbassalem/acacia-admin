import { Component, EventEmitter, Input,  Output, ViewChild } from '@angular/core';
import { Order } from '../../shop/models/order.model';
import { GridReadyEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'
import { CheckboxRenderer } from 'src/app/shared/renderers/eggrid.renderers';
import 'ag-grid-enterprise';

@Component({
  selector: 'app-order-list',
  template: `
<mat-toolbar-row *ngIf="orderList && orderList.length > 0">
      <button  [disabled]="disabledButtons" color="primary" mat-raised-button (click)="deliver()">Delivered</button>
      &nbsp;&nbsp;
      <button [disabled]="disabledButtons" color="primary" mat-raised-button (click)="cancel()">Cancel</button>
      &nbsp;&nbsp;
      <button [disabled]="disabledButtons" color="primary" mat-raised-button (click)="pay()"> Paid</button>
 </mat-toolbar-row>    

  <ag-grid-angular #agGrid *ngIf="orderList && orderList.length > 0"
          [gridOptions]="gridOptions" 
          height="300"
          [masterDetail]="true"
          [pagination]= "true"
          [paginationPageSize]= '10'
          [columnDefs]= "columnDefs"
          [defaultColDef]="defaultColDef"
          class="ag-theme-alpine-dark"
          [detailCellRendererParams]="detailCellRendererParams"
          [rowData]="orderList"
          [rowSelection]="'multiple'"
          [getRowNodeId]="getRowNodeId"
          [animateRows]="true"
          [sideBar] = "true"
          [pivotColumnGroupTotals]=""
          (gridReady)="onGridReady($event)"
          (selectionChanged)="checkIfEmpty($event)"
          (rowEditingStopped)="onRowEditingStopped($event)"
          (rowEditingStarted)="onRowEditingStarted($event)"
          (cellClicked)="onCellClicked($event)"
          >
          
   </ag-grid-angular>
`,
  styles: [
    `
    .grid-header-level1 {
      color: blue;
      font-weight: bold;
      background-color: white;
    }

    ag-grid-angular {
      width: 100%;
      height: 30%
    }
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .toolbar-flex{
      flex: 1 0.5 auto;
      float:left
    }
  `,
  ]
})

export class OrderListComponent {

  @Input() orderList: Order[];
  @Input() disabledButtons:boolean;
  @Output() toggleDisabledChanged:EventEmitter<boolean> = new EventEmitter(true);         
  @Output() payChange: EventEmitter<string[]> = new EventEmitter();
  @Output() deliverChange: EventEmitter<string[]> = new EventEmitter();
  @Output() cancelChange: EventEmitter<string[]> = new EventEmitter();

  @ViewChild(AgGridAngular) agGrid: AgGridAngular;
  
  rowsSelected: Array<any> = new Array() ;
  gridApi;
  gridColumnApi;
  gridOptions;

  columnDefs =  [
      { header: 'Selection', checkboxSelection: true, headerCheckboxSelection: true, 
      pinned: 'left',lockPinned:true,lockVisible: true,
       width: 50, field: 'checkboxBtn'},
      { headerName: 'Order Date',cellStyle: {'color': 'white', 'background-color': 'darkgrey'}, 
         field: 'orderDate', pinned: 'left',lockPinned:true,lockVisible: true,
          cellRenderer: 'agGroupCellRenderer', valueFormatter: params => this.dateFormatter(params.data.orderDate)},
      { headerName: 'Order Details', 
        children: [
          {headerName: 'Status',field: 'status'},
          {headerName: 'Amount',field: 'amount',sortable: true, valueFormatter: params =>  params.data.amount.toFixed(2)},
          { headerName: 'Order Payment',field: 'paid', cellRenderer: CheckboxRenderer }
      ]},
      {headerName: 'Delivery Info',   
          children: [
            { headerName: 'Delivery Date',field: 'deliveryDate', 
            valueFormatter: params => this.dateFormatter(params.data.deliveryDate)},
            { headerName: 'Delivery Time',field: 'deliveryTime'}
      ]},
      { headerName: 'User Info',  
            children: [
                  {field: 'orderUser.displayName', headerName: 'Name'},
                  {field: 'orderUser.email', headerName: 'Email'},
                  {field: 'orderUser.phoneNumber', headerName: 'Phone'}
      ]},
    ];
  
  defaultColDef = {
    sortable: true,
    filter: true,
    editable: false
  }

  constructor() {}

  checkIfEmpty(params){
    this.rowsSelected = this.gridApi.getSelectedRows();
    if(this.rowsSelected && this.rowsSelected.length > 0) {
      this.toggleDisabledChanged.emit(false);
    } else {
      this.toggleDisabledChanged.emit(true);
    }
  }

  detailCellRendererParams = {
    detailGridOptions: {
        columnDefs: [
            { headerName: 'ID', field: 'id' },
            { headerName: 'Quantity',  field: 'quantity'},
            { headerName: 'Product Name',field: 'product.name'}
        ],

        onFirstDataRendered: params => {
          params.api.sizeColumnsToFit();
        }
    },
    getDetailRowData: (params) => {
        params.successCallback(params.data.items);
    }, 
  };

  dateFormatter(date): string {
    let str = new Date(date).getDate().toString() + '/' + 
    new Date(date).getMonth().toString() +  '/' + new Date(date).getFullYear().toString();
    return str;
  }

  getRowNodeId(params: { id: number; })  {
    return params.id;
  }

  onGridReady(params: GridReadyEvent) {
    this.agGrid.api.sizeColumnsToFit();
    this.gridApi = this.agGrid.api;
  }

  pay(){
    console.log('method paid');
    this.rowsSelected = this.gridApi.getSelectedRows();
    console.log('paid');
    console.dir(this.rowsSelected);
    const ids: string[] = this.rowsSelected.map(ord => ord.id);
    this.payChange.emit(ids);
  }

  deliver(){
    this.rowsSelected = this.gridApi.getSelectedRows()
    console.log('delivered');
    console.dir(this.rowsSelected);
    const ids: string[] = this.rowsSelected.map(ord => ord.id);
    this.deliverChange.emit(ids);
  }

  cancel(){
    this.rowsSelected = this.gridApi.getSelectedRows()
    console.log('cancelled');
    console.dir(this.rowsSelected);
    const ids: string[] = this.rowsSelected.map(ord => ord.id);
    this.cancelChange.emit(ids);
  }

//   onCellClicked(params) {
//     // Handle click event for action cells
//     if (params.column.colId === "action" && params.event.target.dataset.action) {
//       let action = params.event.target.dataset.action;

//       console.log('params: data');
//        console.dir(params.data);

//        console.log('params:');
//        console.dir(params);


//       if (action === "edit") {
//         params.api.startEditingCell({
//           rowIndex: params.node.rowIndex,
//           // gets the first columnKey
//           colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
//         });
//       }

//       if (action === "delete") {
//         params.api.applyTransaction({
//           remove: [params.node.data]
//         });
//       }

//       if (action === "update") {
//         params.api.stopEditing(false);
//       }

//       if (action === "cancel") {
//         params.api.stopEditing(true);
//       }
//     }
//   }

//   onRowEditingStarted(params) {
//     params.api.refreshCells({
//       columns: ["action"],
//       rowNodes: [params.node],
//       force: true
//     });
//   }
//   onRowEditingStopped(params) {
//     params.api.refreshCells({
//       columns: ["action"],
//       rowNodes: [params.node],
//       force: true
//     });
//   }

//   // clearSelection(): void {
//   //   this.agGrid.api.deselectAll();
//   // }


//   // executeCellValueChangedEvent(event) {
    
//   //   console.log('old value: ' + event.oldValue + ' new value: ' + event.newValue);
//   // }
//   // clearSelection(): void {
//   //   this.agGrid.api.deselectAll();
//   // }

//  actionCellRenderer(params) {
//     let eGui = document.createElement("div");
  
//     let editingCells = params.api.getEditingCells();
//     // checks if the rowIndex matches in at least one of the editing cells
//     let isCurrentRowEditing = editingCells.some((cell) => {
//       return cell.rowIndex === params.node.rowIndex;
//     });
  
//     if (isCurrentRowEditing) {
//       eGui.innerHTML = `
//   <button  class="action-button update"  data-action="update"> update  </button>
//   <button  class="action-button cancel"  data-action="cancel" > cancel </button>
//   `;
//     } else {
//       eGui.innerHTML = `
//   <button class="action-button edit"  data-action="edit" > edit  </button>
//   <button class="action-button delete" data-action="delete" > delete </button>
//   `;
//     }
  
//     return eGui;
//   }

}

export interface OrderChange {
    changeType: string;
    id: string;
    valueChangedFrom: string;
    valueChangedTo: string;
    userId: string;
}
