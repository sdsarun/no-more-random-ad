import React from 'react'
import { cn } from '@/lib/utils';

export type CodeProps = React.ComponentPropsWithRef<"code">;

export default function Code({ children, className, ...props }: CodeProps) {
  return (
    <code className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-xl w-full block text-center", className)} {...props}>
      {children}
    </code>
  )
}
