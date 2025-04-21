import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirebaseTestService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  async testConnection(): Promise<void> {
    try {
      // 1. Primero prueba Authentication
      const testEmail = `testuser_${Date.now()}@test.com`;
      console.log('Probando Authentication...');

      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        testEmail,
        'Test1234!'
      );
      console.log('✅ Authentication funciona - Usuario creado:', userCredential.user.uid);

      // 2. Luego prueba Firestore
      console.log('Probando Firestore...');
      const testDocRef = doc(this.firestore, `test_connection/${Date.now()}`);
      await setDoc(testDocRef, {
        test: true,
        timestamp: new Date()
      });
      console.log('✅ Firestore funciona - Documento creado');

    } catch (error) {
      console.error('❌ Error en prueba:', error);
      throw error;
    }
  }

  private async cleanupTest(userId: string, docId: string): Promise<void> {
    try {
      // Opcional: Eliminar usuario de prueba
      // await deleteUser(await getAuth().currentUser);

      // Opcional: Eliminar documento de prueba
      // await deleteDoc(doc(this.firestore, `test_connection/${docId}`));
    } catch (cleanupError) {
      console.warn('Advertencia en limpieza:', cleanupError);
    }
  }
}
