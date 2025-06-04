"use client"

import { useEffect, useState } from 'react';

// components
import CopyButton from '@/components/common/copy-button';
import Code from '@/components/ui/code';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Loading } from '@/components/ui/loading';
import { Shuffle } from 'lucide-react';

// utils
import randomThaiNationalID from '@/utils/random-thai-national-id';
import { cn } from '@/lib/utils';

export type RandomThaiNationalIDProps = {
  rootClassName?: string;
};

type RandomOptions = {
  includeDashes: boolean;
}

export default function RandomThaiNationalID({ rootClassName }: RandomThaiNationalIDProps) {
  const [thaiNationalID, setThaiNationalID] = useState<string>("");
  const [randomOptions, setRandomOptions] = useState<RandomOptions>({ includeDashes: false });

  const formattedThaiNationalID = randomOptions.includeDashes ? thaiNationalID : thaiNationalID.replaceAll("-", "");

  useEffect(() => {
    setThaiNationalID(randomThaiNationalID());
  }, []);

  return (
    <Card className={cn(rootClassName)}>
      <CardHeader>
        <CardTitle>Thai National ID</CardTitle>
        <CardDescription>Your Thai National ID:</CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-between gap-2'>
        {!thaiNationalID ? (
          <Loading className="w-full" size="sm" />
        ) : (
          <div className='flex-1 flex flex-col  md:justify-between gap-2'>
            <div className='flex-1 w-full flex flex-col items-center justify-between gap-2 md:flex-row'>
              <div className="w-full">
                <Code>{formattedThaiNationalID}</Code>
              </div>
              <div className="w-full md:w-auto flex items-center gap-2">
                <CopyButton
                  className="w-1/2 md:min-w-[106px]"
                  copyContent={{ content: formattedThaiNationalID, contentType: "text/plain" }}
                />
                <Button className="w-1/2 md:min-w-[106px]" variant={"outline"} onClick={() => setThaiNationalID(randomThaiNationalID())}>
                  <Shuffle />
                  Generate
                </Button>
              </div>
            </div>
            <div className='flex-1 flex items-center gap-1'>
              <Checkbox
                id='copy-with-format'
                name='copy-with-format'
                checked={randomOptions.includeDashes}
                onCheckedChange={(checked) => setRandomOptions((prevOptions) => ({ ...prevOptions, includeDashes: checked as boolean }))}
              />
              <Label htmlFor='copy-with-format'>Include dashes in the ID</Label>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
