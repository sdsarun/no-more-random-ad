import React from 'react'
import { Button } from '@/components/ui/button'
import { History } from 'lucide-react'
import DrawerDialogCopyHistory from '@/components/features/drawer-dialog-copy-history'

type ButtonDrawerDialogCopyHistoryProps = Omit<React.ComponentProps<typeof DrawerDialogCopyHistory>, "children"> & {
  buttonProps?: React.ComponentProps<typeof Button>
};

export default function ButtonDrawerDialogCopyHistory({
  drawerProps,
  triggerProps,
  buttonProps,
}: ButtonDrawerDialogCopyHistoryProps) {
  return (
    <DrawerDialogCopyHistory
      drawerProps={drawerProps}
      triggerProps={{ 
        asChild: true,
        ...triggerProps,
      }}
    >
      <Button
        size="icon"
        variant="ghost"
        {...buttonProps}
      >
        <History />
      </Button>
    </DrawerDialogCopyHistory >
  )
}
