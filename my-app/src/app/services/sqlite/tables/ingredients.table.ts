import { Injectable } from '@angular/core';
import {SQLiteDBConnection} from '@capacitor-community/sqlite';
import {HeaderID} from "@models/my/my.recipes";
import {ingredients_table} from "@services/sqlite/schema.db.service";
import {Header} from "@models/general/header";

@Injectable({ providedIn: 'root' })
export class IngredientTableService {
  constructor() {}

  async addIngredient(
    db: SQLiteDBConnection | null,
    recipeId: string,
    ingredient: Header
  ) {
    try {
      if (!db) throw new Error('Database not initialized');
      await db.run(
        `INSERT INTO ${ingredients_table} (recipe_id, title, text) VALUES (?, ?, ?)`,
        [recipeId, ingredient.title, ingredient.text]
      )
    } catch (error) {
      throw error;
    }
  }

  async updateIngredient(
    db: SQLiteDBConnection | null,
    ingredient: HeaderID
  ) {
    try {
      if (!db) throw new Error('Database not initialized');
      await db.run(
        `UPDATE ${ingredients_table} SET title = ?, text = ? WHERE id = ?`,
        [ingredient.title, ingredient.text, ingredient.id]
      )
    } catch (error) {
      throw error;
    }
  }

  async getIngredients(db: SQLiteDBConnection | null, recipeId: string): Promise<HeaderID[]> {
    if (!db) throw new Error('Database not initialized');
    try {
      const res = await db.query(
        `SELECT id, title, text FROM ${ingredients_table} WHERE recipe_id = ? ORDER BY id ASC`,
        [recipeId]
      );
      return res.values?.map((row):HeaderID => ({
        id: row.id,
        title: row.title,
        text: row.text
      })) ?? [];
    } catch (error) {
      throw error;
    }
  }

  async deleteIngredient(db: SQLiteDBConnection | null, ingredient: HeaderID) {
    if (!db) throw new Error('Database not initialized');
    try {
      await db.run(
        `DELETE FROM ${ingredients_table} WHERE id = ?`,
        [ingredient.id]
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteAllIngredientsForRecipe(db: SQLiteDBConnection | null, recipeId: string) {
    if (!db) throw new Error('Database not initialized');
    try {
      await db.run(
        `DELETE FROM ${ingredients_table} WHERE recipe_id = ?`,
        [recipeId]
      );
    } catch (error) {
      throw error;
    }
  }
}
