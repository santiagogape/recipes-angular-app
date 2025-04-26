import {ImageSrc} from '../general/ImageSrc';
import {Header} from '../general/header';
import {ID} from '@services/firebase/databaseAPI';

export interface IndexMarketing extends ID{
  reverse: boolean;
  image: ImageSrc
  tabs: Header[]
}

