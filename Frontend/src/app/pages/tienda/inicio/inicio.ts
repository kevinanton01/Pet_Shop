import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CardAlimento } from '../../../components/card-alimento/card-alimento';
import { CardCategorias } from '../../../components/card-categorias/card-categorias';
import { Producto, ProductosService } from '../../../core/services/productos.service';

@Component({
  selector: 'app-inicio',
  imports: [CardAlimento, CardCategorias, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  private readonly router = inject(Router);
  private readonly productosService = inject(ProductosService);

  readonly masVendidos = computed(() =>
    [...this.productosService.productos]
      .sort((a, b) => b.cant_vendidos - a.cant_vendidos)
      .slice(0, 5),
  );

  verDetalle(producto: Producto): void {
    this.router.navigate(['/tienda/descripcion-producto', producto.nombre]);
  }
}
