import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-layout-tienda',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './layout-tienda.html',
  styleUrl: './layout-tienda.css',
})
export class LayoutTienda { }
