"use client"

// core
import React from "react"

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loading } from '@/components/ui/loading'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import CopyHistoryList from '@/components/features/copy-history-list'

// hooks
import useIsMounted from '@/hooks/use-is-mounted'

// utils
import { cn } from '@/lib/utils'
import dayjs from '@/lib/dayjs'

dayjs.locale("en")

export type CopyHistoryProps = {
  rootClassName?: string;
  rootCopyHistoryListClassName?: string;
  copyHistoryListProps?: React.ComponentProps<typeof CopyHistoryList>;
}

export default function CopyHistory({
  rootClassName,
  rootCopyHistoryListClassName,
  copyHistoryListProps,
}: CopyHistoryProps) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return (
      <Card className={cn("min-w-[358px]", rootClassName)}>
        <CardHeader>
          <CardTitle>History</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className='min-h-80 max-h-80 overflow-auto flex flex-col justify-center items-center'>
          <Loading size='sm' />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("min-w-[358px]", rootClassName)}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          History
          <Tooltip delayDuration={1000}>
            <TooltipTrigger asChild>
              <Info size={16} strokeWidth={3} className='opacity-60' />
            </TooltipTrigger>
            <TooltipContent>
              We store a maximum of 50 items in your history. Older entries will be removed.
            </TooltipContent>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent className={rootCopyHistoryListClassName}>
        <CopyHistoryList {...copyHistoryListProps} />
      </CardContent>
    </Card >
  )
}
