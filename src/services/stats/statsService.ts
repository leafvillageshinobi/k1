import { DashboardStats } from '../../types';
import { supabase } from '../../config/supabase';
import { categoryService } from '../category/categoryService';

class StatsService {
  async getStats(startDate: Date, endDate: Date, atomValue: string): Promise<DashboardStats> {
    try {
      // 1. First fetch all categories from the database
      const allCategories = await categoryService.getCategories();
      const categoryNames = allCategories.map(c => c.name).sort();

      // 2. Fetch orders for the selected period and hotel
      const query = supabase
        .from('orders')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString());

      if (atomValue !== 'all') {
        query.eq('hotel', atomValue);
      }

      const { data: orders, error: ordersError } = await query;

      if (ordersError) throw ordersError;

      // 3. Initialize category counts with all categories set to 0
      const categoryCounts = new Map<string, number>();
      categoryNames.forEach(category => {
        categoryCounts.set(category, 0);
      });

      // 4. Calculate stats
      let totalRevenue = 0;
      orders?.forEach(order => {
        // Add to total revenue
        totalRevenue += Number(order.total) || 0;
        
        // Process items
        try {
          const items = Array.isArray(order.items) 
            ? order.items 
            : JSON.parse(order.items);
            
          items.forEach(item => {
            if (item?.category && categoryCounts.has(item.category)) {
              categoryCounts.set(
                item.category, 
                categoryCounts.get(item.category)! + (item.quantity || 1)
              );
            }
          });
        } catch (e) {
          console.error('Error processing order items:', e);
        }
      });

      // 5. Calculate daily revenue
      const dailyRevenue = new Map<string, number>();
      orders?.forEach(order => {
        try {
          const date = new Date(order.timestamp).toISOString().split('T')[0];
          const orderTotal = Number(order.total) || 0;
          dailyRevenue.set(date, (dailyRevenue.get(date) || 0) + orderTotal);
        } catch (e) {
          console.error('Error processing order date:', e);
        }
      });

      const totalOrders = orders?.length || 0;
      const averageOrderValue = totalOrders > 0 
        ? parseFloat((totalRevenue / totalOrders).toFixed(2))
        : 0;

      return {
        totalOrders,
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        averageOrderValue,
        ordersByCategory: Array.from(categoryCounts.entries()).map(([category, count]) => ({
          category,
          count
        })),
        revenueByDay: Array.from(dailyRevenue.entries()).map(([date, revenue]) => ({
          date,
          revenue: parseFloat(revenue.toFixed(2))
        }))
      };

    } catch (error) {
      console.error('Error in statsService.getStats:', error);
      const allCategories = await categoryService.getCategories();
      return {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        ordersByCategory: allCategories.map(c => ({
          category: c.name,
          count: 0
        })),
        revenueByDay: []
      };
    }
  }
}

export const statsService = new StatsService();