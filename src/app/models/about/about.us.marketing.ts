import {Header} from '../general/header';
import {Card} from '../general/card';
import { ID } from '@services/firebase/databaseAPI';

export interface AboutUsMarketing extends ID{
  header: Header
  description: string
  features: Card[]
}
