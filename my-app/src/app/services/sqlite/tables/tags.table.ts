import {Injectable} from "@angular/core";
import {SQLiteDBConnection} from '@capacitor-community/sqlite';
import {tags_table} from "@services/sqlite/schema.db.service";
import {RecipeTags} from "@models/my/my.recipes";


@Injectable({ providedIn: 'root' })
export class  TagsTableService {
  constructor() {}

  async addTag(db: SQLiteDBConnection | null, recipeId: string, tag: string, type: 'category' | 'allergen'): Promise<void> {
    if (!db) throw new Error('Database not initialized');
    await db.run(
      `INSERT INTO ${tags_table} (recipe_id, tag_type, tag) VALUES (?, ?, ?)`,
      [recipeId, type, tag]
    );
  }

  async getCategories(db: SQLiteDBConnection | null, recipeId: string): Promise<string[]> {
    return await this.getTags(db, recipeId, 'category');
  }

  async getAllergens(db: SQLiteDBConnection | null, recipeId: string): Promise<string[]> {
    return await this.getTags(db, recipeId, 'allergen');
  }

  private async getTags(db: SQLiteDBConnection | null, recipeId: string, type: 'category' | 'allergen'): Promise<string[]> {
    if (!db) throw new Error('Database not initialized');
    const res = await db.query(
      `SELECT tag FROM ${tags_table} WHERE recipe_id = ? AND tag_type = ?`,
      [recipeId, type]
    );
    return res.values?.map(row => row.tag) ?? [];
  }

  async updateTag(db: SQLiteDBConnection | null, recipeId: string, oldTag: string, newTag: string, type: 'category' | 'allergen'): Promise<void> {
    if (!db) throw new Error('Database not initialized');
    await db.run(
      `UPDATE ${tags_table} SET tag = ? WHERE recipe_id = ? AND tag = ? AND tag_type = ?`,
      [newTag, recipeId, oldTag, type]
    );
  }

  async deleteTag(db: SQLiteDBConnection | null, recipeId: string, tag: string, type: 'category' | 'allergen'): Promise<void> {
    if (!db) throw new Error('Database not initialized');
    await db.run(
      `DELETE FROM ${tags_table} WHERE recipe_id = ? AND tag = ? AND tag_type = ?`,
      [recipeId, tag, type]
    );
  }

  async deleteAllTagsForRecipe(db: SQLiteDBConnection | null, recipeId: string): Promise<void> {
    if (!db) throw new Error('Database not initialized');
    await db.run(
      `DELETE FROM ${tags_table} WHERE recipe_id = ?`,
      [recipeId]
    );
  }

  async getTagsForRecipe(db: SQLiteDBConnection | null, recipeId: string): Promise<RecipeTags> {
    if (!db) throw new Error('Database not initialized');
    let [categories, allergens] = await Promise.all([this.getCategories(db, recipeId), this.getAllergens(db, recipeId)])
    return {categories: categories, allergens: allergens}
  }
}
