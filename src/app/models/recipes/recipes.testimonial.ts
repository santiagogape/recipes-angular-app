import {ID} from '@services/firebase/databaseAPI';

export interface RecipesTestimonial extends ID{
  valuation: number,
  description: string,
  author: string,
  job: string
}
