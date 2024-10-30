import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { IDecodedToken, ILogin, ILoginRes, IRegister } from '../../interfaces/loginRegister';


@Injectable({
  providedIn: 'root'
})
export class authService {

  constructor() { }

  user: IUser | undefined;


  decodeToken(token: string){
    const decodedJwtData = window.atob(token.split('.')[1]);
    return JSON.parse(decodedJwtData);
  }
  
  async login(loginData: ILogin){
    const res = await fetch('http://localhost:5155/api/auth/login',{
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(loginData),
    })
    
    if(res.status !== 200) return;

    const resJson: ILoginRes = await res.json();
    if(!resJson.token) return;

    const decodedToken: IDecodedToken = this.decodeToken(resJson.token);

    this.user = {
      name: decodedToken.name,
      token: resJson.token
    }
    
    localStorage.setItem("authToken", resJson.token);
    return resJson;
  }

  async register(registerData: IRegister){
    const res = await fetch('http://localhost:5155/api/auth/register',{
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(registerData),
    })
    
    if(res.status !== 200) return;

    const resJson: ILoginRes = await res.json();
    if(!resJson.token) return;

    const decodedToken: IDecodedToken = this.decodeToken(resJson.token);

    this.user = {
      name: decodedToken.name,
      token: resJson.token
    }

    localStorage.setItem("authToken", resJson.token);
    return resJson;
  }


}