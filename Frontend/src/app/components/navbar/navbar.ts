import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarritoVistaPrevia } from '../carrito-vista-previa/carrito-vista-previa';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CarritoVistaPrevia],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  readonly carritoAbierto = signal(false);

  alternarCarrito(): void {
    this.carritoAbierto.update((abierto) => !abierto);
  }

  cerrarCarrito(): void {
    this.carritoAbierto.set(false);
  }
}
