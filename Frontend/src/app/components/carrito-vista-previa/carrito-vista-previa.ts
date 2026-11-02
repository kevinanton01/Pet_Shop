import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  readonly abierto = input(false);
  readonly items = input<ItemVistaPrevia[]>([
    {
      nombre: 'Croquetas Premium',
      precio: 12500,
      cantidad: 1,
      imagen: 'assets/alimento-1.jpg',
    },
    {
      nombre: 'Snacks Naturales',
      precio: 2800,
      cantidad: 2,
      imagen: 'assets/alimento-3.jpg',
    },
  ]);
  readonly cerrar = output<void>();

  readonly cantidadTotal = computed(() =>
    this.items().reduce((total, item) => total + item.cantidad, 0),
  );

  readonly subtotal = computed(() =>
    this.items().reduce((total, item) => total + item.precio * item.cantidad, 0),
  );

  readonly tieneEnvioGratis = computed(() => this.subtotal() >= 20000);

  formatearPrecio(valor: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(valor);
  }
}
