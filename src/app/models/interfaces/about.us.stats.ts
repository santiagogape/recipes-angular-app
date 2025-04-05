import {Header} from './header';
import {ImageSrc} from './ImageSrc';

export interface AboutUsStats {
  header: Header,
  description: string;
  image: ImageSrc;
  stats: Header[];
}
