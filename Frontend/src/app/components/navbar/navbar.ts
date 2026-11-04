import { Component, HostListener, signal } from '@angular/core';
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
  readonly menuAbierto = signal(false);

  alternarCarrito(): void {
    this.carritoAbierto.update((abierto) => !abierto);
  }

  cerrarCarrito(): void {
    this.carritoAbierto.set(false);
  }

  alternarMenu(): void {
    this.menuAbierto.update((abierto) => !abierto);
  }

  cerrarMenu(): void {
    this.menuAbierto.set(false);
  }

  @HostListener('document:click', ['$event'])
  alHacerClickFuera(event: MouseEvent): void {
    const objetivo = event.target as HTMLElement;

    if (!objetivo.closest('.nav-item')) {
      this.cerrarMenu();
    }
  }

  @HostListener('document:keydown.escape')
  alPresionarEscape(): void {
    this.cerrarMenu();
  }
}
