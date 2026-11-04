import { Injectable } from '@angular/core';

export interface Producto {
  nombre: string;
  precio: number;
  imagen: string;
  descripcion: string;
  categoria: string;
  cant_vendidos: number;
  peso?: string;
  descuento?: number;
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
      cant_vendidos: 320,
      peso: '15 kg',
      descuento: 10,
    },
    {
      nombre: 'Alimento Húmedo',
      precio: 3200,
      imagen: 'assets/alimento-2.jpg',
      descripcion: 'Textura suave y sabrosa, fácil de digerir.',
      categoria: 'Gatos',
      cant_vendidos: 210,
      peso: '340 g',
    },
    {
      nombre: 'Snacks Naturales',
      precio: 2800,
      imagen: 'assets/alimento-3.jpg',
      descripcion: 'Bocaditos saludables para premiar a tu mascota.',
      categoria: 'Perros',
      cant_vendidos: 185,
      peso: '500 g',
    },
    {
      nombre: 'Comida para Cachorros',
      precio: 9900,
      imagen: 'assets/alimento-4.jpg',
      descripcion: 'Fórmula especial para acompañar su crecimiento.',
      categoria: 'Perros',
      cant_vendidos: 140,
      peso: '10 kg',
      descuento: 15,
    },
    {
      nombre: 'Dieta Light',
      precio: 10400,
      imagen: 'assets/alimento-5.jpg',
      descripcion: 'Balance ideal para mantener un peso saludable.',
      categoria: 'Perros',
      cant_vendidos: 95,
      peso: '12 kg',
    },
    {
      nombre: 'Mezcla para Aves',
      precio: 5400,
      imagen: 'assets/alimento-3.jpg',
      descripcion: 'Semillas seleccionadas para una alimentación completa.',
      categoria: 'Aves',
      cant_vendidos: 60,
      peso: '1 kg',
    },
    {
      nombre: 'Alimento para Conejos',
      precio: 6100,
      imagen: 'assets/alimento-1.jpg',
      descripcion: 'Nutrientes esenciales para mascotas pequeñas.',
      categoria: 'Otros',
      cant_vendidos: 45,
      peso: '2 kg',
    },
    {
      nombre: 'Juguete Mordedor',
      precio: 4500,
      imagen: 'assets/mascota.jpg',
      descripcion: 'Resistente y divertido, ideal para el juego diario.',
      categoria: 'Juguetes',
      cant_vendidos: 230,
    },
    {
      nombre: 'Ropa Impermeable',
      precio: 7900,
      imagen: 'assets/mascota.jpg',
      descripcion: 'Abrigo liviano para pasear los días de lluvia.',
      categoria: 'Ropa',
      cant_vendidos: 70,
    },
    {
      nombre: 'Shampoo Suave',
      precio: 3800,
      imagen: 'assets/mascota.jpg',
      descripcion: 'Limpieza delicada que cuida la piel y el pelaje.',
      categoria: 'Shampoo',
      cant_vendidos: 110,
      peso: '500 ml',
      descuento: 20,
    },
    {
      nombre: 'Perfume Fresco',
      precio: 4200,
      imagen: 'assets/mascota.jpg',
      descripcion: 'Aroma duradero y suave para después del baño.',
      categoria: 'Perfumes',
      cant_vendidos: 80,
      peso: '250 ml',
    },
    {
      nombre: 'Camita Acolchada',
      precio: 18900,
      imagen: 'assets/mascota.jpg',
      descripcion: 'Confort y abrigo para que descansen como se merecen.',
      categoria: 'Accesorios',
      cant_vendidos: 150,
    },
  ];

  obtenerPorNombre(nombre: string): Producto | undefined {
    return this.productos.find((producto) => producto.nombre === nombre);
  }
}
