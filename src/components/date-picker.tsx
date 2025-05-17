"use client"

import { useState } from "react"
import { Box, Button, Typography, Paper, Grid, IconButton, useTheme } from "@mui/material"
import { ChevronLeft, ChevronRight, ExpandLess, ExpandMore } from "@mui/icons-material"
import { format } from "date-fns"

type DatePickerProps = {
  initialDate?: Date
  onChange?: (date: Date) => void
  onClose?: () => void
}

type View = "month" | "year" | "decade"

export default function DatePicker({ initialDate = new Date(), onChange, onClose }: DatePickerProps) {
  const [currentDate, setCurrentDate] = useState(initialDate)
  const [selectedDate, setSelectedDate] = useState(initialDate)
  const [view, setView] = useState<View>("month")
  const theme = useTheme()

  // Get the decade range (e.g., 2020-2029)
  const getDecadeRange = (date: Date) => {
    const year = date.getFullYear()
    const decadeStart = Math.floor(year / 10) * 10
    return `${decadeStart} - ${decadeStart + 9}`
  }

  // Get the current view title
  const getViewTitle = () => {
    switch (view) {
      case "month":
        return format(currentDate, "MMMM yyyy")
      case "year":
        return currentDate.getFullYear().toString()
      case "decade":
        return getDecadeRange(currentDate)
    }
  }

  // Navigate to previous period
  const navigatePrev = () => {
    const newDate = new Date(currentDate)
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else if (view === "year") {
      newDate.setFullYear(newDate.getFullYear() - 1)
    } else {
      newDate.setFullYear(newDate.getFullYear() - 10)
    }
    setCurrentDate(newDate)
  }

  // Navigate to next period
  const navigateNext = () => {
    const newDate = new Date(currentDate)
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else if (view === "year") {
      newDate.setFullYear(newDate.getFullYear() + 1)
    } else {
      newDate.setFullYear(newDate.getFullYear() + 10)
    }
    setCurrentDate(newDate)
  }

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setCurrentDate(date)
    if (onChange) onChange(date)
  }

  // Toggle between views
  const toggleView = () => {
    if (view === "month") setView("year")
    else if (view === "year") setView("decade")
    else setView("month")
  }

  // Generate days for month view
  const generateMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)

    const daysInMonth = lastDayOfMonth.getDate()
    const startingDayOfWeek = firstDayOfMonth.getDay()

    // Get days from previous month to fill the first row
    const prevMonthDays = []
    const prevMonth = new Date(year, month, 0)
    const daysInPrevMonth = prevMonth.getDate()

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      const date = new Date(year, month - 1, day)
      prevMonthDays.push({ day, date, isCurrentMonth: false })
    }

    // Current month days
    const currentMonthDays = []
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      currentMonthDays.push({ day: i, date, isCurrentMonth: true })
    }

    // Next month days to fill the last row
    const nextMonthDays = []
    const totalDaysDisplayed = prevMonthDays.length + currentMonthDays.length
    const remainingCells = 42 - totalDaysDisplayed // 6 rows x 7 days

    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i)
      nextMonthDays.push({ day: i, date, isCurrentMonth: false })
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  }

  // Generate months for year view
  const generateMonths = () => {
    const months = []
    const year = currentDate.getFullYear()

    for (let i = 0; i < 12; i++) {
      const date = new Date(year, i, 1)
      months.push({
        name: format(date, "MMM"),
        date,
      })
    }

    return months
  }

  // Generate years for decade view
  const generateDecadeYears = () => {
    const years = []
    const year = currentDate.getFullYear()
    const decadeStart = Math.floor(year / 10) * 10

    // Previous decade year
    years.push({
      year: decadeStart - 1,
      date: new Date(decadeStart - 1, 0, 1),
      isCurrentDecade: false,
    })

    // Current decade years
    for (let i = 0; i < 10; i++) {
      const yearValue = decadeStart + i
      years.push({
        year: yearValue,
        date: new Date(yearValue, 0, 1),
        isCurrentDecade: true,
      })
    }

    // Next decade years
    years.push({
      year: decadeStart + 10,
      date: new Date(decadeStart + 10, 0, 1),
      isCurrentDecade: false,
    })

    // Fill to make a 4x3 grid
    while (years.length < 12) {
      const yearValue: number = decadeStart + years.length - 1
      years.push({
        year: yearValue,
        date: new Date(yearValue, 0, 1),
        isCurrentDecade: false,
      })
    }

    return years
  }

  // Check if a date is selected
  const isSelected = (date: Date) => {
    if (view === "month") {
      return (
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      )
    } else if (view === "year") {
      return date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear()
    } else {
      return date.getFullYear() === selectedDate.getFullYear()
    }
  }

  // Render the appropriate view
  const renderView = () => {
    if (view === "month") {
      const days = generateMonthDays()

      return (
        <Grid container spacing={0}>
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
            <Grid item xs={12 / 7} key={index}>
              <Box sx={{ textAlign: "center", py: 1, fontWeight: "medium" }}>
                <Typography variant="body2">{day}</Typography>
              </Box>
            </Grid>
          ))}

          {days.map((day, index) => (
            <Grid item xs={12 / 7} key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 0.5,
                }}
              >
                <Button
                  variant={isSelected(day.date) ? "contained" : "text"}
                  color="primary"
                  sx={{
                    minWidth: 36,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    p: 0,
                    color: !day.isCurrentMonth ? "text.disabled" : isSelected(day.date) ? "white" : "text.primary",
                  }}
                  onClick={() => handleDateSelect(day.date)}
                >
                  {day.day}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )
    } else if (view === "year") {
      const months = generateMonths()

      return (
        <Grid container spacing={2} sx={{ p: 1 }}>
          {months.map((month, index) => (
            <Grid item xs={3} key={index}>
              <Button
                variant={isSelected(month.date) ? "contained" : "text"}
                color="primary"
                fullWidth
                sx={{
                  borderRadius: "50%",
                  height: 40,
                  width: 40,
                  minWidth: 40,
                  mx: "auto",
                  display: "flex",
                }}
                onClick={() => {
                  handleDateSelect(month.date)
                  setView("month")
                }}
              >
                {month.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      )
    } else {
      const years = generateDecadeYears()

      return (
        <Grid container spacing={2} sx={{ p: 1 }}>
          {years.map((year, index) => (
            <Grid item xs={3} key={index}>
              <Button
                variant={isSelected(year.date) ? "contained" : "text"}
                color="primary"
                fullWidth
                sx={{
                  borderRadius: "50%",
                  height: 40,
                  width: 40,
                  minWidth: 40,
                  mx: "auto",
                  display: "flex",
                  color: !year.isCurrentDecade ? "text.disabled" : isSelected(year.date) ? "white" : "text.primary",
                }}
                onClick={() => {
                  handleDateSelect(year.date)
                  setView("year")
                }}
              >
                {year.year}
              </Button>
            </Grid>
          ))}
        </Grid>
      )
    }
  }

  return (
    <Paper elevation={3} sx={{ width: "100%", maxWidth: 360 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <IconButton size="small" onClick={navigatePrev}>
          <ChevronLeft />
        </IconButton>

        <Button
          onClick={toggleView}
          endIcon={view === "decade" ? <ExpandLess /> : <ExpandMore />}
          sx={{ fontWeight: "medium" }}
        >
          {getViewTitle()}
        </Button>

        <IconButton size="small" onClick={navigateNext}>
          <ChevronRight />
        </IconButton>
      </Box>

      <Box sx={{ p: 2 }}>{renderView()}</Box>

      <Box sx={{ p: 2, borderTop: 1, borderColor: "divider", display: "flex", justifyContent: "space-between" }}>
        <Typography variant="body1" fontWeight="medium">
          {view === "month" ? "Month View" : view === "year" ? "Year View" : "Decade View"}
        </Typography>

        {onClose && (
          <Button size="small" onClick={onClose}>
            Close
          </Button>
        )}
      </Box>
    </Paper>
  )
}
