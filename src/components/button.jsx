
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Button as ButtonPrimeReact } from "primereact/button";
import { cva } from "class-variance-authority";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}


const buttonVariants = cva(
    "py-2 px-3 w-fit",
    {
      variants: {
        variant: {
          default:
            "bg-blue-500 text-white hover:bg-blue-300"
        },
        size: {
          default: "h-9 px-4 py-2",
          sm: "h-8 rounded-md px-3 text-xs",
          lg: "h-10 rounded-md px-8",
          icon: "h-9 w-9",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  )

export default function Button({className, variant, size, ...props}) {
    return (
        <ButtonPrimeReact className={cn(buttonVariants({ variant, size, className }))}  {...props} />
    )
}