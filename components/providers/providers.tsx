// core
import React from 'react'

// components
import CopyHistoryProvider from '@/components/providers/copy-history'
import { ThemeProvider } from '@/components/providers/theme'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <TooltipProvider>
        <CopyHistoryProvider>
          {children}
        </CopyHistoryProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}
