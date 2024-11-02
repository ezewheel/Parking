import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { authService } from '../../services/auth.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  animations: [
    trigger(
      'loginRegister', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('1.5s', 
                    style({ opacity: 1 })),
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('0.2s', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ],
  templateUrl: './loginregister.component.html',
  styleUrl: './loginregister.component.scss'
})

export class LoginRegisterComponent {
  authService = inject(authService);
  router = inject(Router);
  isLogin = true;
  errorLogin = false;
  alreadyExists = false;
  unmatchedPasswords = false;
  uncompletedForm = false;
  
  reset() {
    this.errorLogin = false;
    this.alreadyExists = false;
    this.unmatchedPasswords = false;
    this.uncompletedForm = false;
  }

  toggleIsLogin() {
    this.isLogin = !this.isLogin;
    this.reset();
  }
  
  async login(loginForm: NgForm){
    this.reset();
    const {username, password} = loginForm.value;
    if (!username || !password) {
      this.uncompletedForm = true;
      return;
    }
    const loginData = {username, password};
    const res = await this.authService.login(loginData)
    if(res?.status === "ok") this.router.navigate(['/dashboard']);
    else this.errorLogin = true;
  }

  async register(registerForm: NgForm){
    this.reset();
    const {username, firstname, surname, password, repeatPassword} = registerForm.value;
    if (!username || !firstname || !surname || !password || !repeatPassword) {
      this.uncompletedForm = true;
      return;
    }

    if(password !== repeatPassword) {
      this.unmatchedPasswords = true;
      return;
    }
    const name = firstname + surname;

    const registerData = {username, name, password};
    const res = await this.authService.register(registerData)
    if(res?.status === "ok") this.router.navigate(['/dashboard']);
    else this.alreadyExists = true;
  }
}
