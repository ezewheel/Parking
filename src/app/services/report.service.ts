import { Injectable } from '@angular/core';
import { IReport } from '../../interfaces/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { 
    this.getReports();
  }

  reports: IReport[] = [];

  async getReports() {
    const res = await fetch('http://localhost:5155/api/parking/reports', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })

    if (res.status !== 200) return;
    const resJson = await res.json();
    this.reports = resJson;
    return true;
  }
}
