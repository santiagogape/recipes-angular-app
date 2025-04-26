import {Card} from '../general/card';
import {ID} from '@services/firebase/databaseAPI';

export interface AboutUsWelcome extends ID{
  intro: Card
}
