"use client";

import { Calendar } from "@/components/ui/calendar";
import { use, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useProperty } from "@/utils/store";
import { toast } from "sonner";
import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from "@/utils/calendar";

const BookingCalendar = () => {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const bookings = useProperty((state) => state.bookings);
  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  });

  const unavaibleDates = generateDisabledDates(blockedPeriods);

  useEffect(() => {
    const selectedRange = generateDateRange(range);
    selectedRange.some((date) => {
      if (unavaibleDates[date]) {
        setRange(defaultSelected);
        toast.error("This date is not available. Please select another date.");
        return true;
      }

      return false;
    });
    useProperty.setState({ range });
  }, [range, unavaibleDates]);

  return (
    <Calendar
      mode="range"
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      className="mb-4"
      // add disabled
      disabled={blockedPeriods}
    />
  );
};

export default BookingCalendar;
