import {ImageSrc} from './ImageSrc';

export interface Tab {
  title: string;
  content: string;
}

export interface Marketing {
  reverse: boolean;
  image: ImageSrc
  tabs: Tab[]
}

