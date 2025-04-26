import {Header} from '../general/header';
import {Card} from '../general/card';
import {ID} from '@services/firebase/databaseAPI';

export interface RecipesIngredients extends ID{
  header: Header
  cards: Card[]
}
