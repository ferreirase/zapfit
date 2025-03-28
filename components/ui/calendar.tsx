"use client"

import { ptBR } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"
import * as React from "react"
import { DayPicker, useNavigation } from "react-day-picker"

import { buttonVariants } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  // Definindo os limites de data: de 1º de Janeiro de 1940 até 31 de Dezembro de 2009
  const defaultFromDate = new Date(1940, 0, 1); // 1 de Janeiro de 1940
  const defaultToDate = new Date(2009, 11, 31); // 31 de Dezembro de 2009
  
  // Componente personalizado para a caption do calendário
  const CustomCaption = ({ displayMonth }: { displayMonth: Date }) => {
    const { goToMonth } = useNavigation();
    
    // Inicializar os estados com os valores do mês atual sendo exibido
    const [selectedMonth, setSelectedMonth] = React.useState<string>(displayMonth.getMonth().toString());
    const [selectedYear, setSelectedYear] = React.useState<string>(displayMonth.getFullYear().toString());
    
    // Anos disponíveis para seleção (1940 até 2009)
    const years = Array.from({ length: 2009 - 1940 + 1 }, (_, i) => 1940 + i);
    
    // Nomes dos meses em português
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    // Atualizar data quando mês ou ano mudar
    const updateDate = (month: number | null, year: number | null) => {
      const newDate = new Date(displayMonth);
      
      if (month !== null) {
        newDate.setMonth(month);
        setSelectedMonth(month.toString());
      }
      
      if (year !== null) {
        newDate.setFullYear(year);
        setSelectedYear(year.toString());
      }
      
      goToMonth(newDate);
    };

    React.useEffect(() => {
      setSelectedMonth(displayMonth.getMonth().toString());
      setSelectedYear(displayMonth.getFullYear().toString());
    }, [displayMonth]);

    return (
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Select
            value={selectedMonth}
            onValueChange={(value) => {
              updateDate(parseInt(value), null);
            }}
          >
            <SelectTrigger className="h-8 w-[132px]">
              <SelectValue>{months[parseInt(selectedMonth)]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedYear}
            onValueChange={(value) => {
              updateDate(null, parseInt(value));
            }}
          >
            <SelectTrigger className="h-8 w-[96px]">
              <SelectValue>{selectedYear}</SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-[200px] overflow-y-auto">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center mb-2",
        caption_label: "hidden",
        nav: "space-x-1 flex items-center absolute right-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        Caption: ({ displayMonth }) => <CustomCaption displayMonth={displayMonth} />
      }}
      locale={ptBR}
      fromDate={defaultFromDate}
      toDate={defaultToDate}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }

