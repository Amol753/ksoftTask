import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmpMainService } from './service/emp-main.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmpDataComponent } from './emp-data/emp-data.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  displayData: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private msg: MatDialog,
    private empMain: EmpMainService

  ) { }

  ngOnInit(): void {
    this.getEmpList();
  }

  openEmpForm() {
    const dialogRef = this.msg.open(EmpDataComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmpList();
        }
      },
    });
  }

  getEmpList() {
    this.empMain.getEmpData().subscribe({
      next: (_res: any) => {
        this.dataSource = new MatTableDataSource(_res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmp(id: number) {
    this.empMain.deleteEmpData(id).subscribe({
      next: (_res: any) => {
        this.empMain.snackBar('Employee Deleted!', 'Successfully');
        this.getEmpList();
      },
      error: console.log,
    });
  }

  editForm(data: any) {
    const dialogRef = this.msg.open(EmpDataComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmpList();
        }
      },
    });
  }
}
