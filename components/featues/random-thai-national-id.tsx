"use client"

import React, { useEffect, useState } from 'react'

// components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Code from '@/components/ui/code';
import { Loading } from '@/components/ui/loading';

// utils
import randomThaiNationalID from '@/utils/random-thai-national-id';
import CopyButton from '@/components/common/copy-button';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';

export type RandomThaiNationalIDProps = any;

export default function RandomThaiNationalID({ }: RandomThaiNationalIDProps) {
  const [thaiNationalID, setThaiNationalID] = useState<string>("");

  useEffect(() => {
    setThaiNationalID(randomThaiNationalID());
  }, []);

  return (
    <Card className='min-w-[766px] min-h-[154px]'>
      <CardHeader>
        <CardTitle>Thai National ID</CardTitle>
        <CardDescription>Your Thai National ID:</CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-between gap-2'>
        {!thaiNationalID ? (
          <Loading className="w-full" size="sm" />
        ) : (
          <>
            <div className="w-full">
              <Code>{thaiNationalID}</Code>
            </div>
            <div className="flex items-center gap-2">
              <CopyButton
                className="w-1/2 min-w-[106px]"
                copyContent={{ content: thaiNationalID, contentType: "text/plain" }}
              />
              <Button className="w-1/2 min-w-[106px]" variant={"outline"} onClick={() => setThaiNationalID(randomThaiNationalID())}>
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
