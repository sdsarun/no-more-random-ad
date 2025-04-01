"use client"

// core
import React from 'react'
import { useTheme } from 'next-themes'

// icons
import { Moon, Sun } from "lucide-react"
import { Button } from '@/components/ui/button'
import { SkeletonButton } from '@/components/ui/skeleton'

// hooks
import useIsMounted from '@/hooks/use-is-mounted'

export type ToggleThemeProps = React.ComponentProps<"button">;

export default function ToggleTheme(props: ToggleThemeProps) {
  const isMounted = useIsMounted();
  const { resolvedTheme, setTheme } = useTheme()

  if (!isMounted) {
    return <SkeletonButton className='self-end' size="icon" />;
  }

  return (
    <Button size="icon" variant="ghost" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} {...props}>
      {resolvedTheme && resolvedTheme === "dark" ? <Sun /> : <Moon />}
    </Button>
  )
}
