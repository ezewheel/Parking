import { Injectable } from '@angular/core';
import { IParking } from '../../interfaces/parking';
import { ISlot } from '../../interfaces/slot';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  
  constructor() {
    this.loadData()
  }

  async loadData() {
    await this.getSlots()
  }

  slots: ISlot[] = [];
  
  async getSlots(){
    const res = await fetch('http://localhost:5155/api/slots',{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
    })
    
    if(res.status !== 200) return;
    const resJson: ISlot[] = await res.json();
    this.slots = resJson;
    return true;
  }

  async addParking(slotId: number, plate: string) {
    const res = await fetch('http://localhost:5155/api/parking/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+ localStorage.getItem("token")
      },
      body: JSON.stringify({ slotId, plate }),
    });

    if(res.status !== 200) return;
    await this.loadData();
    return true;
  }

  async closeParking(plate: string | undefined) {
    if(!plate) return;
    const res = await fetch('http://localhost:5155/api/parking/close', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization:'Bearer '+ localStorage.getItem("token")
      },
      body: JSON.stringify(plate),
    });

    if(res.status !== 200) return;

    const resJson: IParking = await res.json();
    this.loadData();
    return resJson;
  }

  async addSlot(description: string){
    const res = await fetch('http://localhost:5155/api/slots',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify(description),
    })
    
    if(res.status !== 200) return;
    this.loadData();
    return true;
  }

  async changeAvailabilitySlot(slot: ISlot) {
    const res = await fetch(`http://localhost:5155/api/slots/${slot.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
      body: JSON.stringify({
        description: slot.description,
        isAvailable: !slot.isAvailable
      }),
    })

    if(res.status !== 200) return;
    this.loadData();
    return true;
  }

  async deleteSlot(slotId: number) {
    const res = await fetch(`http://localhost:5155/api/slots/${slotId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      },
    })
    
    if(res.status !== 200) return;
    this.loadData();
    return true;
  }
}