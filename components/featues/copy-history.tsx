"use client"

import { useRef } from 'react'

// components
import CopyButton from '@/components/common/copy-button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loading } from '@/components/ui/loading'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Info } from 'lucide-react'

// hooks
import { useCopyHistory } from '@/components/providers/copy-history'
import useIsMounted from '@/hooks/use-is-mounted'

// utils
import dayjs from '@/lib/dayjs'
import { cn } from '@/lib/utils'
import getMotivationalHistoryMessage from '@/utils/motivational-history-messages'

export type CopyHistoryProps = {
  rootClassName?: string;
}

export default function CopyHistory({
  rootClassName
}: CopyHistoryProps) {
  const isMounted = useIsMounted();
  const { copyHistoryList } = useCopyHistory();

  const historyDescriptionRef = useRef<string>(getMotivationalHistoryMessage(copyHistoryList.length));

  if (!isMounted) {
    return (
      <Card className={cn('md:min-w-[766px] md:min-h-[154px]', rootClassName)}>
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
    <Card className={cn('md:min-w-[766px] md:min-h-[154px]', rootClassName)}>
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
        <CardDescription>{historyDescriptionRef.current}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={cn('h-[calc(100dvh-640px)] overflow-auto flex flex-col', { "justify-center items-center": copyHistoryList.length === 0 })}>
          {copyHistoryList.length === 0 ? (
            <p className='text-muted-foreground '>No copies yet? Your history will appear here when you start copying!</p>
          ) : copyHistoryList.map(({ id, content, contentType, copyAt }) => (
            <div key={id} className='flex flex-col gap-2'>
              <div className='flex items-center justify-between pr-4'>
                {/* left content */}
                <div className='flex flex-col'>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h3
                        className="truncate cursor-default max-w-[180px] sm:max-w-[240px] md:max-w-[320px] lg:max-w-[420px]"
                        title={content}
                      >{content}</h3>
                    </TooltipTrigger>
                    <TooltipContent className="break-words max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px]">{content}</TooltipContent>
                  </Tooltip>
                  <p className='text-xs text-muted-foreground' title={dayjs(copyAt).format()}>
                    {dayjs(copyAt).fromNow()}
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
      </CardContent>
    </Card >
  )
}
