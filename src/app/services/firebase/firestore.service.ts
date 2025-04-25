import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  setDoc,
  deleteDoc,
  DocumentReference,
  CollectionReference,
  addDoc, docData
} from '@angular/fire/firestore';
import {map, Observable} from 'rxjs';

export interface ID {
  id?: string
}

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  private firestore = inject(Firestore);

  // Obtener colección completa
  getCollection<T extends ID>(collectionName: string, ...path: string[]): Observable<T[]> {
    const ref = collection(this.firestore, collectionName, ...path) as CollectionReference<T>;
    return collectionData(ref, { idField: 'id' });
  }

  getIDs<T extends ID>(collectionName: string, ...path: string[]): Observable<string[]> {
    const ref = collection(this.firestore, collectionName, ...path) as CollectionReference<T>;
    return collectionData(ref, { idField: 'id' }).pipe(
      map((docs: any[]) => docs.map(doc => doc.id)) // Extraemos solo las IDs
    );
  }


  // Guardar documento
  async saveDocument<T extends ID>(data: T, collectionName: string, ...path: string[]): Promise<string> {
    const ref = collection(this.firestore, collectionName, ...path) as CollectionReference<T>;
    return await addDoc(ref, data).then(docRef => {return docRef.id});
  }

  // actualizar documento
  async updateDocument<T extends ID>(documentId: string, data: T, collectionName: string, ...path: string[]) {
    const ref = doc(this.firestore, collectionName, ...path, documentId) as DocumentReference<T>;
    await setDoc(ref, data);
  }

  //leer por id
  getDocument<T extends ID>(id: string, collectionName: string, ...path: string[]): Observable<T> {
    return docData(doc(this.firestore, collectionName, ...path, id) as DocumentReference<T>) as Observable<T>;
  }

  // Eliminar documento
  async deleteDocument(documentId: string, collectionName: string, ...path: string[]) {
    const ref = doc(this.firestore, collectionName, ...path, documentId);
    await deleteDoc(ref);
  }
}
