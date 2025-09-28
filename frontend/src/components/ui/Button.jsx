import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";


const buttonVariants = {
  base: "inline-flex items-center justify-center",
  
  variant: {
    default: "bg-primary text-primary-foreground",
    destructive: "bg-destructive text-white"
  },
  
  size: {
    default: "h-9 px-4 py-2",
    sm: "h-8 gap-1.5",
    lg: "h-10 rounded-md px-6",
    icon: "size-9 rounded-md"
  }
};

function getButtonClasses(variant, size, className) {
  const variantClass = buttonVariants.variant[variant] || buttonVariants.variant.default;
  const sizeClass = buttonVariants.size[size] || buttonVariants.size.default;
  
  return cn(
    buttonVariants.base,
    variantClass,
    sizeClass,
    className
  );
}

function Button({
  className,
  variant = "default", 
  size = "default", 
  asChild = false, 
  ...props
}) {

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={getButtonClasses(variant, size, className)}
      {...props}
    />
  );
}

export { Button};