import { Component, computed, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../core/services/carrito.service';

export interface ItemVistaPrevia {
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
}

@Component({
  selector: 'app-carrito-vista-previa',
  imports: [RouterLink],
  templateUrl: './carrito-vista-previa.html',
  styleUrl: './carrito-vista-previa.css',
})
export class CarritoVistaPrevia {
  private readonly carritoService = inject(CarritoService);

  readonly abierto = input(false);
  readonly cerrar = output<void>();

  readonly items = computed<ItemVistaPrevia[]>(() =>
    this.carritoService.items().map(({ producto, cantidad }) => ({
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad,
      imagen: producto.imagen,
    })),
  );

  readonly cantidadTotal = this.carritoService.cantidadTotal;
  readonly subtotal = this.carritoService.subtotal;

  readonly tieneEnvioGratis = computed(() => this.subtotal() >= 20000);

  formatearPrecio(valor: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(valor);
  }
}
