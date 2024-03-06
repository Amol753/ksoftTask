import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpMainService } from '../service/emp-main.service';
@Component({
  selector: 'app-emp-data',
  templateUrl: './emp-data.component.html',
  styleUrls: ['./emp-data.component.css']
})
export class EmpDataComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private form: FormBuilder,
    private empMain: EmpMainService,
    private popUp: MatDialogRef<EmpDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snakBar: EmpMainService
  ) {
    this.empForm = this.form.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  formSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.empMain
          .updateEmpData(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this.snakBar.snackBar('Employee detail updated!');
              this.popUp.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.empMain.addNewEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this.snakBar.snackBar('Employee added successfully');
            this.popUp.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

}
