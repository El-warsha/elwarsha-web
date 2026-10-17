export type FormFieldProps = {
  label: string;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  value:string,
  onChange:(value:string)=>void
};
