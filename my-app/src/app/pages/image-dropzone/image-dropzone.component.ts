import {Component, effect, ElementRef, inject, input, output, ViewChild} from '@angular/core';
import {IonImg, IonLabel} from "@ionic/angular/standalone";
import {NgIf} from "@angular/common";
import {ProxyFetchService} from "@services/proxy.service";

@Component({
    selector: 'app-image-dropzone',
    templateUrl: './image-dropzone.component.html',
    styleUrls: ['./image-dropzone.component.scss'],
    imports: [
        IonImg,
        IonLabel,
        NgIf
    ]
})
export class ImageDropzoneComponent  {

  proxy = inject(ProxyFetchService)

  constructor() {
    effect(async () => {
      if (this.intro()){
        let photo = await this.proxy.fetchFileViaProxy(this.intro(), "intro.jpg")
        this.showPreview(photo)
      }
    });
  }


  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('preview') preview!: ElementRef;

  previewUrl: string | null = null;
  photo: File | null = null;

  image = output<File>();

  intro = input<string>("")


  onDropzoneClick() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.showPreview(file);
    }
  }

  showPreview(file: File) {
    if (!file.type.startsWith('image/')) return;
    this.image.emit(file);
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.previewUrl = e.target?.result as string;
      this.photo = file;
    };
    reader.readAsDataURL(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    (event.currentTarget as HTMLElement).style.borderColor = '#555';
  }

  onDragLeave() {
    const dropzone = document.querySelector('.image-dropzone') as HTMLElement;
    dropzone.style.borderColor = '#ccc';
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.showPreview(file);
    }
    const dropzone = document.querySelector('.image-dropzone') as HTMLElement;
    dropzone.style.borderColor = '#ccc';
  }


  getExtensionFromMime(type: string):string {
    const map:Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
    };
    return map[type] || "bin";
  }

  proxyUrl(url:string) {
    return `http://localhost:3000/proxy-image?url=${encodeURIComponent(url)}`;
  }

  async fetchFileFromUrl(url: string, filename = "photo") {
    const response = await fetch(this.proxyUrl(url));
    if (!response.ok) throw new Error("❌ No se pudo obtener el recurso");

    const blob = await response.blob();
    const extension = this.getExtensionFromMime(blob.type);
    return new File([blob], `${filename}.${extension}`, { type: blob.type });
  }
}
