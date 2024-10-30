import { Component, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { ParkingService } from '../../services/parking.service';
import { ISlot } from '../../../interfaces/slot';
import { IParking } from '../../../interfaces/parking';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  parkingService = inject(ParkingService);

  addParking(slotId: number) {
    Swal.fire({
      title: "Abrir cochera",
      html: `<input type="text" id="plate" class="swal2-input" placeholder="Ingrese patente">`,
      showCancelButton: true,
      confirmButtonText: "Abrir",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const plateInput = document.getElementById("plate") as HTMLInputElement
        if (!plateInput || !plateInput.value) {
          Swal.showValidationMessage("Por favor, ingrese una patente")
          return false;
        }
        return { plate: plateInput.value };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { plate } = result.value;
        await this.parkingService.addParking(slotId, plate);
      }
    })
  }

  async closeParking(slot: ISlot) {
    Swal.fire({
      html: `
      <div style="text-align: left;">
        <h2 style="margin: 20px 0 10px; text-align: center;">¿Desea cobrar la cochera?</h2>
      </div>`,
      showCancelButton: true,
      confirmButtonText: "Cobrar",
      cancelButtonText: "Cancelar",
     }).then(async (result) => {
       if (result.isConfirmed) {
        const parking: IParking | undefined = await this.parkingService.closeParking(slot.parking?.plate);
        Swal.fire({
          html: `
          <div style="text-align: left;">
            <h2 style="margin: 20px 0 10px; text-align: center;">Monto a cobrar:</h2>
          </div>
          <div style="font-size: 1.5rem;">
            $${parking?.fee}
          </div>
          `
        })
       }
     });
  }

  async disableSlot(slot: ISlot) {
    if (slot.isAvailable) {
      Swal.fire({
        html: `
        <div style="text-align: left;">
          <h2 style="margin: 20px 0 10px; text-align: center;">¿Desabilitar cochera?</h2>
        </div>`,
        showCancelButton: true,
        confirmButtonText: "Desabilitar",
        confirmButtonColor: "#E94444",
        cancelButtonText: "Cancelar",
       }).then(async (result) => {
         if (!result.isConfirmed) return;
         await this.parkingService.changeAvailabilitySlot(slot);
       })
    }
  }

  async enableSlot(slot: ISlot) {
    if (!slot.isAvailable) {
      Swal.fire({
        html: `
        <div style="text-align: left;">
          <h2 style="margin: 20px 0 10px; text-align: center;">¿Habilitar cochera?</h2>
        </div>`,
        showCancelButton: true,
        confirmButtonText: "Habilitar",
        confirmButtonColor: "#00c05c",
        cancelButtonText: "Cancelar",
       }).then(async (result) => {
         if (!result.isConfirmed) return;
         await this.parkingService.changeAvailabilitySlot(slot);
       })
    }
  }

  async deleteSlot(slotId: number) {

  }
  
  addSlot(){
    Swal.fire({
      html:`
      <div style="text-align: center;">
        <h2 style="margin: 20px 0 10px;">Agregando una cochera</h2>
        <p style="font-size: 1.5rem;">Introduzca una descripción para la cochera</>
      </div>`,
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Agregar",
      denyButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.parkingService.addSlot(result.value)
        Swal.fire("Cochera agregada", "", "success");
      }
    });
  }
}