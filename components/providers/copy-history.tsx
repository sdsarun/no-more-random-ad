"use client"

// core
import React, { createContext, use, useState } from 'react';
import { copyHistoryStorage, type CopyHistoryStorageSchema } from '@/lib/local-storage';

// types
import type { CopyHistoryItem } from '@/types/copy-history';

export type CopyHistoryContextValues = CopyHistoryStorageSchema & {
  saveHistory: (copyValue: Pick<CopyHistoryItem, "content" | "contentType"> | Pick<CopyHistoryItem, "content" | "contentType">[]) => void;
  clearHistory: () => void;
};

export const CopyHistoryContext = createContext({} as CopyHistoryContextValues);
export const useCopyHistory = () => use(CopyHistoryContext);

const MAX_HISTORY_ITEMS = 50;

export default function CopyHistoryProvider({ children }: React.PropsWithChildren) {
  const [storageValues, setStorageValues] = useState<Pick<CopyHistoryContextValues, "copyHistoryList">>({
    copyHistoryList: copyHistoryStorage.get("copyHistoryList") || []
  });

  const saveHistory: CopyHistoryContextValues["saveHistory"] = (copyValue) => {
    setStorageValues(prevState => {
      const copyValuesArray = Array.isArray(copyValue) ? copyValue : [copyValue];

      const newHistoryItems: CopyHistoryItem[] = copyValuesArray.map((item) => ({
        id: crypto.randomUUID(),
        copyAt: new Date(),
        ...item,
      }));

      const updatedHistoryList = [...newHistoryItems, ...prevState.copyHistoryList];
      const limitedHistoryList = updatedHistoryList.slice(0, MAX_HISTORY_ITEMS);
      copyHistoryStorage.set("copyHistoryList", limitedHistoryList);

      return { copyHistoryList: limitedHistoryList };
    });
  }

  const clearHistory = () => {
    copyHistoryStorage.set("copyHistoryList", []);
    setStorageValues({ copyHistoryList: [] });
  };

  const contextValues: CopyHistoryContextValues = {
    copyHistoryList: storageValues.copyHistoryList,
    saveHistory,
    clearHistory
  }

  return (
    <CopyHistoryContext value={contextValues}>
      {children}
    </CopyHistoryContext>
  )
}
