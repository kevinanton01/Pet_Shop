import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ProductosService } from '../../../core/services/productos.service';

@Component({
  selector: 'app-descripcion-producto',
  imports: [RouterLink],
  templateUrl: './descripcion-producto.html',
  styleUrl: './descripcion-producto.css',
})
export class DescripcionProducto {
  private readonly route = inject(ActivatedRoute);
  private readonly productosService = inject(ProductosService);

  private readonly nombre = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('nombre') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('nombre') ?? '' },
  );

  readonly producto = computed(() => this.productosService.obtenerPorNombre(this.nombre()));

  readonly cantidad = signal(1);

  sumarCantidad(): void {
    this.cantidad.update((cantidad) => cantidad + 1);
  }

  restarCantidad(): void {
    this.cantidad.update((cantidad) => Math.max(1, cantidad - 1));
  }

  formatearPrecio(valor: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(valor);
  }
}
