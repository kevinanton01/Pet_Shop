import { Component, HostListener, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, map } from 'rxjs';
import { CarritoService } from '../../core/services/carrito.service';
import { CarritoVistaPrevia } from '../carrito-vista-previa/carrito-vista-previa';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CarritoVistaPrevia],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly router = inject(Router);
  private readonly carritoService = inject(CarritoService);

  readonly cantidadTotal = this.carritoService.cantidadTotal;

  readonly carritoAbierto = signal(false);
  readonly menuAbierto = signal(false);

  readonly enCarrito = toSignal(
    this.router.events.pipe(
      filter((evento): evento is NavigationEnd => evento instanceof NavigationEnd),
      map((evento) => evento.urlAfterRedirects.startsWith('/tienda/carrito')),
    ),
    { initialValue: this.router.url.startsWith('/tienda/carrito') },
  );

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
