import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-card-alimento',
  templateUrl: './card-alimento.html',
  styleUrl: './card-alimento.css',
})
export class CardAlimento {
  readonly nombre = input.required<string>();
  readonly precio = input.required<number>();
  readonly imagen = input<string>('assets/mascota.jpg');
  readonly descripcion = input<string>('');
  readonly categoria = input<string>('Alimento');

  readonly agregar = output<void>();
}
