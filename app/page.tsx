"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useClipboard from "@/hooks/use-clipboard";
import { useEffect } from "react";

export default function Home() {
  const { copyToClipboard } = useClipboard();

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    const copy = async () => {
      const content = new ClipboardItem({
        "text/plain": "HELLOWROLDNAJA5555555555555555"
      });
      const reuslt = await copyToClipboard([content]);
    }

    copy();
  }, [copyToClipboard]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Card className="min-w-[300px]">
        <CardHeader>
          <CardTitle>UUID v4</CardTitle>
          <CardDescription>Your Version 4 UUID:</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{crypto.randomUUID()}</p>
          <Button>Copy</Button>
          <Button>Random</Button>
        </CardContent>
      </Card>
    </div>
  );
}
