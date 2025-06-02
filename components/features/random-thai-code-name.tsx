"use client"

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as y from "yup"
import { useDebouncedCallback } from "use-debounce"

// components
import CopyButton from '@/components/common/copy-button';
import Code from '@/components/ui/code';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { ButtonSelectGroup } from '@/components/ui/button-select-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Brush } from 'lucide-react';
import { Tooltip } from '@radix-ui/react-tooltip';
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// hooks
import useIsMounted from '@/hooks/use-is-mounted';

// utils
import { cn } from '@/lib/utils';

export type RandomThaiCodeNameProps = {
  rootClassName?: string;
}

const ownerTypes = [
  { value: 'individual', label: 'บุคคล' },
  { value: 'limited_company', label: 'นิติบุคคล (บริษัทจำกัด)' },
  { value: 'partnership', label: 'นิติบุคคล (ห้างหุ้นส่วนจำกัด)' },
  { value: 'state_enterprise', label: 'รัฐวิสาหกิจ' },
  { value: 'government', label: 'รัฐบาล' },
  { value: 'association', label: 'สมาคม' },
  { value: 'foundation', label: 'มูลนิธิ' },
  { value: 'temple', label: 'วัด' },
  { value: 'other', label: 'อื่นๆ' },
];

const defaultOwnerType = 'individual';

const formThaiCodeNameSchema = y.object({
  ownerType: y.string().required(),
  firstName: y.string().required(),
  lastName: y.string().when('ownerType', {
    is: 'individual',
    then: schema => schema.required('Last name is required for individuals'),
    otherwise: schema => schema.notRequired(),
  }),
  codeName: y.string().required(),
});

type FormThaiCodeNameSchemaValues = y.InferType<typeof formThaiCodeNameSchema>;

export default function RandomThaiCodeName({
  rootClassName,
}: RandomThaiCodeNameProps) {
  const isMounted = useIsMounted();

  const form = useForm<FormThaiCodeNameSchemaValues>({
    defaultValues: {
      ownerType: defaultOwnerType,
      firstName: "",
      lastName: "",
      codeName: "",
    },
    resolver: yupResolver(formThaiCodeNameSchema as any)
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateCodeNameDebounced = useDebouncedCallback(async (
    payload: Partial<Parameters<typeof generateThaiCodeName>[0]>
  ) => {
    const newCodeName = await generateThaiCodeName(payload as any)
    form.setValue("codeName", newCodeName);
    setIsLoading(false)
  }, 300);

  const ownerType = form.watch("ownerType");
  const codeName = form.watch("codeName");

  const handleFieldChange = async (fieldName: keyof FormThaiCodeNameSchemaValues, value: string) => {
    const [firstName, lastName, ownerType] = form.getValues(["firstName", "lastName", "ownerType"]);

    const payloadGenerateCodeName: Partial<Parameters<typeof generateThaiCodeName>[0]> = {
      firstName: cleanThaiName(firstName),
      lastName: ownerType === "individual" && lastName ? cleanThaiName(lastName) : "",
      ownerType,
      [fieldName]: value,
    }

    setIsLoading(true);
    updateCodeNameDebounced(payloadGenerateCodeName);
  }

  useEffect(() => {
    updateCodeNameDebounced(form.getValues());
  }, []);

  return (
    <Card className={cn('md:min-w-[766px] md:min-h-[154px]', rootClassName)}>
      <CardHeader>
        <CardTitle>Thai Code Name</CardTitle>
        <CardDescription>Your Thai Code Name:</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        {!isMounted ? (
          <Loading className="w-full" size="sm" />
        ) : (
          <Form {...form}>
            <div>
              <h3 className='mb-2 font-medium'>Owner type</h3>
              <div className=''>
                <FormField
                  control={form.control}
                  name='ownerType'
                  render={({ field }) => (
                    <ButtonSelectGroup
                      rootClassName='grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-2'
                      items={ownerTypes}
                      defaultValue={[defaultOwnerType]}
                      onChange={([selectedOwnerType]) => {
                        field.onChange(selectedOwnerType);
                        handleFieldChange("ownerType", selectedOwnerType as string);
                      }}
                      value={[field.value]}
                      size="lg"
                      inactiveButtonVariant="outline"
                      requireSelection
                    />
                  )}
                />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        id="nameInput"
                        type="text"
                        placeholder="Type name here"
                        className="border rounded px-3 py-2 w-full"
                        {...field}
                        onChange={(event) => {
                          const name = (event.target.value || "")
                          field.onChange(name)
                          handleFieldChange(field.name, name);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {ownerType?.includes?.("individual") && (
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          id="nameInput"
                          type="text"
                          placeholder="Type last name here"
                          className="border rounded px-3 py-2 w-full"
                          {...field}
                          onChange={(event) => {
                            const name = (event.target.value || "");
                            field.onChange(name)
                            handleFieldChange(field.name, name);
                          }}
                          maxLength={50}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Tooltip delayDuration={1000}>
                <TooltipTrigger asChild >
                  <Button
                    className='mt-5'
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      form.resetField("firstName");
                      form.resetField("lastName");
                      form.resetField("codeName");
                      handleFieldChange("firstName", "");
                      handleFieldChange("lastName", "");
                    }}
                  >
                    <Brush />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Clear</TooltipContent>
              </Tooltip>
            </div>
            <div className='flex-1 flex flex-col gap-2'>
              <div className='flex flex-col items-center md:flex-row gap-2 flex-wrap'>
                <div className="w-full flex-1">
                  <Code className='break-words'>{codeName || "Loading..."}</Code>
                </div>
                <div className="w-full md:w-auto">
                  {isLoading ? <Loading className="w-full md:w-1/2 min-w-[106px]" loadingText /> : (
                    <CopyButton
                      className="w-full md:w-1/2 md:min-w-[106px]"
                      copyContent={{ content: codeName, contentType: "text/plain" }}
                      disabled={codeName ? false : true}
                    />
                  )}
                </div>
              </div>
            </div>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}

async function generateThaiCodeName(
  payload: {
    firstName: string;
    lastName?: string;
    ownerType: string;
  }
): Promise<string> {
  return new Promise((resolve) => {
    const { ownerType, firstName = "", lastName = "" } = payload;

    if (ownerType === "individual") {
      const name_alphabet = getThaiAlphabet(firstName);
      let name_code = name_alphabet.split('').shift();
      if (name_code) {
        const name_alphabet_list = name_alphabet.slice(1, 4);
        for (let i = 0; i < 3; i++) {
          if (name_alphabet_list[i]) {
            name_code =
              name_code + getNumberOfAlphabet(name_alphabet_list[i]);
          } else {
            name_code = name_code + '0';
          }
        }

        const last_alphabet = getThaiAlphabet(lastName);
        let last_code = '';
        const last_alphabet_list = last_alphabet.slice(0, 4);
        for (let i = 0; i < 4; i++) {
          if (last_alphabet_list[i]) {
            last_code =
              last_code + getNumberOfAlphabet(last_alphabet_list[i]);
          } else {
            last_code = last_code + '0';
          }
        }

        resolve(`${name_code}/${last_code}`);
      } else {
        resolve(`0000/0000`);
      }
    } else if (ownerType == 'limited_company') {
      resolve('ธ บ ' + firstName);
    } else if (ownerType == 'partnership') {
      resolve('ธ ห ' + firstName);
    } else if (ownerType == 'state_enterprise') {
      resolve('ร ฐ ' + firstName);
    } else if (ownerType == "government") {
      resolve('ร ก ' + firstName);
    } else if (ownerType == "association") {
      resolve('ส.ค. ' + firstName);
    } else if (ownerType == "foundation") {
      resolve('ม.น. ' + firstName);
    } else if (ownerType == "temple") {
      resolve('ศ.น. ' + firstName);
    } else if (ownerType == "other") {
      resolve('น.อ. ' + firstName);
    } else {
      resolve(firstName);
    }
  })
}


function getThaiAlphabet(inputString: string): string {
  const thaiAlphabetRegex = /[\u0E01-\u0E2E]+/g;
  const matches: string[] | null = inputString.match(thaiAlphabetRegex);
  if (matches) {
    return matches.join('');
  } else {
    return '';
  }
}

function getNumberOfAlphabet(alphabet: string): string {
  if ('กขคฆง'.includes(alphabet)) {
    return '1';
  } else if ('จฉชซฌ'.includes(alphabet)) {
    return '2';
  } else if ('ญฎฏฐฑ'.includes(alphabet)) {
    return '3';
  } else if ('ฒณดตถ'.includes(alphabet)) {
    return '4';
  } else if ('ทธนบป'.includes(alphabet)) {
    return '5';
  } else if ('ผฝพฟภ'.includes(alphabet)) {
    return '6';
  } else if ('มยรลว'.includes(alphabet)) {
    return '7';
  } else if ('ศษสห'.includes(alphabet)) {
    return '8';
  } else if ('ฬอฮฤ'.includes(alphabet)) {
    return '9';
  } else {
    return '0';
  }
}

function cleanThaiName(name: string): string {
  return name.trim()
}