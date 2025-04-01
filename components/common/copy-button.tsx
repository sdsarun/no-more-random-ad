"use client"

// core
import React, { useRef, useState } from 'react';

// components
import { Button } from '@/components/ui/button';

// hooks
import useClipboard from '@/hooks/use-clipboard';

// types
import type { CopyHistoryItem } from '@/types/copy-history';
import { Copy, CopyCheck } from 'lucide-react';

export type CopyButtonProps = React.ComponentProps<typeof Button> & {
  copyContent?: Pick<CopyHistoryItem, "content" | "contentType">;
  showIcon?: boolean;
  showCopyText?: boolean;
  storeInHistory?: boolean;
};

export default function CopyButton({ copyContent, showIcon = true, showCopyText = true, storeInHistory = true, ...props }: CopyButtonProps) {
  const { copyToClipboard } = useClipboard();

  const copyTimeoutRef = useRef<NodeJS.Timeout>(undefined);

  const [isCopy, setIsCopy] = useState<boolean>(false);

  return (
    <Button
      onClick={() => {
        const clipboardItem = new ClipboardItem({ [copyContent?.contentType || "text/plain"]: copyContent?.content });
        copyToClipboard([clipboardItem], { storeInHistory});
        setIsCopy(true);
        copyTimeoutRef.current = setTimeout(() => {
          setIsCopy(false);
        }, 1000);
      }}
      {...props}
    >
      {isCopy ? (
        <>
          {showIcon && <CopyCheck />}
          {showCopyText && 'Copied'}
        </>
      ) : (
        <>
          {showIcon && <Copy />}
          {showCopyText && 'Copy'}
        </>
      )}
    </Button>
  );
}
