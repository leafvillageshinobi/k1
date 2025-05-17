import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import { useAuth } from '../hooks/useAuth';
import { Category,CategoryInput } from '../types';
import { categoryService } from '../services/category/categoryService';

export const CategoryManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({ categoryName: '' });
  const [categoryItems, setCategoryItems] = useState<Category[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        const items = await categoryService.getCategories();
        setCategoryItems(items);
      } catch (err) {
        setError('Failed to load categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryItems();
  }, []);

  const addCategory = (item: Category) => {
    setCategoryItems((prev) => [...prev, { ...item }]);
  };

  const handleSubmit = async () => {
    if (!user || newCategory.categoryName.length === 0 || submitting) {
      setError('Please enter a category name');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const item = {
        name: newCategory.categoryName
    
      };
      const itemFetched = await categoryService.submitCategory(item.name);
      addCategory(itemFetched);
      setSuccessMessage('Category added successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to add category');
      console.error('Category addition error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (categoryId: string) => {
    try {
      await categoryService.deleteCategory(categoryId);
      setSuccessMessage('Category deleted successfully');
      setCategoryItems((prev) => prev.filter((item) => item.id !== categoryId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete category');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      <Paper sx={{ p: 2 }}>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5">Category Management</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
            Add Category
          </Button>
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category Name</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryItems.map((category) => (
            <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{format(new Date(category.created_at), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    
                    <Button startIcon={<DeleteIcon />} color="error" onClick={() => handleDelete(category.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            fullWidth
            value={newCategory.categoryName}
            onChange={(e) => setNewCategory({ ...newCategory, categoryName: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Add Category
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
