import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type AuthMode = 'login' | 'crear';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  protected readonly modo = signal<AuthMode>('login');

  protected cambiarModo(modo: AuthMode): void {
    this.modo.set(modo);
  }

  protected enviar(event: Event): void {
    event.preventDefault();
  }
}
