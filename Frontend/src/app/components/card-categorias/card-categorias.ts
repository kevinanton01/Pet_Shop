import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

type CategoriaTipo = 'perros' | 'gatos' | 'aves' | 'otros';

@Component({
  selector: 'app-card-categorias',
  imports: [RouterLink],
  templateUrl: './card-categorias.html',
  styleUrl: './card-categorias.css',
})
export class CardCategorias {
  readonly nombre = input.required<string>();
  readonly tipo = input<CategoriaTipo>('otros');
  readonly ruta = input<string>('/tienda/inicio');
}
