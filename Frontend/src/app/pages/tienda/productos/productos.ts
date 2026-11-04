import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CardProductos } from '../../../components/card-productos/card-productos';
import { Producto, ProductosService } from '../../../core/services/productos.service';

@Component({
  selector: 'app-productos',
  imports: [CardProductos],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productosService = inject(ProductosService);

  private readonly categoriaActiva = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('categoria'))),
    { initialValue: this.route.snapshot.queryParamMap.get('categoria') },
  );

  readonly seleccionadas = linkedSignal<ReadonlySet<string>>(() => {
    const categoria = this.categoriaActiva();
    return new Set(categoria ? [categoria] : []);
  });

  readonly productos = this.productosService.productos;

  readonly busqueda = signal('');

  private readonly hijosPorPadre: Record<string, readonly string[]> = {
    alimentos: ['perros', 'gatos', 'aves', 'otros'],
    higiene: ['shampoo', 'perfumes'],
  };

  private readonly categoriasPorFiltro: Record<string, readonly string[]> = {
    alimentos: ['Perros', 'Gatos', 'Aves', 'Otros'],
    perros: ['Perros'],
    gatos: ['Gatos'],
    aves: ['Aves'],
    otros: ['Otros'],
    juguetes: ['Juguetes'],
    ropa: ['Ropa'],
    accesorios: ['Accesorios'],
    higiene: ['Shampoo', 'Perfumes'],
    shampoo: ['Shampoo'],
    perfumes: ['Perfumes'],
  };

  private padreDe(valor: string): string | undefined {
    return Object.keys(this.hijosPorPadre).find((padre) =>
      this.hijosPorPadre[padre].includes(valor),
    );
  }

  readonly productosFiltrados = computed(() => {
    const seleccion = this.seleccionadas();
    const termino = this.normalizar(this.busqueda().trim());

    const categorias = new Set<string>();

    seleccion.forEach((filtro) => {
      this.categoriasPorFiltro[filtro]?.forEach((categoria) =>
        categorias.add(this.normalizar(categoria)),
      );
    });

    let resultado = this.productos;

    if (categorias.size > 0) {
      resultado = resultado.filter((producto) =>
        categorias.has(this.normalizar(producto.categoria)),
      );
    }

    if (termino) {
      resultado = resultado.filter((producto) =>
        this.normalizar(producto.nombre).includes(termino),
      );
    }

    return resultado;
  });

  actualizarBusqueda(event: Event): void {
    this.busqueda.set((event.target as HTMLInputElement).value);
  }

  private normalizar(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, ''); //Elimina las marcas diacríticas mediante una expresión regular.
  }

  estaSeleccionada(valor: string): boolean {
    return this.seleccionadas().has(valor);
  }

  verDetalle(producto: Producto): void {
    this.router.navigate(['/tienda/descripcion-producto', producto.nombre]);
  }

  alternar(valor: string, event: Event): void {
    const marcado = (event.target as HTMLInputElement).checked;

    this.seleccionadas.update((actual) => {
      const nuevo = new Set(actual);

      if (marcado) {
        const padre = this.padreDe(valor);

        if (padre) {
          nuevo.delete(padre);
        } else {
          this.hijosPorPadre[valor]?.forEach((hijo) => nuevo.delete(hijo));
        }

        nuevo.add(valor);
      } else {
        nuevo.delete(valor);
        this.hijosPorPadre[valor]?.forEach((hijo) => nuevo.delete(hijo));
      }

      return nuevo;
    });
  }
}
