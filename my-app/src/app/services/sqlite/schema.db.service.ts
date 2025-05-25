import {inject, Injectable} from "@angular/core";
import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from "@capacitor-community/sqlite";
import {Platform} from "@ionic/angular";
import {Capacitor} from "@capacitor/core";
import {Recipe, RecipeToSQLITE, SQLITEToRecipe} from "@models/my/my.recipes";
import {IngredientTableService} from "@services/sqlite/tables/ingredients.table";
import {StepsTableService} from "@services/sqlite/tables/steps.table";
import {TagsTableService} from "@services/sqlite/tables/tags.table";
import {RecipeTableService} from "@services/sqlite/tables/recipes.table";

const recipes_table = "RECIPES";
const ingredients_table = "INGREDIENTS";
const steps_table = "STEPS";
const tags_table = "TAGS";

export {recipes_table, ingredients_table, steps_table, tags_table}

@Injectable({providedIn: 'root'})
export class Schema {

  readonly names = ["RECIPES","INGREDIENTS","STEPS","TAGS"]

  readonly RECIPES = `CREATE TABLE IF NOT EXISTS RECIPES (
      id TEXT PRIMARY KEY,
      title TEXT,
      text TEXT,
      image_alt TEXT,
      image_src TEXT,
      author TEXT,
      stars INTEGER,
      votes INTEGER
    );`
  readonly INGREDIENTS = `CREATE TABLE IF NOT EXISTS INGREDIENTS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id TEXT,
      title TEXT,
      text TEXT,
      FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    );`
  readonly STEPS = `CREATE TABLE IF NOT EXISTS STEPS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id TEXT,
      title TEXT,
      text TEXT,
      FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    );`
  readonly TAGS = `CREATE TABLE IF NOT EXISTS TAGS (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipe_id TEXT,
      tag_type TEXT,
      tag TEXT,
      FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    );`


  private sqlite: SQLiteConnection;
  private connection: SQLiteDBConnection | null = null;
  private isWeb: boolean = false;
  private readonly STORAGE_KEY = 'favorites';
  private readonly STORAGE_DB = 'favoritesDB';
  recipesTable = inject(RecipeTableService)
  ingredientsTable = inject(IngredientTableService)
  stepsTable = inject(StepsTableService)
  tagsTable = inject(TagsTableService)

  constructor(private platform: Platform) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.init();
  }

  private async init() {
    await this.platform.ready();
    this.isWeb = Capacitor.getPlatform() === 'web';

    if (!this.isWeb) {
      try {
        const db = await this.sqlite.createConnection(
          this.STORAGE_DB, false, 'no-encryption', 1, false
        );
        await db.open();
        await db.execute(this.RECIPES);
        await db.execute(this.INGREDIENTS);
        await db.execute(this.STEPS);
        await db.execute(this.TAGS);
        await db.execute('PRAGMA foreign_keys = ON;');
        this.connection = db;
      } catch (error) {
        console.error('Error opening SQLite database', error);
      }
    }
  }

  async getFavorites(): Promise<Recipe[]> {
    let recipes: Recipe[] = []
    if (this.isWeb) {
      const favorites = localStorage.getItem(this.STORAGE_KEY);
      if (favorites) {
        recipes= favorites ? JSON.parse(favorites) : [];
        return recipes;
      } else {
        return recipes;
      }
    } else if (this.connection){
      await this.recipesTable.getAllRecipes(this.connection).then((all) => {
        return all.map(plain => SQLITEToRecipe(plain))
      }).then( async (partial) => {
        await Promise.all(partial.map(async (r) => {
          if(r.id){
            r.ingredients = await this.ingredientsTable.getIngredients(this.connection, r.id)
            r.steps = await this.stepsTable.getRecipeSteps(this.connection, r.id)
            r.description.tags = await this.tagsTable.getTagsForRecipe(this.connection, r.id)
          } else throw Error("recipe no ID => not indexable on subordinated")
        }))
        console.log("favourites after partial.map()", recipes)
        recipes = partial
      })
    }
    console.log("returning favourites", recipes)
    return recipes
  }

  async addFavourite(recipe: Recipe){
    if (this.isWeb) {
      const favorites = await this.getFavorites();
      const exists = favorites.some(fav => fav.id === recipe.id);
      if (!exists) {
        const favoriteItem = recipe;
        favorites.push(favoriteItem);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
        //this.favoritesChanged.next();
      }
    } else if (this.connection){
      if (recipe.id){
        await this.recipesTable.addRecipe(this.connection, RecipeToSQLITE(recipe))
        let key = recipe.id
        await Promise.all(recipe.ingredients.map(i => this.ingredientsTable.addIngredient(this.connection, key, i)))
        await Promise.all(recipe.steps.map(s => this.stepsTable.addRecipeStep(this.connection, key, s)))
        await Promise.all(recipe.description.tags.categories.map(t => this.tagsTable.addTag(this.connection, key, t, "category")))
        await Promise.all(recipe.description.tags.allergens.map(t => this.tagsTable.addTag(this.connection, key, t, "allergen")))
      }
    }
  }

  async removeFavourite(recipeId: string){
    if (this.isWeb) {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.filter((fav) => fav.id !== recipeId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedFavorites));
    } else if (this.connection) {
      await this.recipesTable.deleteRecipe(this.connection, recipeId)
      // deleted on cascade:
      //await this.ingredientsTable.deleteAllIngredientsForRecipe(this.connection, recipeId)
      //await this.stepsTable.deleteAllStepsForRecipe(this.connection, recipeId)
      //await this.tagsTable.deleteAllTagsForRecipe(this.connection, recipeId)
    }
  }


  async clearFavorites(): Promise<void> {
    if (this.isWeb) {
      localStorage.removeItem(this.STORAGE_KEY);
      //this.favoritesChanged.next();
    } else if (this.connection) {
      await this.connection.execute(`DELETE FROM RECIPES`);
      //this.favoritesChanged.next();
    }
  }

  async modifyFavourite(recipe: Recipe){
    if (this.isWeb) {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.map((fav) => fav.id === recipe.id ? recipe : fav);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedFavorites));
    } else if (this.connection && recipe.id) {
      await this.recipesTable.deleteRecipe(this.connection, recipe.id)
      this.addFavourite(recipe)
    }
  }


  async tableExists(db: SQLiteDBConnection | null, tableName: "RECIPES" | "INGREDIENTS" | "STEPS" | "TAGS"): Promise<boolean> {
    if (!db) throw new Error('DB connection is null');
    try {
      const result = await db.query(
        `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
        [tableName]
      );
      return !result.values?.length ? false : result.values?.length > 0;
    } catch (error) {
      throw error;
    }
  }

  async dropTable(db: SQLiteDBConnection, tableName: string): Promise<void> {
    if (!db) throw new Error('Database connection is null');

    try {
      await db.execute(`DROP TABLE IF EXISTS ${tableName}`);
      console.log(`Tabla '${tableName}' eliminada.`);
    } catch (err) {
      console.error(`Error al eliminar la tabla ${tableName}:`, err);
      throw err;
    }
  }

  async dropALL(db: SQLiteDBConnection){
    for (const name of this.names) {
      await this.dropTable(db, name);
    }
  }

}
