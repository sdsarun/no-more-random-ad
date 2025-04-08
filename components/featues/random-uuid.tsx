"use client"

// core
import { useEffect, useState } from "react";

// components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loading } from "@/components/ui/loading";
import CopyButton from "@/components/common/copy-button";

// icons
import { Shuffle } from "lucide-react";
import Code from "@/components/ui/code";

export default function RandomUUID() {
  const [uuid, setUUID] = useState<string>("");

  useEffect(() => {
    setUUID(crypto.randomUUID());
  }, []);

  return (
    <Card className="min-w-[766px] min-h-[154px]">
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