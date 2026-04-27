"use client";

import { Control, Controller } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js/core";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomProps {
  control: any;
  name: string;
  fieldType: FormFieldType;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    iconAlt,
    iconSrc,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <Input
            placeholder={placeholder}
            {...field}
            className="shad-input border-0"
          />
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <div>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </div>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
          />
          <DatePicker
            selected={field.value}
            onChange={(date: Date | null) => field.onChange(date)}
            dateFormat={dateFormat ?? "MM/dd/yyyy"}
            showTimeSelect={showTimeSelect ?? false}
            timeInputLabel="Time:"
            wrapperClassName="date-picker"
          />
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="shad-select-trigger">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="shad-select-content">
            {props.children}
          </SelectContent>
        </Select>
      );
    case FormFieldType.TEXTAREA:
      return (
        <Textarea
          placeholder={placeholder}
          {...field}
          className="shad-textArea"
          disabled={props.disabled}
        />
      );
    case FormFieldType.CHECKBOX:
      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id={props.name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <label htmlFor={props.name} className="checkbox-label">
            {props.label}
          </label>
        </div>
      );
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;

  return (
    <div className="w-full">
      <FieldGroup>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              {fieldType !== FormFieldType.CHECKBOX && label && (
                <FieldLabel htmlFor="form-rhf-input-username">
                  {label}
                </FieldLabel>
              )}

              <RenderField field={field} props={props} />
              {/* <Input
                {...field}
                id="form-rhf-input-username"
                aria-invalid={fieldState.invalid}
                placeholder="shadcn"
                autoComplete="username"
              /> */}
              {/* <FieldDescription>
                This is your public display name. Must be between 3 and 10
                characters. Must only contain letters, numbers, and underscores.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />} */}
            </Field>
          )}
        />
      </FieldGroup>
    </div>
  );
};

export default CustomFormField;
