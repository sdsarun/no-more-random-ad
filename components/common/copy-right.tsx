import React from 'react'
import { cn } from '@/lib/utils';

export type CopyRightAndPowerByProps = Omit<React.ComponentPropsWithRef<"p">, "children">

export default function CopyRight({ className, ...props }: CopyRightAndPowerByProps) {
  return (
    <p 
      className={cn(className, 'text-center text-muted-foreground text-[10px]')} {...props}
    >&copy; {new Date().getFullYear()} sdsarun. All rights reserved.</p>
  )
}
