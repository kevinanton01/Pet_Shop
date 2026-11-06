import { Injectable, computed, signal } from '@angular/core';
import { Producto } from './productos.service';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {
  readonly items = signal<ItemCarrito[]>([]);

  readonly cantidadTotal = computed(() =>
    this.items().reduce((total, item) => total + item.cantidad, 0),
  );

  readonly subtotal = computed(() =>
    this.items().reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0,
    ),
  );

  agregar(producto: Producto, cantidad = 1): void {
    if (!producto.stock) {
      return;
    }

    this.items.update((items) => {
      const existente = items.find(
        (item) => item.producto.nombre === producto.nombre,
      );

      if (existente) {
        return items.map((item) =>
          item.producto.nombre === producto.nombre
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item,
        );
      }

      return [...items, { producto, cantidad }];
    });
  }

  sumar(nombre: string): void {
    this.items.update((items) =>
      items.map((item) =>
        item.producto.nombre === nombre
          ? { ...item, cantidad: item.cantidad + 1 }
          : item,
      ),
    );
  }

  restar(nombre: string): void {
    this.items.update((items) =>
      items.map((item) =>
        item.producto.nombre === nombre
          ? { ...item, cantidad: Math.max(1, item.cantidad - 1) }
          : item,
      ),
    );
  }

  quitar(nombre: string): void {
    this.items.update((items) =>
      items.filter((item) => item.producto.nombre !== nombre),
    );
  }
}
