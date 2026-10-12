import React from 'react'
import { TextInputField } from '../TextInputField/TextInputField'
import { TextAreaField } from '../TextAreaField/TextAreaField'
import type { FormFieldProps } from 'src/types/types'

export type FormFieldConfig = FormFieldProps & {
  name: string;
  type: "text" | "email" | "textarea";
  placeholder?: string;
  required?: boolean;
};
export default function FormField(props:FormFieldConfig) {
    switch(props.type)
   { 
   case 'text':
   case 'email':
  return (
 <TextInputField {...props}/>)
   case 'textarea':
  return (
 <TextAreaField {...props}/>)
}



}
