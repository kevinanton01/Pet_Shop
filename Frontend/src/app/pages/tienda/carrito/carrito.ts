import { Component, inject, signal } from '@angular/core';
import { CarritoService } from '../../../core/services/carrito.service';

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
  private readonly carritoService = inject(CarritoService);

  readonly items = this.carritoService.items;

  readonly entrega = signal<TipoEntrega>('domicilio');
  readonly nota = signal('');
  readonly puntoSeleccionado = signal<PuntoEncuentro | null>(null);

  readonly puntosEncuentro: PuntoEncuentro[] = [
    { nombre: 'Lanús', direccion: 'Estacion lanús' },
    { nombre: 'Lomas de Zamora', direccion: 'Estación Lomas de Zamora' },
    { nombre: 'Alto Avellaneda', direccion: 'Gral. Güemes 897' },
    { nombre: 'Shell', direccion: 'Av. San Martín 4199, Lanús' },
  ];

  readonly total = this.carritoService.subtotal;

  sumar(nombre: string): void {
    this.carritoService.sumar(nombre);
  }

  restar(nombre: string): void {
    this.carritoService.restar(nombre);
  }

  quitar(nombre: string): void {
    this.carritoService.quitar(nombre);
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
