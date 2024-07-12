'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { InputProps } from '../input';

export type SearchItem = {
  value: string;
  label: string;
};

const _AutoComplete = (
  {
    options,
    onChange,
    value,
    placeholder,
    noMatches,
    onSearchChange,
    keyComparer = 'value',
  }: {
    options: any;
    onChange: (v: any) => void;
    value: string;
    placeholder: string;
    noMatches: string;
    onSearchChange: (v: any) => void;
    keyComparer?: string;
  },
  ref: any
) => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={isOpen}
          className='w-[200px] justify-between'
        >
          {value
            ? options.find(
                (option: any) =>
                  option[keyComparer].toLowerCase() === value.toLowerCase()
              )?.label
            : placeholder}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            onValueChange={onSearchChange}
          />
          <CommandEmpty>{noMatches}</CommandEmpty>
          <CommandGroup>
            {options.map((framework: any) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  onChange(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === framework.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const AutoComplete = React.forwardRef(_AutoComplete);
