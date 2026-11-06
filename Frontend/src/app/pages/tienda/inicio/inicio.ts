import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CardProductos } from '../../../components/card-productos/card-productos';
import { CardCategorias } from '../../../components/card-categorias/card-categorias';
import { Producto, ProductosService } from '../../../core/services/productos.service';

@Component({
  selector: 'app-inicio',
  imports: [CardProductos, CardCategorias, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  private readonly router = inject(Router);
  private readonly productosService = inject(ProductosService);

  readonly masVendidos = computed(() =>
    this.productosService.productos.filter((producto) => producto.mas_vendidos),
  );

  verDetalle(producto: Producto): void {
    this.router.navigate(['/tienda/descripcion-producto', producto.nombre]);
  }
}
