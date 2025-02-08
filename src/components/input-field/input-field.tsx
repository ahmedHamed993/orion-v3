import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Input } from "../ui/input";

type Props = {
  label: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "ref"
>;

const InputField = ({ label, ...props }: Props) => {
  return (
    <div>
      <label className="text-slate-700 text-sm mb-1">{label}</label>
      <Input {...props} />
    </div>
  );
};

export default InputField;
