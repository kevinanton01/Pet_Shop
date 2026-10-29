import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-layout-tienda',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './layout-tienda.html',
  styleUrl: './layout-tienda.css',
})
export class LayoutTienda {}
