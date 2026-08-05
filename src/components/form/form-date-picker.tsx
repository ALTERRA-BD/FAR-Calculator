"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";

type FormDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: (date: Date) => boolean;
};

const FormDatePicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  description,
  placeholder = "Pick a date",
  disabled,
}: FormDatePickerProps<TFieldValues, TName>) => {
  const id = `form-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
          <Popover>
            <PopoverTrigger
             className='shadow'
              render={
                <Button
                  id={id}
                  type="button"
                  variant="outline"
                  aria-invalid={fieldState.invalid}
                  className={cn(
                    "w-full justify-start font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                  icon={<CalendarIcon />}
                >
                  {field.value ? format(field.value, "PPP") : placeholder}
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={disabled}
                autoFocus
              />
            </PopoverContent>
          </Popover>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormDatePicker;
