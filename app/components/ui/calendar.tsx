"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { th } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/app/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  locale = th,
  ...props
}: CalendarProps) {
  const weekdayLabels = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={locale}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col space-y-2",
        month: "space-y-4",
        caption: "flex justify-center relative items-center px-2",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.7rem] flex justify-center items-center",
        row: "flex w-full mt-1 justify-center",
        cell: "h-8 w-8 p-0 text-center relative flex items-center justify-center [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 p-0 font-normal text-xs aria-selected:opacity-100 rounded-full"
        ),
        day_range_end: "day-range-end rounded-full",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
        day_today: "bg-accent text-accent-foreground rounded-full border border-primary",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-3 w-3" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-3 w-3" />,
      }}
      formatters={{
        formatWeekday: (date) => {
          const day = date.getDay();
          return weekdayLabels[day];
        }
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar } 