
import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlatformService {
  private isAndroidDevice = signal(this.checkIfAndroid());

  private checkIfAndroid(): boolean {
    return /android/i.test(navigator.userAgent);
  }

  isAndroid = computed(() => this.isAndroidDevice());
}
