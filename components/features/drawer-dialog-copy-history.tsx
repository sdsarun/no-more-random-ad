"use client"

// core
import React, { useState } from 'react'

// components
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Info, X } from 'lucide-react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import CopyHistoryList from '@/components/features/copy-history-list';

// utils
import dayjs from '@/lib/dayjs';

dayjs.locale("en")

type DrawerDialogCopyHistoryProps = React.PropsWithChildren<{
  drawerProps?: React.ComponentProps<typeof Drawer>;
  triggerProps?: React.ComponentProps<typeof DrawerTrigger>;
}>;

export default function DrawerDialogCopyHistory({
  children,
  drawerProps,
  triggerProps,
}: DrawerDialogCopyHistoryProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Drawer
      direction='right'
      open={isOpen}
      onOpenChange={setIsOpen}
      {...drawerProps}
    >
      <DrawerTrigger
        {...triggerProps}
      >
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className='flex items-center gap-2' asChild>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <h3>History</h3>
                <Tooltip delayDuration={1000}>
                  <TooltipTrigger asChild>
                    <Info size={16} strokeWidth={3} className='opacity-60' />
                  </TooltipTrigger>
                  <TooltipContent>
                    We store a maximum of 50 items in your history. Older entries will be removed.
                  </TooltipContent>
                </Tooltip>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                <X />
              </Button>
            </div>
          </DrawerTitle>
        </DrawerHeader>
        <CopyHistoryList 
          rootContentClassName='px-4'
        />
      </DrawerContent>
    </Drawer>
  )
}
