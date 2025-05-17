import { supabase } from '../../config/supabase';
import { Category,CategoryInput } from '../../types';

class CategoryService {
  async addCategory(categoryName: string): Promise<Category> {
    try {
      const { data: { user }, error: sessionError } = await supabase.auth.getUser();
      if (sessionError) throw new Error('Authentication error');
      if (!user) throw new Error('No active session');

      const { data: newCategory, error } = await supabase
        .from('categories')
        .insert({
          name: categoryName,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: newCategory.id,
        name: newCategory.name,
        created_at: newCategory.created_at
      };
    } catch (error: any) {
      console.error('Error adding category:', error);
      throw error;
    }
  }

  async submitCategory(category: String): Promise<Category> {
    try {
      const { data: { user }, error: sessionError } = await supabase.auth.getUser();
      if (sessionError) throw new Error('Authentication error');
      if (!user) throw new Error('No active session');

      const { data: userProfile, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', user.email)
        .single();

      if (userError || !userProfile) {
        throw new Error('User profile not found');
      }

      const { data: submittedCategory, error: categoryError } = await supabase
        .from('categories')
        .insert({
          name: category,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (categoryError) throw categoryError;

      return {
        id: submittedCategory.id,
        name: submittedCategory.name,
        created_at: submittedCategory.created_at
      };
    } catch (error: any) {
      console.error('Error submitting category:', error);
      throw error;
    }
  }

  async deleteCategory(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error: any) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }

  async getCategories(): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;

      return (data || []).map(category => ({
        id: category.id,
        name: category.name,
        created_at: category.created_at
      }));
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async updateCategory(id: string, newName: string): Promise<Category> {
    try {
      const { data: updatedCategory, error } = await supabase
        .from('categories')
        .update({ name: newName })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        id: updatedCategory.id,
        name: updatedCategory.name,
        created_at: updatedCategory.created_at
      };
    } catch (error: any) {
      console.error('Error updating category:', error);
      throw error;
    }
  }
}

export const categoryService = new CategoryService();