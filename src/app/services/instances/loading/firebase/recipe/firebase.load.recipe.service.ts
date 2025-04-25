import { RecipeService } from "@services/interfaces/loading/recipes/recipe/recipe.service";
import {Injectable} from '@angular/core';
import { Recipe } from "@models/my/my.recipes";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class FirebaseLoadRecipeService implements RecipeService {
    getRecipe(src: string): Observable<Recipe> {
        throw new Error("Method not implemented.");
    }
}
