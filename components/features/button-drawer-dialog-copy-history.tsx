import React from 'react'
import { Button } from '@/components/ui/button'
import { History } from 'lucide-react'
import DrawerDialogCopyHistory from '@/components/features/drawer-dialog-copy-history'

export default function ButtonDrawerDialogCopyHistory() {
  return (
    <DrawerDialogCopyHistory triggerProps={{ asChild: true }} >
      <Button
        size="icon"
        variant="ghost"
      >
        <History />
      </Button>
    </DrawerDialogCopyHistory >
  )
}
