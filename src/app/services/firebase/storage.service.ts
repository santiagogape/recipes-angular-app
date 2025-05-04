import { Injectable, inject } from '@angular/core';
import {Storage, ref, uploadBytes, getDownloadURL, deleteObject} from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storage = inject(Storage);

  // Subir archivo
  async uploadFile(file: File, ...path: string[]): Promise<string> {
    const storageRef = ref(this.storage, ...path.concat("/"));
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  }

  // Obtener URL de descarga
  async getFileUrl(...path: string[]): Promise<string> {
    const storageRef = ref(this.storage, ...path);
    return getDownloadURL(storageRef);
  }

  async deleteFile(...path: string[]){
    const storageRef = ref(this.storage, ...path);
    await deleteObject(storageRef);
  }

}
