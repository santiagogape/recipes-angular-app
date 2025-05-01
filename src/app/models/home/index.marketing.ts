import {ImageSrc} from '../general/ImageSrc';
import {Header} from '../general/header';
import {ID} from '@services/firebase/databaseAPI';

export interface IndexMarketing {
  reverse: boolean;
  image: ImageSrc
  tabs: Header[]
}

export interface HomeMarketingSection extends ID {
  sections: IndexMarketing[]
}
