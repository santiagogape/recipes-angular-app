import {Header} from '../general/header';
import {Card} from '../general/card';
import {ID} from '@services/firebase/databaseAPI';

export interface AboutUsStats extends ID{
  intro: Card,
  description: string;
  stats: Header[];
}
