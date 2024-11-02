import { Component, inject } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  reportsService = inject(ReportService);

  constructor() { 
    this.reportsService.getReports();
  }

  bg = false;
  swapBg() {
    this.bg = !this.bg;
    return this.bg
  }

  months: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  getMonth(month: number): string {
    return this.months[month - 1];
  }
}
