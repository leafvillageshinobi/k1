 // import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
// } from '@mui/material';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from 'recharts';
// import { format } from 'date-fns';
// import { DashboardStats } from '../types';
// import { statsService } from '../services/stats/statsService';
// import LoadingSpinner from './common/LoadingSpinner';
// import { ErrorMessage } from './common/ErrorMessage';
// import { formatCurrency } from '../utils/date/dateHelpers';
// import { useRecoilValue } from 'recoil';
// import { hotelAtomName } from '../atoms/atom';

// export const Dashboard: React.FC = () => {
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
//   const hotelId = useRecoilValue(hotelAtomName);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);
//         const [year, month] = selectedMonth.split('-');
//         const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
//         const endDate = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59); // Full last day

//         const data = await statsService.getStats(startDate, endDate, hotelId);
//         setStats(data);
//         setError(null);
//       } catch (err: any) {
//         setError(err.message || 'Failed to load dashboard statistics');
//         console.error('Error loading stats:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [selectedMonth, hotelId]); // Dependencies ensure re-fetch on change of selectedMonth or hotelId

//   if (loading) return <LoadingSpinner />;
//   if (error) return <ErrorMessage message={error} />;
//   if (!stats) return null;

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           Dashboard
//         </Typography>
//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel>Month</InputLabel>
//           <Select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             label="Month"
//           >
//             {Array.from({ length: 12 }, (_, i) => {
//               const date = new Date(2025, i, 1);
//               return (
//                 <MenuItem key={i} value={format(date, 'yyyy-MM')}>
//                   {format(date, 'MMMM yyyy')}
//                 </MenuItem>
//               );
//             })}
//           </Select>
//         </FormControl>
//       </Box>

//       <Grid container spacing={4}>
//         <Grid item xs={12} md={4}>
//           <Card
//             sx={{
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" color="text.secondary">
//                 Total Orders
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 {stats.totalOrders}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card
//             sx={{
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" color="text.secondary">
//                 Total Revenue
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 {formatCurrency(stats.totalRevenue)}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card
//             sx={{
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" color="text.secondary">
//                 Average Order Value
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 {formatCurrency(stats.averageOrderValue)}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card
//             sx={{
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Orders by Category
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart
//                   data={stats.ordersByCategory}
//                   margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="category" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#1976d2" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card
//             sx={{
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Daily Revenue
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart
//                   data={stats.revenueByDay}
//                   margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };


// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
// } from '@mui/material';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from 'recharts';
// import { format } from 'date-fns';
// import { DashboardStats } from '../types';
// import { statsService } from '../services/stats/statsService';
// import LoadingSpinner from './common/LoadingSpinner';
// import { ErrorMessage } from './common/ErrorMessage';
// import { formatCurrency } from '../utils/date/dateHelpers';
// import { useRecoilValue } from 'recoil';
// import { hotelAtomName } from '../atoms/atom';

// export const Dashboard: React.FC = () => {
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));
//   const hotelId = useRecoilValue(hotelAtomName);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         setLoading(true);
//         const [year, month] = selectedMonth.split('-');
//         const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
//         const endDate = new Date(parseInt(year), parseInt(month), 0, 23, 59, 59); // Full last day

//         const data = await statsService.getStats(startDate, endDate, hotelId);
//         setStats(data);
//         setError(null);
//       } catch (err: any) {
//         setError(err.message || 'Failed to load dashboard statistics');
//         console.error('Error loading stats:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [selectedMonth, hotelId]); // Dependencies ensure re-fetch on change of selectedMonth or hotelId

//   if (loading) return <LoadingSpinner />;
//   if (error) return <ErrorMessage message={error} />;
//   if (!stats) return null;

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
//         <Typography variant="h4" fontWeight="bold" gutterBottom>
//           Dashboard
//         </Typography>
//         <FormControl sx={{ minWidth: 200 }}>
//           <InputLabel>Month</InputLabel>
//           <Select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             label="Month"
//           >
//             {Array.from({ length: 12 }, (_, i) => {
//               const date = new Date(2025, i, 1);
//               return (
//                 <MenuItem key={i} value={format(date, 'yyyy-MM')}>
//                   {format(date, 'MMMM yyyy')}
//                 </MenuItem>
//               );
//             })}
//           </Select>
//         </FormControl>
//       </Box>

//       <Grid container spacing={4}>
//         <Grid item xs={12} md={4}>
//           <Card
//             sx={{
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" color="text.secondary">
//                 Total Orders
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 {stats.totalOrders}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card
//             sx={{
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" color="text.secondary">
//                 Total Revenue
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 {formatCurrency(stats.totalRevenue)}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Card
//             sx={{
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" color="text.secondary">
//                 Average Order Value
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 {formatCurrency(stats.averageOrderValue)}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card
//             sx={{
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Orders by Category
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart
//                   data={stats.ordersByCategory}
//                   margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="category" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="count" fill="#1976d2" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card
//             sx={{
//               boxShadow: 3,
//               transition: 'transform 0.2s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//               },
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Daily Revenue
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart
//                   data={stats.revenueByDay}
//                   margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };
/* "use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Popover,
  IconButton,
} from "@mui/material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { format } from "date-fns"
import type { DashboardStats } from "../types"
import { statsService } from "../services/stats/statsService"
import LoadingSpinner from "./common/LoadingSpinner"
import { ErrorMessage } from "./common/ErrorMessage"
import { formatCurrency } from "../utils/date/dateHelpers"
import { useRecoilValue } from "recoil"
import { hotelAtomName } from "../atoms/atom"
import DatePicker from "./date-picker"
import { CalendarMonth } from "@mui/icons-material"

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), "yyyy-MM"))
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [calendarAnchorEl, setCalendarAnchorEl] = useState<HTMLButtonElement | null>(null)
  const hotelId = useRecoilValue(hotelAtomName)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        setError(null)

        const [year, month] = selectedMonth.split("-")
        const startDate = new Date(Number.parseInt(year), Number.parseInt(month) - 1, 1)
        const endDate = new Date(Number.parseInt(year), Number.parseInt(month), 0, 23, 59, 59)

        const data = await statsService.getStats(startDate, endDate, hotelId)
        setStats(data)
      } catch (err) {
        console.error("Error loading stats:", err)
        setError(err instanceof Error ? err.message : "Failed to load dashboard statistics")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [selectedMonth, hotelId])

  const handleCalendarOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCalendarAnchorEl(event.currentTarget)
  }

  const handleCalendarClose = () => {
    setCalendarAnchorEl(null)
  }

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    setSelectedMonth(format(date, "yyyy-MM"))
    handleCalendarClose()
  }

  const calendarOpen = Boolean(calendarAnchorEl)
  const calendarId = calendarOpen ? "date-picker-popover" : undefined

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!stats) return <ErrorMessage message="No data available" />

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          {/* <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Month</InputLabel>
            <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} label="Month">
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date()
                date.setMonth(i)
                return (
                  <MenuItem key={i} value={format(date, "yyyy-MM")}>
                    {format(date, "MMMM yyyy")}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl> }

          <IconButton color="primary" onClick={handleCalendarOpen} aria-describedby={calendarId}>
            <CalendarMonth />
          </IconButton>

          <Popover
            id={calendarId}
            open={calendarOpen}
            anchorEl={calendarAnchorEl}
            onClose={handleCalendarClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <DatePicker initialDate={selectedDate} onChange={handleDateChange} onClose={handleCalendarClose} />
          </Popover>
        </Box>
      </Box> */

//       <Grid container spacing={4}>
//         {/* Stats Cards */}
//         <Grid item xs={12} md={4}>
//           <Card sx={{ height: "100%" }}>
//             <CardContent>
//               <Typography variant="h6" color="text.secondary">
//                 Total Orders
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 {stats.totalOrders}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card sx={{ height: "100%" }}>
//             <CardContent>
//               <Typography variant="h6" color="text.secondary">
//                 Total Revenue
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 {formatCurrency(stats.totalRevenue)}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card sx={{ height: "100%" }}>
//             <CardContent>
//               <Typography variant="h6" color="text.secondary">
//                 Average Order Value
//               </Typography>
//               <Typography variant="h4" fontWeight="bold">
//                 {isNaN(stats.averageOrderValue) ? formatCurrency(0) : formatCurrency(stats.averageOrderValue)}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Orders by Category Chart */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ height: "100%" }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Orders by Category
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={stats.ordersByCategory} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="category" />
//                   <YAxis />
//                   <RechartsTooltip />
//                   <Bar dataKey="count" fill="#1976d2" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Daily Revenue Chart */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ height: "100%" }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Daily Revenue
//               </Typography>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={stats.revenueByDay} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <RechartsTooltip />
//                   <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Container>
//   )
// }
 "use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { useRecoilValue } from "recoil"
import { CalendarIcon, BarChart3Icon, LineChartIcon, ArrowUpIcon, ChevronDownIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { hotelAtomName } from "../atoms/atom"
import { statsService } from "../services/stats/statsService"
import { formatCurrency } from "../utils/date/dateHelpers"
import LoadingSpinner from "../components/common/LoadingSpinner"
import { ErrorMessage } from "../components/common/ErrorMessage"
import DatePicker from "../components/date-picker"
import type { DashboardStats } from "../types"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Area,
  AreaChart,
} from "recharts"

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), "yyyy-MM"))
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const hotelId = useRecoilValue(hotelAtomName)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        setError(null)

        const [year, month] = selectedMonth.split("-")
        const startDate = new Date(Number.parseInt(year), Number.parseInt(month) - 1, 1)
        const endDate = new Date(Number.parseInt(year), Number.parseInt(month), 0, 23, 59, 59)

        const data = await statsService.getStats(startDate, endDate, hotelId)
        setStats(data)
      } catch (err) {
        console.error("Error loading stats:", err)
        setError(err instanceof Error ? err.message : "Failed to load dashboard statistics")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [selectedMonth, hotelId])

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
    setSelectedMonth(format(date, "yyyy-MM"))
    setDatePickerOpen(false)
  }

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!stats) return <ErrorMessage message="No data available" />

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">{format(selectedDate, "MMMM yyyy")} analytics overview</p>
          </div>
          <div className="flex items-center gap-2">
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {format(selectedDate, "MMMM yyyy")}
                  <ChevronDownIcon className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <DatePicker
                  initialDate={selectedDate}
                  onChange={handleDateChange}
                  onClose={() => setDatePickerOpen(false)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
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
                  <div className="text-4xl font-bold">{stats.totalOrders}</div>
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
                  <div className="text-4xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
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
                  <div className="text-4xl font-bold">
                    {isNaN(stats.averageOrderValue) ? formatCurrency(0) : formatCurrency(stats.averageOrderValue)}
                  </div>
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
                  <CardDescription>Distribution of orders across product categories</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stats.ordersByCategory} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="category"
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={{ stroke: "#e5e7eb" }}
                        />
                        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "6px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Daily Revenue</CardTitle>
                  <CardDescription>Revenue trends over the past month</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats.revenueByDay} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="date"
                          tick={{ fontSize: 12 }}
                          tickLine={false}
                          axisLine={{ stroke: "#e5e7eb" }}
                        />
                        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e5e7eb",
                            borderRadius: "6px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                          formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                        />
                        <Area
                          type="monotone"
                          dataKey="revenue"
                          stroke="#10b981"
                          fillOpacity={1}
                          fill="url(#colorRevenue)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
