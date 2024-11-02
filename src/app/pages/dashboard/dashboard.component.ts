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
      html: `
        <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif;">Abrir cochera</h1>
        <input type="text" id="plate" class="swal2-input" placeholder="Ingrese patente">`,
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
        const res = await this.parkingService.addParking(slotId, plate);
        if (!res) {
          Swal.fire("", `
            <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif;">Ocurrió un error al abrir la cochera</h1>
            `, "success")
         }
      }
    })
  }

  closeParking(slot: ISlot) {
    Swal.fire({
      html: `
        <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif; text-align: center;">¿Cobrar cochera?</h1>`,
      showCancelButton: true,
      confirmButtonText: "Cobrar",
      cancelButtonText: "Cancelar",
     }).then(async (result) => {
       if (result.isConfirmed) {
        const parking: IParking | undefined = await this.parkingService.closeParking(slot.parking?.plate);
        if (parking) {
          Swal.fire({
            html: `
              <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif; text-align: center;">Monto a cobrar:</h1>
              <p style="font-size: 2rem;">$${parking?.fee}</p>
            `
          })
        } else {
          Swal.fire({
            html: `
              <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif; text-align: center;">Ocurrió un error al cobrar</h1>
            `
          })
        }
       }
     });
  }

  disableSlot(slot: ISlot) {
    Swal.fire({
      html: `
        <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif; text-align: center;">¿Desabilitar cochera?</h1>
      `,
      showCancelButton: true,
      confirmButtonText: "Desabilitar",
      confirmButtonColor: "#E94444",
      cancelButtonText: "Cancelar",
     }).then(async (result) => {
       if (!result.isConfirmed) return;
       const res = await this.parkingService.changeAvailabilitySlot(slot);
       if (!res) {
        Swal.fire("", `
          <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif;">Ocurrió un error al desabilitar la cochera</h1>
          `, "success")
       }
     })
  }

  enableSlot(slot: ISlot) {
    Swal.fire({
      html: `
        <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif; text-align: center;">¿Habilitar cochera?</h1>
      `,
      showCancelButton: true,
      confirmButtonText: "Habilitar",
      confirmButtonColor: "#00c05c",
      cancelButtonText: "Cancelar",
     }).then(async (result) => {
       if (!result.isConfirmed) return;
       const res = await this.parkingService.changeAvailabilitySlot(slot);
       if (!res) {
        Swal.fire("", `
          <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif;">Ocurrió un error al habilitar la cochera</h1>
          `, "success")
       }
     })
  }

  deleteSlot(slotId: number) {
    Swal.fire({
      html: `
      <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif;">¿Eliminar cochera?</h1>
      `,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#E94444",
      cancelButtonText: "Cancelar",
     }).then(async (result) => {
       if (!result.isConfirmed) return;
       const res = await this.parkingService.deleteSlot(slotId);
       if (res) {
        Swal.fire("", `
          <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif;">Cochera eliminada</h1>
          `, "success")
       } else {
        Swal.fire("", `
          <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif;">Ocurrió un error al eliminar la cochera</h1>
          `, "error")
       };
     })
  }
  
  addSlot(){
    Swal.fire({
      html:`
        <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif;">Agregando cochera</h1>
        <input type="text" id="description" class="swal2-input" placeholder="Ingrese una descripción">`,
      showCancelButton: true,
      confirmButtonText: "Agregar",
      denyButtonText: "Cancelar",
      preConfirm: () => {
        const descriptionInput = document.getElementById("description") as HTMLInputElement
        if (!descriptionInput || !descriptionInput.value) {
          Swal.showValidationMessage("Por favor, ingrese una descripción")
          return false;
        }
        return { description: descriptionInput.value };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { description } = result.value
        const res = await this.parkingService.addSlot(description);
        if (!res) {
          Swal.fire("", `
            <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif;">Ocurrió un error al añadir una cochera</h1>
            `, "success")
         };
      }
    });
  }
}