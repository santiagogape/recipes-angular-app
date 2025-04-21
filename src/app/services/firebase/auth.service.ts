import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  // Observable del estado de autenticación
  authState$ = authState(this.auth);

  // Observable booleano si está autenticado
  isLoggedIn$ = this.authState$.pipe(map(user => !!user));

  constructor(private router: Router) {}

  async signUp(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      // this.router.navigate(['/profile']);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  async signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  async signOut() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }

  private handleAuthError(error: any): string {
    switch(error.code) {
      case 'auth/email-already-in-use':
        return 'El email ya está en uso';
      case 'auth/invalid-email':
        return 'Email inválido';
      case 'auth/weak-password':
        return 'La contraseña es muy débil';
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      default:
        return 'Error desconocido';
    }
  }
}
