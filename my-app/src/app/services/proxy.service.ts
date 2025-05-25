import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProxyFetchService {
  private http = inject(HttpClient);
  private proxyUrl = 'http://localhost:3000/proxy-file?url=';

  /**
   * Dado una URL de imagen o archivo, devuelve un File descargado vía el proxy.
   */
  async fetchFileViaProxy(remoteUrl: string, filename = 'archivo'): Promise<File> {
    const blob = await firstValueFrom(
      this.http.get(this.proxyUrl + encodeURIComponent(remoteUrl), { responseType: 'blob' })
    );
    const contentType = blob.type || 'application/octet-stream';

    return new File([blob], filename, { type: contentType });
  }
}
