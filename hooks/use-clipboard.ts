"use client"

import { useCopyHistory } from "@/components/providers/copy-history";

export default function useClipboard() {
  const { saveHistory } = useCopyHistory();

  const isAllowed = async (): Promise<boolean> => {
    if (typeof window === "undefined" || !navigator.permissions) return false;

    try {
      const { state } = await navigator.permissions.query({
        name: "clipboard-write" as PermissionName,
      });
      return state === "granted" || state === "prompt";
    } catch {
      return false;
    }
  };

  const copyToClipboard = async (
    payloads: ClipboardItem[],
    options: { storeInHistory?: boolean } = { storeInHistory: true }
  ) => {
    const isCanCopy: boolean = await isAllowed();
    if (!isCanCopy) {
      return { success: false, error: new Error("Clipboard is not supported.") };
    }

    try {
      await navigator.clipboard.write(payloads);

      if (options.storeInHistory) {
        const copiedItems = await Promise.all(
          payloads.map(async (item) => {
            const types = item.types;
            const contentType = types[0];

            const blob = await item.getType(contentType);

            let content: string | Blob;
            if (contentType.startsWith("text/")) {
              content = await blob.text();
            } else {
              content = blob;
            }

            return { content, contentType };
          })
        );

        saveHistory(copiedItems);
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error };
    }
  }

  return {
    copyToClipboard
  }
}
