import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CustomerService } from '../services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { UpdateCustomerComponent } from '../update-customer/update-customer.component';
import { DeleteCustomerComponent } from '../delete-customer/delete-customer.component';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  custData: any;
  displayedColumns: string[] = ['customerId', 'firstName', 'lastName', 'email', 'mobileNo', 'state','city', 'nominee','nomineeRelation','agentName','userName','isActive'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private custService: CustomerService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.custService.getAllCustomer().subscribe((data) => {
      this.custData = data;
      console.log('customer Data:', this.custData);
      this.dataSource = new MatTableDataSource<any>(this.custData);
      this.dataSource.paginator = this.paginator;
    },
    (error) => {
    console.error('Error fetching customer data:', error);
    });
  }
  openAddCustomerDialog(){
    this.dialog.open(AddCustomerComponent)
  }
  openUpdateCustomerDialog(){
    this.dialog.open(UpdateCustomerComponent)
  }
  openDeleteCustomerDialog(){
    this.dialog.open(DeleteCustomerComponent)
  }
}
