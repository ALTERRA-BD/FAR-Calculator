"use client";

import { ComponentProps } from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldTitle,
} from "../ui/field";
import { Switch } from "../ui/switch";

type FormSwitchProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  label: string;
  description?: string;
  switchProps?: ComponentProps<typeof Switch>;
};

const FormSwitch = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  description,
  switchProps,
}: FormSwitchProps<TFieldValues, TName>) => {
  const id = `form-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <>
          <FieldLabel htmlFor={id}>
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldTitle>{label}</FieldTitle>
                {description && (
                  <FieldDescription>{description}</FieldDescription>
                )}
              </FieldContent>
              <Switch
                {...switchProps}
                id={id}
                checked={field.value}
                onCheckedChange={field.onChange}
                onBlur={field.onBlur}
                disabled={field.disabled}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          </FieldLabel>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </>
      )}
    />
  );
};

export default FormSwitch;
