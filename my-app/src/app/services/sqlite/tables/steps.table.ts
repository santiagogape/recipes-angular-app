import { Injectable } from '@angular/core';
import {SQLiteDBConnection} from '@capacitor-community/sqlite';
import {HeaderID} from "@models/my/my.recipes";
import {steps_table} from "@services/sqlite/schema.db.service";

@Injectable({ providedIn: 'root' })
export class StepsTableService {

  async addRecipeStep(
    db: SQLiteDBConnection | null,
    recipeId: string,
    step: HeaderID
  ): Promise<void> {
    if (!db) throw new Error('Database not initialized');
    try {
      await db.run(
        `INSERT INTO ${steps_table} (recipe_id, title, text) VALUES (?, ?, ?)`,
        [recipeId, step.title, step.text]
      );
    } catch (error) {
      throw error;
    }
  }

  async getRecipeSteps(
    db: SQLiteDBConnection | null,
    recipeId: string
  ): Promise<HeaderID[]> {
    if (!db) throw new Error('Database not initialized');
    try {
      const res = await db.query(
        `SELECT id, title, text FROM ${steps_table} WHERE recipe_id = ? ORDER BY id ASC`,
        [recipeId]
      );
      return res.values?.map(row => ({
        id: row.id,
        title: row.title,
        text: row.text
      })) ?? [];
    } catch (error) {
      throw error;
    }
  }

  async updateRecipeStep(
    db: SQLiteDBConnection | null,
    step: HeaderID
  ): Promise<void> {
    if (!db) throw new Error('Database not initialized');
    try {
      await db.run(
        `UPDATE ${steps_table} SET title = ?, text = ? WHERE id = ?`,
        [step.title, step.text, step.id]
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteRecipeStep(
    db: SQLiteDBConnection | null,
    step:HeaderID
  ): Promise<void> {
    if (!db) throw new Error('Database not initialized');
    try {
      await db.run(
        `DELETE FROM ${steps_table} WHERE id = ?`,
        [step.id]
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteAllStepsForRecipe(
    db: SQLiteDBConnection | null,
    recipeId: string,
  ): Promise<void> {
    if (!db) throw new Error('Database not initialized');
    try {
      await db.run(
        `DELETE FROM ${steps_table} WHERE recipe_id = ?`,
        [recipeId]
      );
    } catch (error) {
      throw error;
    }
  }

}
