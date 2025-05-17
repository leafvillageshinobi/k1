import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  Snackbar,
} from '@mui/material';
import { Check, AccessTime, FileDownload } from '@mui/icons-material';
import { formatDate, formatCurrency } from '../utils/date/dateHelpers';
import { usePendingOrders } from '../hooks/usePendingOrders';
import { exportOrders } from '../utils/export/orderExport';
import { format } from 'date-fns';
import { useAuth } from '../hooks/useAuth';
import { useRecoilValue } from 'recoil';
import { hotelAtomName } from '../atoms/atom';
import { Order } from '../types';

export const OrderReceiver: React.FC = () => {
  const hotelId = useRecoilValue(hotelAtomName);
  const { user } = useAuth();

  // Destructure the refetch function from usePendingOrders
  const { orders, loading, error, markAsCompleted, refetch } = usePendingOrders(hotelId);

  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Update filtered orders when orders or month changes
  useEffect(() => {
    const [year, month] = selectedMonth.split('-');
    const filtered = orders.filter(order => {
      const orderDate = new Date(order.timestamp);
      return orderDate.getFullYear() === parseInt(year) && 
             orderDate.getMonth() === parseInt(month) - 1;
    });
    setFilteredOrders(filtered);
  }, [orders, selectedMonth]);

  const handleMarkAsCompleted = async (orderId: string) => {
    try {
      await markAsCompleted(orderId);
      setSuccessMessage('Order marked as completed');
      // Refetch orders after marking as completed
      await refetch();
    } catch (err) {
      console.error('Error completing order:', err);
    }
  };

  const handleExport = async () => {
    try {
      const [year, month] = selectedMonth.split('-');
      await exportOrders(new Date(parseInt(year), parseInt(month) - 1), filteredOrders);
      setSuccessMessage('Orders exported successfully');
    } catch (err) {
      console.error('Error exporting orders:', err);
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading orders...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Success Snackbar positioned at top center */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccessMessage(null)} sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5">Pending Orders</Typography>
        <div className="flex gap-4 items-center">
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              label="Month"
            >
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date(2025, i, 1);
                return (
                  <MenuItem key={i} value={format(date, 'yyyy-MM')}>
                    {format(date, 'MMMM yyyy')}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<FileDownload />}
            onClick={handleExport}
          >
            Export Orders
          </Button>
        </div>
      </div>

      <Grid container spacing={3}>
        {filteredOrders.length === 0 ? (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography align="center" color="textSecondary">
                  No pending orders
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          filteredOrders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <Card>
                <CardContent>
                  <div className="flex justify-between items-center mb-3">
                    <Typography variant="h6">
                      Order #{order.id.slice(-4)}
                    </Typography>
                    <Chip
                      icon={order.status === 'pending' ? <AccessTime /> : <Check />}
                      label={order.status.toUpperCase()}
                      color={order.status === 'pending' ? 'warning' : 'success'}
                    />
                  </div>

                  <Typography color="textSecondary" gutterBottom>
                    {formatDate(order.timestamp)}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Room: {order.room_no || 'N/A'}
                  </Typography>

                  <div className="space-y-2 my-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <Typography>
                          {item.name_en} ({item.name_th}) x {item.quantity}
                        </Typography>
                        <Typography>
                          {formatCurrency(item.price * item.quantity)}
                        </Typography>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-2 mt-3">
                    <div className="flex justify-between items-center">
                      <Typography variant="subtitle1">Total:</Typography>
                      <Typography variant="h6">
                        {formatCurrency(order.total)}
                      </Typography>
                    </div>
                  </div>

                  {order.status === 'pending' &&
                    !(user?.role === 'order_taker') && (
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        startIcon={<Check />}
                        onClick={() => handleMarkAsCompleted(order.id)}
                        sx={{ mt: 2 }}
                      >
                        Mark as Completed
                      </Button>
                    )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};