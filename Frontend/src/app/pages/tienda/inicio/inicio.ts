import { Component } from '@angular/core';
import { CardAlimento } from '../../../components/card-alimento/card-alimento';
import { CardCategorias } from '../../../components/card-categorias/card-categorias';

interface Alimento {
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  categoria: string;
}

@Component({
  selector: 'app-inicio',
  imports: [CardAlimento, CardCategorias],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  readonly masVendidos: Alimento[] = [
    {
      nombre: 'Croquetas Premium',
      precio: 12500,
      imagen: 'assets/alimento-1.jpg',
      descripcion: 'Nutrición completa y balanceada para perros adultos.',
      categoria: 'Perros',
    },
    {
      nombre: 'Alimento Húmedo',
      precio: 3200,
      imagen: 'assets/alimento-2.jpg',
      descripcion: 'Textura suave y sabrosa, fácil de digerir.',
      categoria: 'Gatos',
    },
    {
      nombre: 'Snacks Naturales',
      precio: 2800,
      imagen: 'assets/alimento-3.jpg',
      descripcion: 'Bocaditos saludables para premiar a tu mascota.',
      categoria: 'Perros',
    },
    {
      nombre: 'Comida para Cachorros',
      precio: 9900,
      imagen: 'assets/alimento-4.jpg',
      descripcion: 'Fórmula especial para acompañar su crecimiento.',
      categoria: 'Perros',
    },
    {
      nombre: 'Dieta Light',
      precio: 10400,
      imagen: 'assets/alimento-5.jpg',
      descripcion: 'Balance ideal para mantener un peso saludable.',
      categoria: 'Perros',
    },
  ];
}
