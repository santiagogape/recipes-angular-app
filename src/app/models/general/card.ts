import {Header} from './header';
import {ImageSrc} from './ImageSrc';

export interface Card {
  header: Header;
  image: ImageSrc;
}

export function CardInitializer() {
  return new class implements Card {
    header: Header = {title:"",text:""};
    image: ImageSrc = {alt:"", src:""};
  }
}
