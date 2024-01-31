import { InputText } from "primereact/inputtext";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export default function Input({className, ...props}) {
    return (
        <InputText className={cn(
            'border p-2',
            className
          )} {...props} />
    )
}