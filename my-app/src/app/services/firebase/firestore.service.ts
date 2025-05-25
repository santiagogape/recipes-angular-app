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
import {combineLatest, map, Observable} from 'rxjs';
import { DatabaseAPI, ID } from './databaseAPI';
import {AuthorRecipe, AuthorRecipeData} from '@models/general/AuthorRecipePair';
import { User } from '@models/my/user';
import {Recipe} from '@models/my/my.recipes';
import {RecipesTestimonial, RecipesTestimonialData} from '@models/recipes/recipes.testimonial';


@Injectable({ providedIn: 'root' })
export class FirestoreService implements DatabaseAPI {
  firestore = inject(Firestore);

  // Obtener colección completa
  getCollection<T extends ID>(collectionName: string, ...path: string[]): Observable<T[]> {
    const ref = collection(this.firestore, collectionName, ...path) as CollectionReference<T>;
    return collectionData(ref, { idField: 'id' });
  }

  getIDs(collectionName: string, ...path: string[]): Observable<string[]> {
    const ref = collection(this.firestore, collectionName, ...path);
    return collectionData(ref, { idField: 'id' }).pipe(
      map((docs: any[]) => docs.map(doc => doc.id)) // Extraemos solo las IDs
    );
  }

  generateID(collectionName: string, ...path: string[]){
    return doc(this.firestore, collectionName, ...path).id
  }


  // Guardar documento
  async createDocument<T extends ID>(data: T, collectionName: string, ...path: string[]): Promise<string> {
    const ref = collection(this.firestore, collectionName, ...path) as CollectionReference<T>;
    return await addDoc(ref, data).then(docRef => {return docRef.id});
  }

  // actualizar documento
  async updateDocument<T extends ID>(documentId: string, data: T, collectionName: string, ...path: string[]) {
    const ref = doc(this.firestore, collectionName, ...path, documentId) as DocumentReference<T>;
    await setDoc(ref, data);
  }

  //leer por ID
  readDocument<T extends ID>(id: string, collectionName: string, ...path: string[]): Observable<T> {
    return docData(doc(this.firestore, collectionName, ...path, id) as DocumentReference<T>, { idField: 'id' }) as Observable<T>;
  }

  // Eliminar documento
  async deleteDocument(documentId: string, collectionName: string, ...path: string[]) {
    const ref = doc(this.firestore, collectionName, ...path, documentId);
    await deleteDoc(ref);
  }

  getAuthorRecipeDataFromID(pair: AuthorRecipe): Observable<AuthorRecipeData> {
    return combineLatest([
      this.readDocument<User>(pair.author,"users"),
      this.readDocument<Recipe>(pair.recipe,"users",pair.author,"recipes")
    ]).pipe(
      map(
        ([authorData, valorData]) =>
        ({ id:pair.id, authorData:authorData, recipeData: valorData })
      )
    );
  }

  getTestimonialDataFromID(testimonial: RecipesTestimonial): Observable<RecipesTestimonialData> {
    return combineLatest([
      this.readDocument<User>(testimonial.author,"users"),
      this.getAuthorRecipeDataFromID(testimonial.recipe)
    ]).pipe(
      map(
        ([authorData, valorData]) =>
          ({
            id:testimonial.id,
            valuation:testimonial.valuation,
            description:testimonial.description,
            author:authorData,
            recipe:valorData
          })
      )
    )
  }


}
