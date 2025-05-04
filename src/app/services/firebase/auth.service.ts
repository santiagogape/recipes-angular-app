import {Injectable, inject, signal} from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from '@angular/fire/auth';
import { map, shareReplay, tap} from 'rxjs';
import {NoLogin} from '@services/error.codes';


@Injectable({providedIn: 'root'})
export class AuthService {
  private auth = inject(Auth);
  currentUserID = signal<string>("")

  // Observable del estado de autenticación
  authState$ = authState(this.auth);

  // Observable booleano si está autenticado
  isLoggedIn$ = this.authState$.pipe(
    map(user => !!user),
    shareReplay(1)
  );

  constructor() {
    this.authState$.pipe(
      map(user => user?.uid || NoLogin),
      tap(x => this.currentUserID.set(x))
    );
  }

  async signUp(email: string, password: string, username: string) {
    try {
      return await createUserWithEmailAndPassword(this.auth, email, password)
        .then(async (userCredential) => {
          await updateProfile(userCredential.user, {displayName: username})
          this.currentUserID.set(userCredential.user.uid)
          return userCredential.user.uid;
        })
    } catch (error: any) {
      throw new Error(this.handleAuthError(error));
    }
  }

  async signIn(email: string, password: string){
    try {
      let id =  (await signInWithEmailAndPassword(this.auth, email, password)).user.uid
      this.currentUserID.set(id)
      return id;
    } catch (error: any) {
      throw new Error(this.handleAuthError(error));
    }
  }

  async signOut() {
    this.currentUserID.set(NoLogin)
    await signOut(this.auth)
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
