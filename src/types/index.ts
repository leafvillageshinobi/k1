export interface MenuItem {
  id: number;
  name_en: string;
  name_th: string;
  price: number;
  category: string;
}

export interface OrderItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  timestamp: string;
  status: 'pending' | 'completed';
  userId: string;
  hotel:string;
  room_no:string;
  payment_mode:string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'order_taker' | 'order_receiver';
  name: string;
  created_at: string;
  user_id:string;
  hotel:string;
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByCategory: { category: string; count: number }[];
  revenueByDay: { date: string; revenue: number }[];
}
export interface OrderReceiverProps {
  role: string; // Role is a string value
}
export interface Hotel{
  id:string,
  created_at:string,
  hotel_name:string
}
// In your types file
export interface Category {
  id: string;
  name: string;
  created_at: string;
}
export interface CategoryInput {
  id?: string;
  name: string;
  created_at?: string;
}
export interface HotelProps {
  hotelName: string;
}