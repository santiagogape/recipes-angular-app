import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private firestore = inject(Firestore);

  // Obtener colección completa
  getCollection(collectionName: string): Observable<any[]> {
    const ref = collection(this.firestore, collectionName);
    return collectionData(ref, { idField: 'id' });
  }

  // Guardar documento
  async saveDocument(collectionName: string, documentId: string, data: any) {
    const ref = doc(this.firestore, `${collectionName}/${documentId}`);
    await setDoc(ref, data);
  }

  // Eliminar documento
  async deleteDocument(collectionName: string, documentId: string) {
    const ref = doc(this.firestore, `${collectionName}/${documentId}`);
    await deleteDoc(ref);
  }
}
