import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  usuario = {
    username: '',
    password: '',
    
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {

    this.http.post(
      'http://127.0.0.1:8000/api/usuarios/login/',
      this.usuario
    ).subscribe({

      next: (respuesta: any) => {

        console.log(respuesta);

        alert(respuesta.mensaje);

        if (respuesta.token) {

          // Guardar token
          localStorage.setItem(
            'token',
            respuesta.token
          );

          // Guardar rol
          localStorage.setItem(
            'rol',
            respuesta.rol
          );

          // Guardar usuario
          localStorage.setItem(
            'usuario',
            respuesta.usuario
          );

          // ENRUTAR SEGÚN EL ROL

         // Dentro de tu método login() en la sección de ENRUTAR SEGÚN EL ROL:

        if (respuesta.rol === 'administrador') {
  // Ruta correcta hacia el hijo 'admin' dentro de 'das'
         this.router.navigate(['/das/admin']); 
      } 
          else if (respuesta.rol === 'supervisor') { // Asumo que el rol es supervisor según tus rutas
          this.router.navigate(['das/supervisor']);
      } 
        else if (respuesta.rol === 'aprendiz') {
  // Si realmente tienes un rol aprendiz, esta sería la ruta (debes agregarla en tus routes)
         this.router.navigate(['/das/aprendiz']);
        } 
         else if (respuesta.rol ==='usuario'){
          this.router.navigate(['das'])}
      else {
      alert('Rol no reconocido');
}
        }

      },

      error: (error) => {

        console.log(error);

        alert('Usuario o contraseña incorrectos');

      }

    });

  }

  registro() {

    this.router.navigate([
      '/register'
    ]);

  }
}
