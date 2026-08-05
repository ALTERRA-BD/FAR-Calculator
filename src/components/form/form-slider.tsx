"use client";

import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Slider } from "../ui/slider";

type FormSliderProps<
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

const FormSlider = <
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
}: FormSliderProps<TFieldValues, TName>) => {
  const id = `form-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && (
            <FieldLabel htmlFor={id}>
              {label}
              {showValue && (
                <span className="ml-auto text-muted-foreground tabular-nums">
                  {field.value}
                </span>
              )}
            </FieldLabel>
          )}
          <Slider
            id={id}
            min={min}
            max={max}
            step={step}
            value={[field.value ?? min]}
            onValueChange={(next) =>
              field.onChange(Array.isArray(next) ? next[0] : next)
            }
            onBlur={field.onBlur}
            disabled={field.disabled}
            aria-invalid={fieldState.invalid}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormSlider;
