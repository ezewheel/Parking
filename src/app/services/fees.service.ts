import { Injectable } from '@angular/core';
import { IFee } from '../../interfaces/fees';

@Injectable({
  providedIn: 'root'
})
export class FeesService {
  constructor() { 
    this.getFees();
  }

  fees: IFee[] = []

  async getFees() {
    const res = await fetch('http://localhost:5155/api/fees', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
    });

    if(res.status !== 200) return;
    const resJson: IFee[] = await res.json();
    this.fees = resJson;
    return true;
  }

  async editFee(type: number, value: number) {
    const res = await fetch('http://localhost:5155/api/fees', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify({ type, value }),
    });

    if(res.status !== 200) return;
    await this.getFees();
    return true;
  }
}
