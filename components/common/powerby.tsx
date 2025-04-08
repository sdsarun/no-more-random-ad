import React from 'react'
import { cn } from '@/lib/utils';

export type CopyRightAndPowerByProps = Omit<React.ComponentPropsWithRef<"p">, "children">

export default function CopyRightAndPowerBy({ className, ...props }: CopyRightAndPowerByProps) {
  return (
    <p 
      className={cn(className, 'text-center py-4 text-muted-foreground text-[10px]')} {...props}
    >&copy; {new Date().getFullYear()} sdsarun. All rights reserved.</p>
  )
}
