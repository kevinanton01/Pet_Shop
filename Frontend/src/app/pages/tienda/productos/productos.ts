import { Component, computed, inject, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CardAlimento } from '../../../components/card-alimento/card-alimento';
import { Producto, ProductosService } from '../../../core/services/productos.service';

@Component({
  selector: 'app-productos',
  imports: [CardAlimento],
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

  private readonly hijosPorPadre: Record<string, readonly string[]> = {
    alimentos: ['perros', 'gatos', 'aves', 'otros'],
    higiene: ['shampoo', 'perfumes'],
  };

  private padreDe(valor: string): string | undefined {
    return Object.keys(this.hijosPorPadre).find((padre) =>
      this.hijosPorPadre[padre].includes(valor),
    );
  }

  readonly productosFiltrados = computed(() => {
    const seleccion = this.seleccionadas();

    if (seleccion.size === 0) {
      return this.productos;
    }

    return this.productos.filter((producto) =>
      producto.filtros.some((filtro) => seleccion.has(filtro)),
    );
  });

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
