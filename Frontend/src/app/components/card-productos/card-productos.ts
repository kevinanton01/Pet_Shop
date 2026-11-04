import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-card-productos',
  templateUrl: './card-productos.html',
  styleUrl: './card-productos.css',
})
export class CardProductos {
  readonly nombre = input.required<string>();
  readonly precio = input.required<number>();
  readonly imagen = input<string>('assets/mascota.jpg');
  readonly descripcion = input<string>('');
  readonly categoria = input<string>('Alimento');
  readonly descuento = input<number | undefined>();

  readonly agregar = output<void>();
  readonly verDetalle = output<void>();
}
