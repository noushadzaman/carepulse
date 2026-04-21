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
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { E164Number } from "libphonenumber-js/core";

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
  const { fieldType, iconAlt, iconSrc, placeholder } = props;

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

    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;

  return (
    <div>
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
