// import React, { useEffect, useState } from 'react';
// import {
//   Container,
//   Paper,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Select,
//   MenuItem as MuiMenuItem,
//   FormControl,
//   InputLabel,
//   Grid,
//   Card,
//   CardContent,
//   IconButton,
// } from '@mui/material';
// import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import { useMenu } from '../hooks/useMenu';
// import { formatCurrency } from '../utils/date/dateHelpers';
// import LoadingSpinner from './common/LoadingSpinner';
// import { categoryService } from '../services/category/categoryService'; // Import categoryService

// export const MenuManagement: React.FC = () => {
//   const { items, loading, error, addMenuItem, deleteMenuItem } = useMenu();
//   const [categories, setCategories] = useState<string[]>([]); // State for categories
//   const [open, setOpen] = useState(false);
//   const [customCategory, setCustomCategory] = useState('');
//   const [isCustomCategory, setIsCustomCategory] = useState(false);
//   const [newItem, setNewItem] = useState({
//     name_en: '',
//     name_th: '',
//     price: 0,
//     category: '',
//   });

//   // Fetch categories from Supabase
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const fetchedCategories = await categoryService.getCategories();
//         setCategories(fetchedCategories);
//       } catch (err) {
//         console.error('Failed to fetch categories:', err);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleSubmit = async () => {
//     if (!newItem.name_en || !newItem.name_th || !newItem.price) return;

//     // Ensure the category is set correctly before submission
//     if (isCustomCategory && customCategory.trim()) {
//       setNewItem((prev) => ({ ...prev, category: customCategory.trim() }));
//     }

//     await addMenuItem({
//       ...newItem,
//       id: Date.now(),
//       name_en: newItem.name_en,
//       name_th: newItem.name_th,
//       price: Number(newItem.price),
//       category: newItem.category,
//     });

//     setOpen(false);
//     setNewItem({ name_en: '', name_th: '', price: 0, category: '' });
//     setCustomCategory('');
//     setIsCustomCategory(false);
//   };

//   if (loading) {
//     return (
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <LoadingSpinner />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Typography color="error">{error}</Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Paper sx={{ p: 2 }}>
//         <div className="flex justify-between items-center mb-4">
//           <Typography variant="h5">Menu Management</Typography>
//           <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
//             Add Menu Item
//           </Button>
//         </div>

//         <Grid container spacing={3}>
//           {items &&
//             items.map((item) => (
//               <Grid item xs={12} sm={6} md={4} key={item.id}>
//                 <Card>
//                   <CardContent>
//                     <Typography variant="h6">{item.name_en}</Typography>
//                     <Typography variant="subtitle1">{item.name_th}</Typography>
//                     <Typography variant="body1" color="text.secondary">
//                       Category: {item.category}
//                     </Typography>
//                     <Typography variant="h6" color="primary">
//                       {formatCurrency(item.price)}
//                     </Typography>
//                     <IconButton color="error" onClick={() => deleteMenuItem(item.id)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//         </Grid>
//       </Paper>

//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Add Menu Item</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Name (English)"
//             fullWidth
//             value={newItem.name_en}
//             onChange={(e) => setNewItem({ ...newItem, name_en: e.target.value })}
//           />
//           <TextField
//             margin="dense"
//             label="Name (Thai)"
//             fullWidth
//             value={newItem.name_th}
//             onChange={(e) => setNewItem({ ...newItem, name_th: e.target.value })}
//           />
//           <TextField
//             margin="dense"
//             label="Price (THB)"
//             type="number"
//             fullWidth
//             value={newItem.price}
//             onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
//           />

//           <FormControl fullWidth margin="dense">
//             <InputLabel>Category</InputLabel>
//             <Select
//               value={isCustomCategory ? 'new' : newItem.category}
//               onChange={(e) => {
//                 if (e.target.value === 'new') {
//                   setIsCustomCategory(true);
//                   setCustomCategory('');
//                 } else {
//                   setNewItem({ ...newItem, category: e.target.value });
//                   setIsCustomCategory(false);
//                 }
//               }}
//             >
//               {/* Dynamically load categories from Supabase */}
//               {categories.map((category) => (
//                 <MuiMenuItem key={category} value={category}>
//                   {category}
//                 </MuiMenuItem>
//               ))}
//               <MuiMenuItem value="new">➕ Add a new category</MuiMenuItem>
//             </Select>
//           </FormControl>

//           {/* Show input field only if "Add a new category" is selected */}
//           {isCustomCategory && (
//             <TextField
//               margin="dense"
//               label="Enter New Category"
//               fullWidth
//               value={customCategory}
//               onChange={(e) => {
//                 setCustomCategory(e.target.value);
//                 setNewItem((prev) => ({ ...prev, category: e.target.value.trim() }));
//               }}
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button onClick={handleSubmit} variant="contained">
//             Add Item
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// import React, { useEffect, useState } from 'react';
// import {
//   Container,
//   Paper,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Select,
//   MenuItem as MuiMenuItem,
//   FormControl,
//   InputLabel,
//   Grid,
//   Card,
//   CardContent,
//   IconButton,
//   Box,
//   CircularProgress,
// } from '@mui/material';
// import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import { useMenu } from '../hooks/useMenu';
// import { formatCurrency } from '../utils/date/dateHelpers';
// import LoadingSpinner from './common/LoadingSpinner';
// import { categoryService } from '../services/category/categoryService';
// import { useRecoilState } from 'recoil';
// import { categoryAtom } from '../atoms/categoryatom';
// //import { Category } from '../types';

// export const MenuManagement: React.FC = () => {
//   const { items, loading, error, addMenuItem, deleteMenuItem } = useMenu();
//   const [categories, setCategories] = useRecoilState(categoryAtom);
//   const [open, setOpen] = useState(false);
//   const [customCategory, setCustomCategory] = useState('');
//   const [isCustomCategory, setIsCustomCategory] = useState(false);
//   const [categoriesLoading, setCategoriesLoading] = useState(false);
//   const [categoriesError, setCategoriesError] = useState<string | null>(null);
//   const [newItem, setNewItem] = useState({
//     name_en: '',
//     name_th: '',
//     price: 0,
//     category: '',
//   });

//   // Fetch categories from Supabase and update Recoil state
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setCategoriesLoading(true);
//         setCategoriesError(null);
//         const fetchedCategories = await categoryService.getCategories();
//         setCategories(fetchedCategories);
//       } catch (err) {
//         console.error('Failed to fetch categories:', err);
//         setCategoriesError('Failed to load categories');
//         setCategories([]);
//       } finally {
//         setCategoriesLoading(false);
//       }
//     };

//     fetchCategories();
//   }, [setCategories]);

//   const handleSubmit = async () => {
//     if (!newItem.name_en || !newItem.name_th || !newItem.price || !newItem.category) {
//       alert('Please fill all fields including category');
//       return;
//     }

//     // If it's a new category, add it to the list
//     if (isCustomCategory && customCategory.trim()) {
//       try {
//         // Add the new category to Supabase
//         const newCategory = await categoryService.addCategory(customCategory.trim());
//         // Update the Recoil state with the new category
//         setCategories([...categories, newCategory]);
//       } catch (err) {
//         console.error('Failed to add new category:', err);
//         return;
//       }
//     }

//     await addMenuItem({
//       ...newItem,
//       id: Date.now(),
//       name_en: newItem.name_en,
//       name_th: newItem.name_th,
//       price: Number(newItem.price),
//       category: newItem.category,
//     });

//     setOpen(false);
//     setNewItem({ name_en: '', name_th: '', price: 0, category: '' });
//     setCustomCategory('');
//     setIsCustomCategory(false);
//   };

//   if (loading || categoriesLoading) {
//     return (
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <LoadingSpinner />
//       </Container>
//     );
//   }

//   if (error || categoriesError) {
//     return (
//       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//         <Typography color="error">{error || categoriesError}</Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Paper sx={{ p: 2 }}>
//         <div className="flex justify-between items-center mb-4">
//           <Typography variant="h5">Menu Management</Typography>
//           <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
//             Add Menu Item
//           </Button>
//         </div>

//         <Grid container spacing={3}>
//           {items &&
//             items.map((item) => (
//               <Grid item xs={12} sm={6} md={4} key={item.id}>
//                 <Card>
//                   <CardContent>
//                     <Typography variant="h6">{item.name_en}</Typography>
//                     <Typography variant="subtitle1">{item.name_th}</Typography>
//                     <Typography variant="body1" color="text.secondary">
//                       Category: {item.category}
//                     </Typography>
//                     <Typography variant="h6" color="primary">
//                       {formatCurrency(item.price)}
//                     </Typography>
//                     <IconButton color="error" onClick={() => deleteMenuItem(item.id)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//         </Grid>
//       </Paper>

//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Add Menu Item</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 autoFocus
//                 margin="dense"
//                 label="Name (English)"
//                 fullWidth
//                 value={newItem.name_en}
//                 onChange={(e) => setNewItem({ ...newItem, name_en: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 margin="dense"
//                 label="Name (Thai)"
//                 fullWidth
//                 value={newItem.name_th}
//                 onChange={(e) => setNewItem({ ...newItem, name_th: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 margin="dense"
//                 label="Price (THB)"
//                 type="number"
//                 fullWidth
//                 value={newItem.price}
//                 onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth margin="dense">
//                 <InputLabel>Category</InputLabel>
//                 {categoriesLoading ? (
//                   <Box display="flex" justifyContent="center" p={2}>
//                     <CircularProgress size={24} />
//                   </Box>
//                 ) : categoriesError ? (
//                   <Typography color="error">{categoriesError}</Typography>
//                 ) : (
//                   <Select
//                     value={isCustomCategory ? 'new' : newItem.category}
//                     onChange={(e) => {
//                       if (e.target.value === 'new') {
//                         setIsCustomCategory(true);
//                         setCustomCategory('');
//                       } else {
//                         setNewItem({ ...newItem, category: e.target.value });
//                         setIsCustomCategory(false);
//                       }
//                     }}
//                     label="Category"
//                   >
//                     {categories.map((category) => (
//                       <MuiMenuItem key={category.id} value={category.name}>
//                         {category.name}
//                       </MuiMenuItem>
//                     ))}
//                     <MuiMenuItem value="new">➕ Add a new category</MuiMenuItem>
//                   </Select>
//                 )}
//               </FormControl>
//             </Grid>
//             {isCustomCategory && (
//               <Grid item xs={12}>
//                 <TextField
//                   margin="dense"
//                   label="Enter New Category"
//                   fullWidth
//                   value={customCategory}
//                   onChange={(e) => {
//                     setCustomCategory(e.target.value);
//                     setNewItem((prev) => ({ ...prev, category: e.target.value.trim() }));
//                   }}
//                 />
//               </Grid>
//             )}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button onClick={handleSubmit} variant="contained" color="primary">
//             Add Item
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };


import React, { useEffect, useState } from 'react';
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
  Select,
  MenuItem as MuiMenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  IconButton,
  Box,
  CircularProgress,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useMenu } from '../hooks/useMenu';
import { formatCurrency } from '../utils/date/dateHelpers';
import LoadingSpinner from './common/LoadingSpinner';
import { categoryService } from '../services/category/categoryService';
import { useRecoilState } from 'recoil';
import { categoryAtom } from '../atoms/categoryatom';

export const MenuManagement: React.FC = () => {
  const { items, loading, error, addMenuItem, deleteMenuItem } = useMenu();
  const [categories, setCategories] = useRecoilState(categoryAtom);
  const [open, setOpen] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({
    name_en: '',
    name_th: '',
    price: 0,
    category: '',
  });

  // Fetch categories from Supabase and update Recoil state
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        setCategoriesError(null);
        const fetchedCategories = await categoryService.getCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setCategoriesError('Failed to load categories');
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, [setCategories]);

  const handleSubmit = async () => {
    if (!newItem.name_en || !newItem.name_th || !newItem.price || !newItem.category) {
      alert('Please fill all fields including category');
      return;
    }

    await addMenuItem({
      ...newItem,
      id: Date.now(),
      name_en: newItem.name_en,
      name_th: newItem.name_th,
      price: Number(newItem.price),
      category: newItem.category,
    });

    setOpen(false);
    setNewItem({ name_en: '', name_th: '', price: 0, category: '' });
  };

  if (loading || categoriesLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <LoadingSpinner />
      </Container>
    );
  }

  if (error || categoriesError) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography color="error">{error || categoriesError}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2 }}>
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5">Menu Management</Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
            Add Menu Item
          </Button>
        </div>

        <Grid container spacing={3}>
          {items &&
            items.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{item.name_en}</Typography>
                    <Typography variant="subtitle1">{item.name_th}</Typography>
                    <Typography variant="body1" color="text.secondary">
                      Category: {item.category}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {formatCurrency(item.price)}
                    </Typography>
                    <IconButton color="error" onClick={() => deleteMenuItem(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Add Menu Item</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Name (English)"
                fullWidth
                value={newItem.name_en}
                onChange={(e) => setNewItem({ ...newItem, name_en: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Name (Thai)"
                fullWidth
                value={newItem.name_th}
                onChange={(e) => setNewItem({ ...newItem, name_th: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Price (THB)"
                type="number"
                fullWidth
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Category</InputLabel>
                {categoriesLoading ? (
                  <Box display="flex" justifyContent="center" p={2}>
                    <CircularProgress size={24} />
                  </Box>
                ) : categoriesError ? (
                  <Typography color="error">{categoriesError}</Typography>
                ) : (
                  <Select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    label="Category"
                  >
                    {categories.map((category) => (
                      <MuiMenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MuiMenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};