export interface ImageSrc {
  src: string;
  alt: string;
}

export function ImageSrcInitializer(){
  return new class implements ImageSrc {
    alt: string = "";
    src: string = "";
  }
}
