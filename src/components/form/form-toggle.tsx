"use client";

import { ComponentProps, ReactNode } from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Toggle } from "../ui/toggle";
import { cn } from "@/lib/utils";

type FormToggleProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  children: ReactNode;
  toggleProps?: ComponentProps<typeof Toggle>;
};

const FormToggle = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  children,
  toggleProps,
}: FormToggleProps<TFieldValues, TName>) => {
  const id = `form-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
          <Toggle
            variant="outline"
            {...toggleProps}
            id={id}
            pressed={field.value}
            onPressedChange={field.onChange}
            onBlur={field.onBlur}
            disabled={field.disabled}
            aria-invalid={fieldState.invalid}
            className={cn(
              "w-fit data-pressed:border-primary data-pressed:bg-primary/10 data-pressed:text-primary",
              toggleProps?.className
            )}
          >
            {children}
          </Toggle>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormToggle;
