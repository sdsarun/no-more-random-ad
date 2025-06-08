"use client"

// core
import React from 'react'
import { useForm } from 'react-hook-form';

// components
import CopyButton from '@/components/common/copy-button';
import { Check, NotebookPen, Pencil, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CopyHistoryItem } from '@/types/copy-history';

// hooks
import { useCopyHistory } from '@/components/providers/copy-history';

// utils
import { cn } from '@/lib/utils';
import dayjs from '@/lib/dayjs';

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
      ) : copyHistoryList.map((historyItem) => {
        const { id, content, contentType, copyAt } = historyItem;
        return (
          <div key={id} className={cn('flex flex-col gap-2 group', rootContentClassName)}>
            <div className='flex items-center justify-between'>
              {/* left content */}
              <div className='flex flex-col'>
                <Tooltip delayDuration={500}>
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
              <div className='self-start'>
                <CopyButton
                  copyContent={{ content, contentType }}
                  storeInHistory={false}
                  showCopyText={false}
                  size="icon"
                  variant="ghost"
                />
              </div>
            </div>
            <div>
              {/* next line */}
              <Remark
                historyItem={historyItem}
              />
            </div>
            <Separator className='mb-2' />
          </div>
        )
      })}
    </div>
  )
}

type RemarkProps = {
  historyItem: CopyHistoryItem;
}

function Remark({ historyItem: { id, remark } }: RemarkProps) {
  const { addRemark, removeRemark } = useCopyHistory();

  const formEditRemark = useForm<{
    editMode: "editable" | "disable";
    remark: CopyHistoryItem["remark"];
  }>({
    values: {
      editMode: "disable",
      remark
    }
  });

  const { watch, register, resetField, setValue, getValues } = formEditRemark;
  const editMode = watch("editMode");

  const handleSave = () => {
    const trimmedRemark = getValues("remark")?.trim();
    if (trimmedRemark) {
      addRemark(id, trimmedRemark);
    } else {
      removeRemark(id);
    }
    setValue("editMode", "disable");
  };

  if (!remark && editMode === "disable") {
    return (
      <div>
        <Button
          className="flex items-center gap-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300"
          variant="ghost"
          size="sm"
          onClick={() => setValue("editMode", "editable")}
        >
          <NotebookPen />
          Add remark
        </Button>
      </div>
    );
  }

  return (
    <div className="group flex flex-col gap-2">
      <div className="relative">
        <Textarea
          {...register("remark")}
          className="resize-none w-full whitespace-pre-wrap break-words min-h-[130px] max-h-[180px] overflow-y-auto scroll-p-16 pb-16"
          disabled={editMode === "disable"}
          placeholder="Enter your remark..."
          onKeyDown={(e) => {
            const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
            const isCmdEnter = isMac && e.metaKey && e.key === "Enter";
            const isCtrlEnter = !isMac && e.ctrlKey && e.key === "Enter";

            if ((isCmdEnter || isCtrlEnter) && editMode === "editable") {
              e.preventDefault();
              handleSave();
            }
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 pl-2 pr-5 py-1 flex flex-col">
          {editMode === "editable" ? (
            <>
              <div className="flex items-center">
                <Button
                  className="flex items-center gap-2 flex-1"
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setValue("editMode", "disable");
                    resetField("remark");
                  }}
                >
                  <X />
                  Cancel
                </Button>
                <Button
                  className="flex items-center gap-2 flex-1"
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                >
                  <Check />
                  Save
                </Button>
              </div>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setValue("editMode", "editable")}
              className="flex items-center gap-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300"
            >
              <Pencil />
              Edit remark
            </Button>
          )}
        </div>

      </div>

      {editMode === "editable" && (
        <p className="text-xs italic text-muted-foreground">
          Press{" "}
          <kbd className="px-1 py-0.5 border rounded">Ctrl</kbd> +{" "}
          <kbd className="px-1 py-0.5 border rounded">Enter</kbd> (or{" "}
          <kbd className="px-1 py-0.5 border rounded">⌘</kbd> +{" "}
          <kbd className="px-1 py-0.5 border rounded">Enter</kbd> on Mac) to save
        </p>
      )}
    </div>
  );
}