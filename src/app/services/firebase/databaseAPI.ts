import { Observable } from "rxjs"
import {AuthorRecipe, AuthorRecipeData} from '@models/general/AuthorRecipePair';
import {RecipesTestimonial, RecipesTestimonialData} from '@models/recipes/recipes.testimonial';

export interface ID {
  id?: string
}

export interface DatabaseAPI {
  //for collections
  getCollection<T extends ID>(collectionName: string, ...path: string[]): Observable<T[]>
  getIDs(collectionName: string, ...path: string[]): Observable<string[]>

  //CRUD documents
  createDocument<T extends ID>(data: T, collectionName: string, ...path: string[]): Promise<string>
  readDocument<T extends ID>(id: string, collectionName: string, ...path: string[]): Observable<T>
  updateDocument<T extends ID>(documentId: string, data: T, collectionName: string, ...path: string[]): Promise<void>
  deleteDocument(documentId: string, collectionName: string, ...path: string[]): Promise<void>

  //PAIR
  getAuthorRecipeDataFromID(pair: AuthorRecipe): Observable<AuthorRecipeData>
  getTestimonialDataFromID(testimonial: RecipesTestimonial): Observable<RecipesTestimonialData>
}
