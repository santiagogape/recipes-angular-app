import { Injectable } from '@angular/core';
import {SQLiteDBConnection} from '@capacitor-community/sqlite';
import {SQLITERecipe, Recipe} from "@models/my/my.recipes";
import {recipes_table} from "@services/sqlite/schema.db.service";


@Injectable({ providedIn: 'root' })
export class RecipeTableService {
  constructor() {}

  async addRecipe(
    db: SQLiteDBConnection | null,
    recipe: SQLITERecipe
  ): Promise<void> {
    if (!db) throw new Error('Database not initialized');
    try {
      await db.run(
        `INSERT INTO ${recipes_table} (id,title, text, image_alt, image_src, author, stars, votes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          recipe.id,
          recipe.title,
          recipe.text,
          recipe.image_alt,
          recipe.image_src,
          recipe.author,
          recipe.stars,
          recipe.votes
        ]
      );
    } catch (error) {
      throw error;
    }
  }

  async getRecipeById(
    db: SQLiteDBConnection | null,
    recipeId: string
  ): Promise<SQLITERecipe> {
    if (!db) throw new Error('Database not initialized');
    try {
      const res = await db.query(
        `SELECT * FROM ${recipes_table} WHERE id = ?`,
        [recipeId]
      );
      if (res.values && res.values.length > 0) {
        const row = res.values[0];
        const recipe: SQLITERecipe = {
          id: row.id,
          title: row.title,
          text: row.text,
          image_alt: row.image_alt,
          image_src: row.image_src,
          author: row.author,
          stars: row.stars,
          votes: row.votes,
        };
        return recipe;
      }
      throw new Error(`No recipe found with id: ${recipeId}`);
    } catch (error) {
      throw error;
    }
  }

  async getAllRecipes(
    db: SQLiteDBConnection | null
  ): Promise<SQLITERecipe[]> {
    if (!db) throw new Error('Database not initialized');
    try {
      const res = await db.query(`SELECT * FROM ${recipes_table}`);
      if (!res.values) throw new Error(`No recipes found`);
      return res.values.map((row): SQLITERecipe => {
      return {
        id: row.id,
        title: row.title,
        text: row.text,
        image_alt: row.image_alt,
        image_src: row.image_src,
        author: row.author,
        stars: row.stars,
        votes: row.votes,
      }
      });
    } catch (error) {
      throw error;
    }
  }

  async updateRecipe(
    db: SQLiteDBConnection | null,
    recipe: SQLITERecipe
  ): Promise<void> {
    if (!db) throw new Error('Database not initialized');
    try {
      await db.run(
        `UPDATE ${recipes_table}
       SET title = ?, text = ?, image_alt = ?, image_src = ?, author = ?, stars = ?, votes = ?
       WHERE id = ?`,
        [
          recipe.title,
          recipe.text,
          recipe.image_alt,
          recipe.image_src,
          recipe.author,
          recipe.stars,
          recipe.votes,
          recipe.id
        ]
      );
    } catch (error) {
      throw error;
    }
  }


  async deleteRecipe(
    db: SQLiteDBConnection | null,
    recipeId: string
  ): Promise<void> {
    if (!db) throw new Error('Database not initialized');
    try {
      await db.run(
        `DELETE FROM ${recipes_table} WHERE id = ?`,
        [recipeId]
      );
    } catch (error) {
      throw error;
    }
  }
}
