"use client";

import { ReactNode } from "react";
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type FormRadioOption = {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

type FormRadioGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  description?: string;
  options: FormRadioOption[];
};

const FormRadioGroup = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  description,
  options,
}: FormRadioGroupProps<TFieldValues, TName>) => {
  const groupId = `form-${name}`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={groupId}>{label}</FieldLabel>}
          {description && <FieldDescription>{description}</FieldDescription>}
          <RadioGroup
            id={groupId}
            value={field.value}
            onValueChange={field.onChange}
            disabled={field.disabled}
          >
            {options.map((option) => {
              const optionId = `${groupId}-${option.value}`;
              return (
                <FieldLabel key={option.value} htmlFor={optionId}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>{option.label}</FieldTitle>
                      {option.description && (
                        <FieldDescription>
                          {option.description}
                        </FieldDescription>
                      )}
                    </FieldContent>
                    <RadioGroupItem
                      id={optionId}
                      value={option.value}
                      disabled={option.disabled}
                      aria-invalid={fieldState.invalid}
                    />
                  </Field>
                </FieldLabel>
              );
            })}
          </RadioGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormRadioGroup;
export type { FormRadioOption };
