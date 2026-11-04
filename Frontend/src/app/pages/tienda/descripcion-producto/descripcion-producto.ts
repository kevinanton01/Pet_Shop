import { Component, computed, inject } from '@angular/core';
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

  formatearPrecio(valor: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(valor);
  }
}
