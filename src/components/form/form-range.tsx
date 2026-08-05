"use client";

import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Slider } from "../ui/slider";

type FormRangeProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  description?: string;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
};

const FormRange = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  description,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
}: FormRangeProps<TFieldValues, TName>) => {
  const id = `form-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const value: [number, number] = field.value ?? [min, max];

        return (
          <Field data-invalid={fieldState.invalid}>
            {label && (
              <FieldLabel htmlFor={id}>
                {label}
                {showValue && (
                  <span className="ml-auto text-muted-foreground tabular-nums">
                    {value[0]} - {value[1]}
                  </span>
                )}
              </FieldLabel>
            )}
            <Slider
              id={id}
              min={min}
              max={max}
              step={step}
              value={value}
              onValueChange={(next) => field.onChange(next)}
              onBlur={field.onBlur}
              disabled={field.disabled}
              aria-invalid={fieldState.invalid}
            />
            {description && (
              <FieldDescription>{description}</FieldDescription>
            )}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};

export default FormRange;
