"use client";

import { ComponentProps, ReactNode, useState } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { SearchIcon } from "lucide-react";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type FormSelectOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

type FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  description?: string;
  placeholder?: string;
  options: FormSelectOption[];
  triggerProps?: ComponentProps<typeof SelectTrigger>;
  /** show a search box in the dropdown to filter options */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** force disabled regardless of RHF field state */
  disabled?: boolean;
};

const FormSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  label,
  description,
  placeholder,
  options,
  triggerProps,
  searchable = false,
  searchPlaceholder = "Search...",
  disabled,
}: FormSelectProps<TFieldValues, TName>) => {
  const id = `form-${name}`;
  const [search, setSearch] = useState("");

  const filteredOptions = searchable
    ? options.filter((option) => {
        const text =
          typeof option.label === "string" ? option.label : option.value;
        return text.toLowerCase().includes(search.toLowerCase());
      })
    : options;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={id}>{label}</FieldLabel>}
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled ?? field.disabled}
            onOpenChange={(open) => {
              if (!open) setSearch("");
            }}
          >
            <SelectTrigger
              id={id}
              aria-invalid={fieldState.invalid}
              className="w-full"
              onBlur={field.onBlur}
              {...triggerProps}
            >
              <SelectValue placeholder={placeholder}>
                {(value: string | null) =>
                  value == null || value === ""
                    ? placeholder
                    : (options.find((option) => option.value === value)
                        ?.label ?? value)
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="">
              {searchable && (
                <div className="sticky top-0 z-10 bg-popover p-1.5 pb-1.5">
                  <InputGroup>
                    <InputGroupAddon>
                      <SearchIcon />
                    </InputGroupAddon>
                    <InputGroupInput
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => e.stopPropagation()}
                      placeholder={searchPlaceholder}
                      autoFocus
                    />
                  </InputGroup>
                </div>
              )}
              {filteredOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="rounded"
                >
                  {option.label}
                </SelectItem>
              ))}
              {searchable && filteredOptions.length === 0 && (
                <div className="px-3 py-2.5 text-sm text-muted-foreground">
                  No results found.
                </div>
              )}
            </SelectContent>
          </Select>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
};

export default FormSelect;
export type { FormSelectOption };
