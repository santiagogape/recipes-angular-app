import {ImageSrc} from './ImageSrc';

export interface Tab {
  title: string;
  content: string;
}

export interface Marketing {
  image: ImageSrc
  tabs: Tab[]
  side: string
}

