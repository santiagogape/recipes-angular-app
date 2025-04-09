import {Header} from '../general/header';
import {ImageSrc} from '../general/ImageSrc';

export interface RecipesGallery {
  header: Header
  first: ImageSrc[]
  middle: ImageSrc[]
  last: ImageSrc[]
}
