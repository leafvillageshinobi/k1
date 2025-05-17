import { orderService } from '../../services/order/orderService';
import { format } from 'date-fns';
import { Order } from '../../types';

export const exportOrders = async (date: Date, orders: Order[]) => {
  try {
    // Check if orders are fetched correctly
    console.log('Fetched orders for export:', orders); // Debugging line

    if (orders.length === 0) {
      throw new Error('No orders found for the selected month');
    }

    // Prepare CSV data with additional columns
    const csvRows = [
      ['Order ID', 'Date', 'Status', 'Room No', 'Payment Mode', 'Items', 'Total'],
      ...orders.map(order => [
        order.id,
        format(new Date(order.timestamp), 'yyyy-MM-dd HH:mm:ss'),
        order.status,
        order.room_no || 'N/A', // Assuming room_no might be optional
        order.payment_mode || 'N/A', // Assuming payment_mode might be optional
        order.items.map(item => `${item.name_en} (${item.name_th}) x${item.quantity}`).join('; '),
        order.total
      ])
    ];

    // Convert to CSV string
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `orders_${format(date, 'yyyy-MM')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error('Error exporting orders:', error);
    throw new Error('Failed to export orders');
  }
};