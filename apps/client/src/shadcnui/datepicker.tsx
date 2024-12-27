'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/shadcnui/utils';
import { FormControl } from './form';
import { Button } from '@/shadcnui/button';
import { Calendar } from '@/shadcnui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcnui/popover';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  disabledDates?: (date: Date) => boolean;
  dateFormat?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder,
  className,
  disabled,
  disabledDates,
  dateFormat,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !value && 'text-muted-foreground',
              className
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
            {value ? (
              format(value, dateFormat ? dateFormat : 'PPP')
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabledDates}
          initialFocus
          weekStartsOn={1}
        />
      </PopoverContent>
    </Popover>
  );
}
