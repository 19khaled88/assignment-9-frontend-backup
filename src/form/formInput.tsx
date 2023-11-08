'use client'
import { Input } from 'antd';

import { Controller, useFormContext } from "react-hook-form";

type handleChange = (
  value: string,
  checked: boolean,
  name: string
) => void

type eventHandleChange<T extends HTMLElement> = (
  event: React.ChangeEvent<T>
) => void;
type ReactInput = React.InputHTMLAttributes<HTMLInputElement>;

type Change<T extends HTMLElement> = handleChange | eventHandleChange<T>;
interface IInput {
  type?: string;
  name: string;
  size?: 'large' | 'small';
  value?: string | string[] | undefined;
  id?: string;
  required?: boolean;
  placeholder?: string;
  validate?: object;
  label?: string;
  className?: string;
  // onBlur?: BlurHandler<string | number>;
  // onChange?: Change<HTMLInputElement>;
}

const FormInput = ({ type, name, size, validate, value, id, placeholder, className, label, required }: IInput
  // & React.InputHTMLAttributes<HTMLInputElement>
) => {
  const { control } = useFormContext();
  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     onChange(e.target.value, e.target.name);
  // };

  return (
    <>
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        
        render={({ field }) => (

          type === 'password' ?
            (
              < Input.Password
                type={type}
                size={size}
                placeholder={placeholder}
                required={true}
                {...field}
                // onChange={(e)=>{}}
                value={value ? value : field.value}

              />
            ) : (
              < Input
                type={type}
                size={size}
                placeholder={placeholder}
                required={true}
                {...field}

                // onChange={(e)=>{}}

                // onChange={field.onChange}
                value={value ? value : field.value}
              />
            )

        )}
      />
    </>
  )
}

export default FormInput