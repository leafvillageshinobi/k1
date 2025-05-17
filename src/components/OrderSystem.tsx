// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Container, Grid, Paper, Typography, Snackbar, Alert, TextField } from "@mui/material"
// import type { MenuItem, OrderItem } from "../types"
// import { supabaseStorage } from "../services/storage/supabase"
// import { orderService } from "../services/order/orderService"
// import { useAuth } from "../hooks/useAuth"
// import { MenuGrid } from "./menu/MenuGrid"
// import { OrderList } from "./order/OrderList"
// import { OrderSummary } from "./order/OrderSummary"
// import LoadingSpinner from "./common/LoadingSpinner"
// import { ErrorMessage } from "./common/ErrorMessage"
// import { MenuTabs } from "./menu/MenuTabs"
// import { categoryService } from "../services/category/categoryService"

// export const OrderSystem: React.FC = () => {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([])
//   const [orderItems, setOrderItems] = useState<OrderItem[]>([])
//   const [roomNumber, setRoomNumber] = useState<string>("")
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [submitting, setSubmitting] = useState(false)
//   const [successMessage, setSuccessMessage] = useState<string | null>(null)
//   const { user } = useAuth()
//   const [categories, setCategories] = useState<string[]>([])
//   const [activeCategory, setActiveCategory] = useState<string>("")

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         const items = await supabaseStorage.menu.getItems()
//         setMenuItems(items)

//         const fetchedCategories = await categoryService.getCategories();

//         // Extract unique categories from menu items
//         const uniqueCategories = Array.from(new Set(fetchedCategories.map((item) => item.name || "Uncategorized")))
//         setCategories(uniqueCategories)

//         // Set the first category as active by default
//         if (uniqueCategories.length > 0) {
//           setActiveCategory(uniqueCategories[0])
//         }
//       } catch (err) {
//         setError("Failed to load menu items")
//         console.error(err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchMenuItems()
//   }, [])

//   const handleAddItem = (item: MenuItem) => {
//     setOrderItems((prev) => {
//       const existing = prev.find((i) => i.id === item.id)
//       if (existing) {
//         return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
//       }
//       return [...prev, { ...item, quantity: 1 }]
//     })
//   }

//   const handleUpdateQuantity = (id: number, quantity: number) => {
//     if (quantity < 1) return
//     setOrderItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
//   }

//   const handleRemoveItem = (id: number) => {
//     setOrderItems((prev) => prev.filter((item) => item.id !== id))
//   }

//   const calculateTotal = () => {
//     return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
//   }

//   const handleSubmitOrder = async () => {
//     if (!user || orderItems.length === 0 || submitting || !roomNumber) {
//       setError("Please ensure all fields are filled, including room number.")
//       return
//     }

//     setSubmitting(true)
//     setError(null)

//     try {
//       const order = {
//         id: crypto.randomUUID(),
//         items: orderItems,
//         total: calculateTotal(),
//         timestamp: new Date().toISOString(),
//         status: "pending" as const,
//         userId: user.user_id,
//         hotel: user.hotel,
//         room_no: roomNumber,
//       }

//       await orderService.submitOrder(order)
//       setOrderItems([])
//       setRoomNumber("")
//       setSuccessMessage("Order submitted successfully!")
//     } catch (err: any) {
//       setError(err.message || "Failed to submit order")
//       console.error("Order submission error:", err)
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   if (loading) return <LoadingSpinner />

//   // Filter menu items based on the selected category
//   const filteredMenuItems = activeCategory ? menuItems.filter((item) => item.category === activeCategory) : menuItems

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       {error && <ErrorMessage message={error} />}

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Menu Items
//             </Typography>

//             {/* Category Tabs */}
//             <MenuTabs categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

//             {/* Menu Grid with filtered items */}
//             <MenuGrid items={filteredMenuItems} onSelectItem={handleAddItem} />
//           </Paper>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Paper sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Current Order
//             </Typography>

//             {/* Room Number Input */}
//             <TextField
//               label="Room Number"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={roomNumber}
//               onChange={(e) => setRoomNumber(e.target.value)}
//               required
//             />

//             <OrderList items={orderItems} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemoveItem} />
//             <OrderSummary items={orderItems} onSubmit={handleSubmitOrder} submitting={submitting} />
//           </Paper>
//         </Grid>
//       </Grid>

//       <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={() => setSuccessMessage(null)}>
//         <Alert severity="success" onClose={() => setSuccessMessage(null)}>
//           {successMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   )
// }

"use client"


import type React from "react"
import { useState, useEffect } from "react"
import {
  Container,
  Grid,
  Paper,
  Typography,
  Snackbar,
  Alert,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material"
import type { MenuItem, OrderItem } from "../types"
import { supabaseStorage } from "../services/storage/supabase"
import { orderService } from "../services/order/orderService"
import { useAuth } from "../hooks/useAuth"
import { MenuGrid } from "./menu/MenuGrid"
import { OrderList } from "./order/OrderList"
import { OrderSummary } from "./order/OrderSummary"
import LoadingSpinner from "./common/LoadingSpinner"
import { ErrorMessage } from "./common/ErrorMessage"
import { MenuTabs } from "./menu/MenuTabs"
import { categoryService } from "../services/category/categoryService"

export const OrderSystem: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [roomNumber, setRoomNumber] = useState<string>("")
  const [paymentMode, setPaymentMode] = useState<string>("cash")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const { user } = useAuth()
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("")

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await supabaseStorage.menu.getItems()
        setMenuItems(items)

        const fetchedCategories = await categoryService.getCategories()
        const uniqueCategories = Array.from(new Set(fetchedCategories.map((item) => item.name || "Uncategorized")))
        setCategories(uniqueCategories)

        if (uniqueCategories.length > 0) {
          setActiveCategory(uniqueCategories[0])
        }
      } catch (err) {
        setError("Failed to load menu items")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  const handleAddItem = (item: MenuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return
    setOrderItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const handleRemoveItem = (id: number) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  const handlePaymentModeChange = (event: React.MouseEvent<HTMLElement>, newPaymentMode: string) => {
    if (newPaymentMode !== null) {
      setPaymentMode(newPaymentMode)
    }
  }

  const handleSubmitOrder = async () => {
    if (!user || orderItems.length === 0 || submitting || !roomNumber || !paymentMode) {
      setError("Please ensure all fields are filled, including room number and payment mode.")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const order = {
        id: crypto.randomUUID(),
        items: orderItems,
        total: calculateTotal(),
        timestamp: new Date().toISOString(),
        status: "pending" as const,
        userId: user.user_id,
        hotel: user.hotel,
        room_no: roomNumber,
        payment_mode: paymentMode,
      }

      await orderService.submitOrder(order)
      setOrderItems([])
      setRoomNumber("")
      setPaymentMode("cash")
      setSuccessMessage("Order submitted successfully!")
    } catch (err: any) {
      setError(err.message || "Failed to submit order")
      console.error("Order submission error:", err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <LoadingSpinner />

  const filteredMenuItems = activeCategory ? menuItems.filter((item) => item.category === activeCategory) : menuItems

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Success Snackbar positioned at top center */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 6 }}
      >
        <Alert severity="success" onClose={() => setSuccessMessage(null)} sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {error && <ErrorMessage message={error} />}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Menu Items
            </Typography>

            <MenuTabs categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

            <MenuGrid items={filteredMenuItems} onSelectItem={handleAddItem} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Current Order
            </Typography>

            <TextField
              label="Room Number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
            />

            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
              Payment Mode
            </Typography>
            <ToggleButtonGroup
              value={paymentMode}
              exclusive
              onChange={handlePaymentModeChange}
              aria-label="payment mode"
              fullWidth
              sx={{ mb: 2 }}
              color="primary"
            >
              <ToggleButton
                value="cash"
                aria-label="cash payment"
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  },
                }}
              >
                Cash
              </ToggleButton>
              <ToggleButton
                value="card"
                aria-label="card payment"
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  },
                }}
              >
                Online/Card
              </ToggleButton>
            </ToggleButtonGroup>

            <OrderList items={orderItems} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemoveItem} />
            <OrderSummary items={orderItems} onSubmit={handleSubmitOrder} submitting={submitting} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

