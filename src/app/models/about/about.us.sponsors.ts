import {ImageSrc} from '../general/ImageSrc';
import {ID} from '@services/firebase/databaseAPI';

export interface AboutUsSponsors extends ID{
  title: string;
  sponsors: ImageSrc[];
}
