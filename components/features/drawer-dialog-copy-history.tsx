"use client"

// core
import React, { useState } from 'react'

// components
import CopyButton from '@/components/common/copy-button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Info, X } from 'lucide-react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// hooks
import { useCopyHistory } from '@/components/providers/copy-history';

// utils
import { cn } from '@/lib/utils';
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
  const { copyHistoryList } = useCopyHistory();

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
        <div className={cn('h-[calc(100dvh-68px)] overflow-auto flex flex-col', { "justify-center items-center": copyHistoryList.length === 0 })}>
          {copyHistoryList.length === 0 ? (
            <p className='text-muted-foreground '>No copies yet? Your history will appear here when you start copying!</p>
          ) : copyHistoryList.map(({ id, content, contentType, copyAt }) => (
            <div key={id} className='flex flex-col gap-2'>
              <div className='flex items-center justify-between px-4'>
                {/* left content */}
                <div className='flex flex-col'>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h3
                        className="flex-1 w-full truncate cursor-default max-w-[240px]"
                        title={content}
                      >{content}</h3>
                    </TooltipTrigger>
                    <TooltipContent className="break-words max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px]">{content}</TooltipContent>
                  </Tooltip>
                  <p className='text-xs text-muted-foreground' title={dayjs(copyAt).format()}>
                    {dayjs().diff(copyAt, 'day') > 2
                      ? dayjs(copyAt).format('D MMM YYYY h:mm A')
                      : dayjs(copyAt).fromNow()}
                  </p>
                </div>
                {/* right content */}
                <div>
                  <CopyButton
                    copyContent={{ content, contentType }}
                    storeInHistory={false}
                    showCopyText={false}
                    size="icon"
                    variant="ghost"
                  />
                </div>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
