"use client"

import React, { useEffect, useState } from 'react'

// components
import Code from '@/components/ui/code';
import CopyButton from '@/components/common/copy-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loading } from '@/components/ui/loading';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// utils
import randomThaiNationalID from '@/utils/random-thai-national-id';

export type RandomThaiNationalIDProps = any;

type CopyOptions = {
  copyWithFormat: boolean;
}

export default function RandomThaiNationalID({ }: RandomThaiNationalIDProps) {
  const [thaiNationalID, setThaiNationalID] = useState<string>("");
  const [copyOptions, setCopyOptioins] = useState<CopyOptions>({ copyWithFormat: false });

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
          <div className='flex-1 flex flex-col gap-2'>
            <div className='flex items-center justify-between gap-2'>
              <div className="w-full">
                <Code>{thaiNationalID}</Code>
              </div>
              <div className="flex items-center gap-2">
                <CopyButton
                  className="w-1/2 min-w-[106px]"
                  copyContent={{ content: copyOptions.copyWithFormat ? thaiNationalID : thaiNationalID.replaceAll("-", ""), contentType: "text/plain" }}
                />
                <Button className="w-1/2 min-w-[106px]" variant={"outline"} onClick={() => setThaiNationalID(randomThaiNationalID())}>
                  <Shuffle />
                  Generate
                </Button>
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <Checkbox
                id='copy-with-format'
                name='copy-with-format'
                checked={copyOptions.copyWithFormat}
                onCheckedChange={(checked) => setCopyOptioins((prevOptions) => ({ ...prevOptions, copyWithFormat: checked as boolean }))}
              />
              <Label htmlFor='copy-with-format'>Copy with format</Label>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
