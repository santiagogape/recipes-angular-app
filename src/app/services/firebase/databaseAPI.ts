import { Observable } from "rxjs"

export interface ID {
  id?: string
}

export interface DatabaseAPI {
  getCollection<T extends ID>(collectionName: string, ...path: string[]): Observable<T[]>
  getIDs(collectionName: string, ...path: string[]): Observable<string[]>

  createDocument<T extends ID>(data: T, collectionName: string, ...path: string[]): Promise<string>
  readDocument<T extends ID>(id: string, collectionName: string, ...path: string[]): Observable<T>
  updateDocument<T extends ID>(documentId: string, data: T, collectionName: string, ...path: string[]): Promise<void>
  deleteDocument(documentId: string, collectionName: string, ...path: string[]): Promise<void>
}
