"use client"

// core
import { useEffect, useState } from "react";

// components
import CopyButton from "@/components/common/copy-button";
import Code from "@/components/ui/code";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";

// icons
import { Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";

export type RandomUUIDProps = {
  rootClassName?: string;
}

export default function RandomUUID({ rootClassName }: RandomUUIDProps) {
  const [uuid, setUUID] = useState<string>("");

  useEffect(() => {
    setUUID(crypto.randomUUID());
  }, []);

  return (
    <Card className={cn("min-w-[766px] min-h-[154px]", rootClassName)}>
      <CardHeader>
        <CardTitle>UUID v4</CardTitle>
        <CardDescription>Your Version 4 UUID:</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-2">
        {!uuid ? (
          <Loading className="w-full" size="sm" />
        ) : (
          <>
            <div className="w-full">
              <Code>{uuid}</Code>
            </div>
            <div className="flex items-center gap-2">
              <CopyButton
                className="w-1/2 min-w-[106px]"
                copyContent={{ content: uuid, contentType: "text/plain" }}
              />
              <Button className="w-1/2 min-w-[106px]" variant={"outline"} onClick={() => setUUID(crypto.randomUUID())}>
                <Shuffle />
                Generate
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}