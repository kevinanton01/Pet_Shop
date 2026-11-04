import { Component, computed, inject, signal } from '@angular/core';
import { Producto, ProductosService } from '../../../core/services/productos.service';

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

interface PuntoEncuentro {
  nombre: string;
  direccion: string;
}

type TipoEntrega = 'domicilio' | 'retiro' | 'punto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito {
  private readonly productosService = inject(ProductosService);

  readonly items = signal<ItemCarrito[]>([
    { producto: this.productosService.obtenerPorNombre('Croquetas Premium')!, cantidad: 1 },
    { producto: this.productosService.obtenerPorNombre('Snacks Naturales')!, cantidad: 2 },
  ]);

  readonly entrega = signal<TipoEntrega>('domicilio');
  readonly nota = signal('');
  readonly puntoSeleccionado = signal<PuntoEncuentro | null>(null);

  readonly puntosEncuentro: PuntoEncuentro[] = [
    { nombre: 'Lanús', direccion: 'Estacion lanús' },
    { nombre: 'Lomas de Zamora', direccion: 'Estación Lomas de Zamora' },
    { nombre: 'Alto Avellaneda', direccion: 'Gral. Güemes 897' },
    { nombre: 'Shell', direccion: 'Av. San Martín 4199, Lanús' },
  ];

  readonly total = computed(() =>
    this.items().reduce(
      (acumulado, item) => acumulado + item.producto.precio * item.cantidad,
      0,
    ),
  );

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

  cambiarEntrega(tipo: TipoEntrega): void {
    this.entrega.set(tipo);

    if (tipo !== 'punto') {
      this.puntoSeleccionado.set(null);
    }
  }

  seleccionarPunto(punto: PuntoEncuentro): void {
    this.puntoSeleccionado.set(punto);
  }

  actualizarNota(event: Event): void {
    this.nota.set((event.target as HTMLTextAreaElement).value);
  }

  formatearPrecio(valor: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(valor);
  }
}
