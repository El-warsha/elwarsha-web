import { TextInputField } from '../TextInputField/TextInputField'
import { TextAreaField } from '../TextAreaField/TextAreaField'
import type { FormFieldProps } from 'src/types/types'
import SelectField from '../SelectField/SelectField';

export type FormFieldConfig = FormFieldProps & {
  name: string;
  type: "text" | "email" | "textarea" |'select'|'url'|'tel';
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  defaultOption?:string
  error?:string
  

  
  
};

export default function FormField(props:FormFieldConfig) {
    switch(props.type)
   { 
   case 'text':
   case 'email':
   case 'url':
   case 'tel':
  return (
 <TextInputField {...props}/>)
   case 'textarea':
  return (
 <TextAreaField {...props}/>)
 case 'select':
  return <SelectField {...props}  />
}



}
