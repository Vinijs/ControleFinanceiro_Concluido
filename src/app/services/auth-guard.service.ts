import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import  decode  from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private jwtHelper: JwtHelperService,
    private router: Router) { }

    canActivate(): boolean {
      const token = localStorage.getItem("TokenUsuarioLogado");

      if(token && !this.jwtHelper.isTokenExpired(token)){
        return true;
      }

      this.router.navigate(['usuarios/loginusuario']);
      return false;
    }

    VerificarAdministrador(): boolean{
      const token: any = localStorage.getItem('TokenUsuarioLogado');
      const tokenUsuario: any = decode(token);

      if(tokenUsuario.role === 'Administrador'){
        return true;
      }else{
        return false;
      }
    }
}
