"use client"

export default function useClipboard() {
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

  const copyToClipboard = async (payloads: ClipboardItem[]) => {
    const isCanCopy: boolean = await isAllowed();
    if (!isCanCopy) {
      return { success: false, error: new Error("Clipboard is not supported.") };
    }

    try {
      await navigator.clipboard.write(payloads);
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error };
    }
  }

  return {
    copyToClipboard
  }
}
