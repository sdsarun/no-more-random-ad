"use client"

// core
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

// components
import CopyButton from '@/components/common/copy-button';
import Code from '@/components/ui/code';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';

// utils
import { cn } from '@/lib/utils';
import dayjs from '@/lib/dayjs';

export type RandomTimestampProps = {
  rootClassName?: string;
}

export default function RandomTimestamp({
  rootClassName,
}: RandomTimestampProps) {
  const form = useForm({
    defaultValues: {
      formattedTimestamp: "",
      inputDateFormat: "YYYY-MM-DD HH:mm:ssZ",
      selectedDate: new Date(),
    }
  })

  const formattedTimestamp = form.watch("formattedTimestamp");
  const selectedDate = form.watch("selectedDate");

  const randomTimestamp = (
    payload: {
      inputDateFormat: string;
      selectedDate: Date;
    }
  ) => {
    const { selectedDate, inputDateFormat } = payload;
    try {
      const formattedTimestamp = dayjs(selectedDate).format(inputDateFormat)
      form.setValue("formattedTimestamp", formattedTimestamp);
    } catch {
      form.setValue("formattedTimestamp", "Invalid date format.");
    }
  }

  useEffect(() => {
    randomTimestamp(form.getValues());
  }, []);

  return (
    <Card className={cn(rootClassName)}>
      <CardHeader>
        <CardTitle>Timestamp</CardTitle>
        <CardDescription>Your Timestamp:</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4 md:flex-row md:items-start'>
        <div className='flex-1 flex flex-col gap-4'>
          <div className='w-full flex flex-col gap-4 md:flex-row'>
            <div className='flex flex-col gap-4 overflow-x-auto'>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  className='col-span-full'
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const now = new Date();
                    form.setValue("selectedDate", now);
                    randomTimestamp({ ...form.getValues(), selectedDate: now });
                  }}
                >
                  Current Time
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const date = dayjs(selectedDate).subtract(1, 'minute').toDate();
                    form.setValue("selectedDate", date);
                    randomTimestamp({ ...form.getValues(), selectedDate: date });
                  }}
                >
                  -1 Minute
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const date = dayjs(selectedDate).add(1, 'minute').toDate();
                    form.setValue("selectedDate", date);
                    randomTimestamp({ ...form.getValues(), selectedDate: date });
                  }}
                >
                  +1 Minute
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const date = dayjs().subtract(1, 'hour').toDate();
                    form.setValue("selectedDate", date);
                    randomTimestamp({ ...form.getValues(), selectedDate: date });
                  }}
                >
                  1 Hour Ago
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const date = dayjs().add(1, 'hour').toDate();
                    form.setValue("selectedDate", date);
                    randomTimestamp({ ...form.getValues(), selectedDate: date });
                  }}
                >
                  1 Hour Later
                </Button>
              </div>
              <Calendar
                className='p-0 mx-auto'
                mode='single'
                selected={selectedDate}
                onSelect={(date) => {
                  if (!date) return;

                  const current = dayjs(selectedDate);
                  const updated = dayjs(date)
                    .hour(current.hour())
                    .minute(current.minute())
                    .second(current.second());

                  const updatedDate = updated.toDate();

                  form.setValue("selectedDate", updatedDate);
                  randomTimestamp({ ...form.getValues(), selectedDate: updatedDate });
                }}
              />
              <div className='flex flex-col md:flex-row items-start md:items-center gap-2 w-full'>
                <Label htmlFor='time'>Time: </Label>
                <Input
                  id='time'
                  type='time'
                  className='w-auto'
                  value={dayjs(selectedDate).format("HH:mm")}
                  onChange={(event) => {
                    const [hours, minutes] = event.target.value.split(':').map(Number);
                    const updatedDate = dayjs(selectedDate)
                      .hour(hours)
                      .minute(minutes)
                      .toDate();
                    form.setValue("selectedDate", updatedDate)
                    randomTimestamp({ ...form.getValues(), selectedDate: updatedDate });
                  }}
                />
              </div>
            </div>
            <div className='flex-1 flex flex-col gap-4'>
              <div className='flex flex-col gap-4'>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                  {[
                    'YYYY-MM-DD HH:mm:ssZ',           // ISO-like with timezone offset (Postgres style)
                    'YYYY-MM-DD',                     // ISO Date only
                    'DD/MM/YYYY',                     // Common European format
                    'MM/DD/YYYY',                     // Common US format (added popular)
                    'MMMM D, YYYY',                   // Full month name with day and year
                    'HH:mm:ss',                       // Time only
                    'YYYY-MM-DDTHH:mm:ssZ',           // ISO 8601 with timezone Zulu
                    'YYYY-MM-DD HH:mm:ss.SSSZ',       // Milliseconds with timezone offset
                    'ddd, MMM D, YYYY h:mm A',        // Popular human-readable datetime with AM/PM (e.g. Thu, Apr 25, 2025 1:04 AM)
                    '[Show text as-is in brackets] [Hello, World!] YYYY-MM-DDTHH:mm:ssZ',
                  ].map((inputDateFormat) => (
                    <Button
                      title={inputDateFormat}
                      className="w-full px-2 py-1 min-h-[2.5rem] text-left truncate"
                      key={inputDateFormat}
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        form.setValue("inputDateFormat", inputDateFormat);
                        randomTimestamp({ ...form.getValues(), inputDateFormat })
                      }}
                    >
                      {inputDateFormat}
                    </Button>
                  ))}
                </div>
              </div>
              <Input
                id="nameInput"
                type="text"
                placeholder="Type last name here"
                className="border rounded px-3 py-2 w-full"
                {...form.register("inputDateFormat")}
                onChange={(event) => {
                  const inputDateFormat = (event.target.value || "");
                  form.register("inputDateFormat").onChange(event)
                  randomTimestamp({ ...form.getValues(), inputDateFormat });
                }}
                max={100}
              />
              <div className='flex flex-col md:flex-row gap-2 w-full'>
                <div className="w-full">
                  <Code>{formattedTimestamp}</Code>
                </div>
                <div className="w-full md:w-auto flex items-center gap-2">
                  <CopyButton
                    className="w-1/2 md:min-w-[106px]"
                    copyContent={{ content: formattedTimestamp, contentType: "text/plain" }}
                  />
                </div>
              </div>
            </div>
          </div >
          <TableAllowedDateFormat />
        </div >
      </CardContent >
    </Card >
  )
}

function TableAllowedDateFormat() {
  const formats = [
    { format: "YY", output: "18", description: "Two-digit year" },
    { format: "YYYY", output: "2018", description: "Four-digit year" },
    { format: "Q", output: "1-4", description: "Quarter" },
    { format: "M", output: "1-12", description: "Month, beginning at 1" },
    { format: "MM", output: "01-12", description: "Month, 2-digits" },
    { format: "MMM", output: "Jan-Dec", description: "Abbreviated month name" },
    { format: "MMMM", output: "January-December", description: "Full month name" },
    { format: "D", output: "1-31", description: "Day of the month" },
    { format: "DD", output: "01-31", description: "Day of the month, 2-digits" },
    { format: "Do", output: "1st 2nd ... 31st", description: "Day of Month with ordinal" },
    { format: "d", output: "0-6", description: "Day of the week, Sunday = 0" },
    { format: "dd", output: "Su-Sa", description: "Min name of the day of the week" },
    { format: "ddd", output: "Sun-Sat", description: "Short name of the day of the week" },
    { format: "dddd", output: "Sunday-Saturday", description: "Full name of the day of the week" },
    { format: "H", output: "0-23", description: "Hour (24h)" },
    { format: "HH", output: "00-23", description: "Hour, 2-digits (24h)" },
    { format: "h", output: "1-12", description: "Hour (12h clock)" },
    { format: "hh", output: "01-12", description: "Hour, 2-digits (12h)" },
    { format: "k", output: "1-24", description: "Hour (1-based, 24h)" },
    { format: "kk", output: "01-24", description: "Hour, 2-digits (1-based, 24h)" },
    { format: "m", output: "0-59", description: "Minute" },
    { format: "mm", output: "00-59", description: "Minute, 2-digits" },
    { format: "s", output: "0-59", description: "Second" },
    { format: "ss", output: "00-59", description: "Second, 2-digits" },
    { format: "SSS", output: "000-999", description: "Millisecond, 3-digits" },
    { format: "Z", output: "+05:00", description: "UTC offset ±HH:mm" },
    { format: "ZZ", output: "+0500", description: "UTC offset ±HHmm" },
    { format: "A", output: "AM PM", description: "Uppercase meridiem" },
    { format: "a", output: "am pm", description: "Lowercase meridiem" },
    { format: "X", output: "1360013296", description: "Unix Timestamp in seconds" },
    { format: "x", output: "1360013296123", description: "Unix Timestamp in milliseconds" },
    { format: "LT", output: "8:02 PM", description: "Localized time" },
    { format: "LTS", output: "8:02:18 PM", description: "Localized time with seconds" },
    { format: "L", output: "08/16/2018", description: "Localized date" },
    { format: "LL", output: "August 16, 2018", description: "Localized full date" },
    { format: "LLL", output: "August 16, 2018 8:02 PM", description: "Localized full date & time" },
    { format: "LLLL", output: "Thursday, August 16, 2018 8:02 PM", description: "Localized full weekday, date & time" },
    { format: "l", output: "8/16/2018", description: "Localized short date" },
    { format: "ll", output: "Aug 16, 2018", description: "Localized short full date" },
    { format: "lll", output: "Aug 16, 2018 8:02 PM", description: "Localized short date & time" },
    { format: "llll", output: "Thu, Aug 16, 2018 8:02 PM", description: "Localized short weekday, date & time" },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="flex flex-row justify-between items-center cursor-pointer">
            <CardTitle>List of all available formats</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Format</TableHead>
                  <TableHead>Example Output</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formats.map(({ format, output, description }) => (
                  <TableRow key={format}>
                    <TableCell><code>{format}</code></TableCell>
                    <TableCell>{output}</TableCell>
                    <TableCell>{description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}