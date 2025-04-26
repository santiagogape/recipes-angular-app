import {Header} from '../general/header';
import {ImageSrc} from '../general/ImageSrc';
import {ID} from '@services/firebase/databaseAPI';

export interface RecipesGallery extends ID{
  header: Header
  first: ImageSrc[]
  middle: ImageSrc[]
  last: ImageSrc[]
}
