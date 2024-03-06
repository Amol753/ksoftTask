import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpMainService {

  constructor(private _http: HttpClient, private _snackBar: MatSnackBar) { }

  addNewEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/emp-data', data);
  }

  updateEmpData(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/emp-data/${id}`, data);
  }

  getEmpData(): Observable<any> {
    return this._http.get('http://localhost:3000/emp-data');
  }

  deleteEmpData(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/emp-data/${id}`);
  }

  snackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }
}
