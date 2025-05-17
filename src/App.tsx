// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { Layout } from './components/Layout';
// import { Login } from './components/Login';
// import { Dashboard } from './components/Dashboard';
// import { OrderSystem } from './components/OrderSystem';
// import { OrderReceiver } from './components/OrderReceiver';
// import { UserManagement } from './components/UserManagement';
// import { MenuManagement } from './components/MenuManagement';
// import { OrderManagement } from './components/OrderManagement';
// import { ProtectedRoute } from './components/ProtectedRoute';
// import { useAuth } from './hooks/useAuth';
// import LoadingSpinner from './components/common/LoadingSpinner';

// function App() {
//   const { user, loading } = useAuth();

//   if (loading) {
//     <LoadingSpinner/>
//   }

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        
//         <Route element={<ProtectedRoute />}>
//           <Route element={<Layout />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/orders" element={<OrderSystem />} />
//             <Route path="/order-receiver" element={
//               <ProtectedRoute allowedRoles={['admin', 'order_receiver']}>
//                 <OrderReceiver />
//               </ProtectedRoute>
//             } />
//             <Route path="/order-management" element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <OrderManagement />
//               </ProtectedRoute>
//             } />
//             <Route path="/users" element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <UserManagement />
//               </ProtectedRoute>
//             } />
//             <Route path="/menu" element={
//               <ProtectedRoute allowedRoles={['admin']}>
//                 <MenuManagement />
//               </ProtectedRoute>
//             } />
//           </Route>
//         </Route>

//         <Route path="/" element={<Navigate to="/dashboard" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// 
"use client"

import { useState } from "react"
import {
  LayoutDashboard,
  FileText,
  Utensils,
  ClipboardList,
  MenuIcon,
  Users,
  Building2,
  FolderTree,
  Moon,
  Sun,
  LogOut,
  ChevronDown,
  CalendarIcon,
  BarChart3Icon,
  LineChartIcon,
  ArrowUpIcon,
  BellIcon,
  SearchIcon,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"

export default function KitchenDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/40">
        <Sidebar variant="inset" className="border-r">
          <SidebarHeader className="border-b pb-0">
            <div className="flex items-center gap-2 px-2 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500 text-white">
                <Utensils className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">Nexus</span>
                <span className="text-xs text-muted-foreground">Overall</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive tooltip="Dashboard">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Orders">
                  <FileText className="h-4 w-4" />
                  <span>Orders</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Order Receiver">
                  <Utensils className="h-4 w-4" />
                  <span>Order Receiver</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Order Management">
                  <ClipboardList className="h-4 w-4" />
                  <span>Order Management</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Menu Management">
                  <MenuIcon className="h-4 w-4" />
                  <span>Menu Management</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="User Management">
                  <Users className="h-4 w-4" />
                  <span>User Management</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Hotel Management">
                  <Building2 className="h-4 w-4" />
                  <span>Hotel Management</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Category Management">
                  <FolderTree className="h-4 w-4" />
                  <span>Category Management</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t">
            <div className="flex items-center justify-between p-4">
              <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <span className="text-xs text-muted-foreground">v1.0.0</span>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search..." className="w-[200px] pl-8 md:w-[300px] lg:w-[300px]" />
              </div>

              <Button variant="outline" size="icon" className="relative">
                <BellIcon className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  3
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    All Hotels
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Nexus Grand Hotel</DropdownMenuItem>
                  <DropdownMenuItem>Nexus Resort & Spa</DropdownMenuItem>
                  <DropdownMenuItem>Nexus Business Suites</DropdownMenuItem>
                  <DropdownMenuItem>All Hotels</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" className="gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </header>

          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Kitchen order analytics and overview</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  May 2025
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
              <div className="flex justify-between">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                      <div className="h-4 w-4 rounded-full bg-primary/10">
                        <BarChart3Icon className="h-4 w-4 text-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">12</div>
                      <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                      <div className="mt-4 h-1 w-full rounded-full bg-muted">
                        <div className="h-1 w-1/3 rounded-full bg-primary"></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <div className="h-4 w-4 rounded-full bg-emerald-500/10">
                        <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">₱3,700.00</div>
                      <p className="text-xs text-muted-foreground">+18.2% from last month</p>
                      <div className="mt-4 h-1 w-full rounded-full bg-muted">
                        <div className="h-1 w-3/4 rounded-full bg-emerald-500"></div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                      <div className="h-4 w-4 rounded-full bg-amber-500/10">
                        <LineChartIcon className="h-4 w-4 text-amber-500" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">₱308.33</div>
                      <p className="text-xs text-muted-foreground">+4.3% from last month</p>
                      <div className="mt-4 h-1 w-full rounded-full bg-muted">
                        <div className="h-1 w-1/2 rounded-full bg-amber-500"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Orders by Category</CardTitle>
                      <CardDescription>Distribution of orders across food categories</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <OrdersByCategoryChart />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Daily Revenue</CardTitle>
                      <CardDescription>Revenue trends over the past two weeks</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <DailyRevenueChart />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>Latest kitchen orders from all outlets</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <div className="grid grid-cols-5 border-b px-4 py-3 font-medium">
                          <div>Order ID</div>
                          <div>Table</div>
                          <div>Items</div>
                          <div>Amount</div>
                          <div>Status</div>
                        </div>
                        <div className="divide-y">
                          {[
                            { id: "ORD-7352", table: "Table 12", items: 3, amount: "₱450.00", status: "Completed" },
                            { id: "ORD-7351", table: "Table 8", items: 5, amount: "₱780.00", status: "In Progress" },
                            { id: "ORD-7350", table: "Table 15", items: 2, amount: "₱320.00", status: "Pending" },
                            { id: "ORD-7349", table: "Table 4", items: 4, amount: "₱560.00", status: "Completed" },
                            { id: "ORD-7348", table: "Table 10", items: 6, amount: "₱920.00", status: "Completed" },
                          ].map((order) => (
                            <div key={order.id} className="grid grid-cols-5 px-4 py-3 text-sm">
                              <div className="font-medium">{order.id}</div>
                              <div>{order.table}</div>
                              <div>{order.items} items</div>
                              <div>{order.amount}</div>
                              <div>
                                <span
                                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    order.status === "Completed"
                                      ? "bg-green-100 text-green-800"
                                      : order.status === "In Progress"
                                        ? "bg-blue-100 text-blue-800"
                                        : "bg-yellow-100 text-yellow-800"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function OrdersByCategoryChart() {
  return (
    <div className="h-[300px] w-full">
      <div className="flex h-full w-full flex-col">
        <div className="flex flex-1 flex-col justify-end">
          <div className="flex h-full items-end gap-2 pb-6">
            <div className="relative flex h-full w-full max-w-[74px] flex-col justify-end">
              <div className="absolute bottom-0 w-full rounded-md bg-muted pb-[100%]"></div>
              <div className="relative z-10 w-full rounded-t-md bg-primary pb-0"></div>
              <span className="mt-2 w-full text-center text-xs">Appetizers</span>
            </div>
            <div className="relative flex h-full w-full max-w-[74px] flex-col justify-end">
              <div className="absolute bottom-0 w-full rounded-md bg-muted pb-[100%]"></div>
              <div className="relative z-10 w-full rounded-t-md bg-primary pb-[92%]"></div>
              <span className="mt-2 w-full text-center text-xs">Beers</span>
            </div>
            <div className="relative flex h-full w-full max-w-[74px] flex-col justify-end">
              <div className="absolute bottom-0 w-full rounded-md bg-muted pb-[100%]"></div>
              <div className="relative z-10 w-full rounded-t-md bg-primary pb-[5%]"></div>
              <span className="mt-2 w-full text-center text-xs">Beverages</span>
            </div>
            <div className="relative flex h-full w-full max-w-[74px] flex-col justify-end">
              <div className="absolute bottom-0 w-full rounded-md bg-muted pb-[100%]"></div>
              <div className="relative z-10 w-full rounded-t-md bg-primary pb-[28%]"></div>
              <span className="mt-2 w-full text-center text-xs">Main course</span>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary"></div>
              <span className="text-xs text-muted-foreground">Orders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DailyRevenueChart() {
  return (
    <div className="h-[300px] w-full">
      <div className="flex h-full w-full flex-col">
        <div className="flex flex-1 flex-col justify-end">
          <svg className="h-full w-full" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Grid lines */}
            <line x1="0" y1="250" x2="600" y2="250" stroke="#e5e7eb" strokeDasharray="4 4" />
            <line x1="0" y1="200" x2="600" y2="200" stroke="#e5e7eb" strokeDasharray="4 4" />
            <line x1="0" y1="150" x2="600" y2="150" stroke="#e5e7eb" strokeDasharray="4 4" />
            <line x1="0" y1="100" x2="600" y2="100" stroke="#e5e7eb" strokeDasharray="4 4" />
            <line x1="0" y1="50" x2="600" y2="50" stroke="#e5e7eb" strokeDasharray="4 4" />

            {/* Revenue line */}
            <path
              d="M50,150 L150,100 L250,50 L350,150 L450,75 L550,200 L600,200"
              stroke="#10b981"
              strokeWidth="2"
              fill="none"
            />

            {/* Area under the line */}
            <path
              d="M50,150 L150,100 L250,50 L350,150 L450,75 L550,200 L600,200 L600,250 L50,250 Z"
              fill="url(#gradient)"
              opacity="0.2"
            />

            {/* Data points */}
            <circle cx="50" cy="150" r="4" fill="#10b981" />
            <circle cx="150" cy="100" r="4" fill="#10b981" />
            <circle cx="250" cy="50" r="4" fill="#10b981" />
            <circle cx="350" cy="150" r="4" fill="#10b981" />
            <circle cx="450" cy="75" r="4" fill="#10b981" />
            <circle cx="550" cy="200" r="4" fill="#10b981" />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <div>May 3</div>
          <div>May 5</div>
          <div>May 9</div>
          <div>May 14</div>
        </div>
      </div>
    </div>
  )
}
