import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(authService)

  getUser() {
    return localStorage.getItem("given_name");
  }
}
