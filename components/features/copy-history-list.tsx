"use client"

// core
import React from 'react'

// components
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

// hooks
import { useCopyHistory } from '@/components/providers/copy-history';

// utils
import { cn } from '@/lib/utils';
import dayjs from '@/lib/dayjs';
import CopyButton from '@/components/common/copy-button';
import { Separator } from '@/components/ui/separator';

dayjs.locale("en");

type CopyHistoryListProps = {
  rootClassName?: string;
  rootContentClassName?: string;
  tooltipContentProps?: React.ComponentProps<typeof TooltipContent>;
}

export default function CopyHistoryList({
  rootClassName,
  rootContentClassName,
  tooltipContentProps,
}: CopyHistoryListProps) {
  const { copyHistoryList } = useCopyHistory();

  return (
    <div className={cn(rootClassName)}>
      {copyHistoryList.length === 0 ? (
        <p className='text-muted-foreground '>No copies yet? Your history will appear here when you start copying!</p>
      ) : copyHistoryList.map(({ id, content, contentType, copyAt }) => (
        <div key={id} className='flex flex-col gap-2'>
          <div className={cn('flex items-center justify-between', rootContentClassName)}>
            {/* left content */}
            <div className='flex flex-col'>
              <Tooltip>
                <TooltipTrigger asChild>
                  <h3
                    className="flex-1 w-full truncate cursor-default max-w-[240px]"
                    title={content}
                  >{content}</h3>
                </TooltipTrigger>
                <TooltipContent
                  {...tooltipContentProps}
                  className={cn("break-words", tooltipContentProps?.className)}
                >{content}</TooltipContent>
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
  )
}
