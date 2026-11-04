import { Injectable } from '@angular/core';

export interface Producto {
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  categoria: string;
  filtros: string[];
  cant_vendidos: number;
}

@Injectable({ providedIn: 'root' })
export class ProductosService {
  readonly productos: Producto[] = [
    {
      nombre: 'Croquetas Premium',
      precio: 12500,
      imagen: 'assets/alimento-1.jpg',
      descripcion: 'Nutrición completa y balanceada para perros adultos.',
      categoria: 'Perros',
      filtros: ['alimentos', 'perros'],
      cant_vendidos: 320,
    },
    {
      nombre: 'Alimento Húmedo',
      precio: 3200,
      imagen: 'assets/alimento-2.jpg',
      descripcion: 'Textura suave y sabrosa, fácil de digerir.',
      categoria: 'Gatos',
      filtros: ['alimentos', 'gatos'],
      cant_vendidos: 210,
    },
    {
      nombre: 'Snacks Naturales',
      precio: 2800,
      imagen: 'assets/alimento-3.jpg',
      descripcion: 'Bocaditos saludables para premiar a tu mascota.',
      categoria: 'Perros',
      filtros: ['alimentos', 'perros'],
      cant_vendidos: 185,
    },
    {
      nombre: 'Comida para Cachorros',
      precio: 9900,
      imagen: 'assets/alimento-4.jpg',
      descripcion: 'Fórmula especial para acompañar su crecimiento.',
      categoria: 'Perros',
      filtros: ['alimentos', 'perros'],
      cant_vendidos: 140,
    },
    {
      nombre: 'Dieta Light',
      precio: 10400,
      imagen: 'assets/alimento-5.jpg',
      descripcion: 'Balance ideal para mantener un peso saludable.',
      categoria: 'Perros',
      filtros: ['alimentos', 'perros'],
      cant_vendidos: 95,
    },
    {
      nombre: 'Mezcla para Aves',
      precio: 5400,
      imagen: 'assets/alimento-3.jpg',
      descripcion: 'Semillas seleccionadas para una alimentación completa.',
      categoria: 'Aves',
      filtros: ['alimentos', 'aves'],
      cant_vendidos: 60,
    },
    {
      nombre: 'Alimento para Conejos',
      precio: 6100,
      imagen: 'assets/alimento-1.jpg',
      descripcion: 'Nutrientes esenciales para mascotas pequeñas.',
      categoria: 'Otros',
      filtros: ['alimentos', 'otros'],
      cant_vendidos: 45,
    },
    {
      nombre: 'Juguete Mordedor',
      precio: 4500,
      imagen: 'assets/mascota.jpg',
      descripcion: 'Resistente y divertido, ideal para el juego diario.',
      categoria: 'Juguetes',
      filtros: ['juguetes'],
      cant_vendidos: 230,
    },
    {
      nombre: 'Ropa Impermeable',
      precio: 7900,
      imagen: 'assets/mascota.jpg',
      descripcion: 'Abrigo liviano para pasear los días de lluvia.',
      categoria: 'Ropa',
      filtros: ['ropa'],
      cant_vendidos: 70,
    },
    {
      nombre: 'Shampoo Suave',
      precio: 3800,
      imagen: 'assets/mascota.jpg',
      descripcion: 'Limpieza delicada que cuida la piel y el pelaje.',
      categoria: 'Higiene',
      filtros: ['higiene', 'shampoo'],
      cant_vendidos: 110,
    },
    {
      nombre: 'Perfume Fresco',
      precio: 4200,
      imagen: 'assets/mascota.jpg',
      descripcion: 'Aroma duradero y suave para después del baño.',
      categoria: 'Higiene',
      filtros: ['higiene', 'perfumes'],
      cant_vendidos: 80,
    },
    {
      nombre: 'Camita Acolchada',
      precio: 18900,
      imagen: 'assets/mascota.jpg',
      descripcion: 'Confort y abrigo para que descansen como se merecen.',
      categoria: 'Accesorios',
      filtros: ['accesorios'],
      cant_vendidos: 150,
    },
  ];

  obtenerPorNombre(nombre: string): Producto | undefined {
    return this.productos.find((producto) => producto.nombre === nombre);
  }
}
