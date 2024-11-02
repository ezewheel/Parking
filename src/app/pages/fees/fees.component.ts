import { Component, inject } from '@angular/core';
import { FeesService } from '../../services/fees.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fees',
  standalone: true,
  imports: [],
  templateUrl: './fees.component.html',
  styleUrl: './fees.component.scss'
})
export class FeesComponent {
  feesService = inject(FeesService);

  editFee(type: number) {
    Swal.fire({
      html:`
        <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif;">Modificando importe</h1>
        <input type="text" id="fee" class="swal2-input" placeholder="Ingrese el nuevo importe">`,
      showCancelButton: true,
      confirmButtonText: "Modificar",
      denyButtonText: "Cancelar",
      preConfirm: () => {
        const feeInput = document.getElementById("fee") as HTMLInputElement
        if (!feeInput || !feeInput.value) {
          Swal.showValidationMessage("Por favor, ingrese un importe")
          return false;
        }
        return { fee: feeInput.value };
      }
     }).then(async (result) => {
       if (!result.isConfirmed) return;
       const { fee } = result.value;
       const res = await this.feesService.editFee(type, fee);
       if (res) {
        Swal.fire("", `
          <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif;">Importe modificado</h1>
          `, "success")
       } else {
        Swal.fire("", `
          <h1 style="margin: 20px 0 10px; font-size: 2rem; font-family: 'Roboto', sans-serif;">Ocurrió un error al modificar el importe</h1>
          `, "error")
       };
     })
  }
}