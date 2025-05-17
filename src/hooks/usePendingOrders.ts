import { useState, useEffect, useRef } from 'react';
import { Order } from '../types';
import { orderService } from '../services/order/orderService';

export const usePendingOrders = (hotelId: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Main function to fetch orders
  const loadPendingOrders = async () => {
    try {
      setLoading(true);
      const pendingOrders = await orderService.getPendingOrders(hotelId);
      setOrders(pendingOrders);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to load pending orders');
      console.error('Error loading pending orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // Set up polling for real-time updates
  useEffect(() => {
    // Initial load
    loadPendingOrders();

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up new interval (20000ms = 20 seconds)
    intervalRef.current = setInterval(loadPendingOrders, 20000);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [hotelId]);

  // Mark order as completed
  const markAsCompleted = async (orderId: string) => {
    try {
      await orderService.updateOrderStatus(orderId, 'completed');
      // Immediately refresh after status change
      await loadPendingOrders();
    } catch (err: any) {
      setError(err.message || 'Failed to update order status');
      console.error('Error updating order status:', err);
    }
  };

  return {
    orders,
    loading,
    error,
    markAsCompleted,
    refreshOrders: loadPendingOrders
  };
};