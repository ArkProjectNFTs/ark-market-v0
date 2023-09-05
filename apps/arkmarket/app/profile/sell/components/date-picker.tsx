"use client";

import * as React from "react";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import dayjs from "dayjs";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

interface DatePickerProps {
  orderData: {
    price: string;
    endDate: number;
  };
  setOrderData: (data: { price: string; endDate: number }) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ setOrderData, orderData }) => {
  const date = dayjs.unix(orderData.endDate).toDate();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setOrderData({
              price: orderData.price,
              endDate: dayjs(date).unix()
            });
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
