"use client"

import React from "react"
import { useForm, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Checkbox } from "../ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { FormInputs } from "./Provider"

export type DecisionVariablesProps = { className?: string }

export const DecisionVariables: React.FC<DecisionVariablesProps> = ({
  className,
}) => {
  const { control } = useFormContext<FormInputs>()
  return (
    <section
      className={cn(
        "p-4 flex flex-col gap-2 border rounded-md shadow-sm",
        className
      )}
    >
      <h1 className="text-xl font-semibold">Decision Variables</h1>
      <div className="flex flex-wrap gap-2 w-full">
        <FormField
          name="xName"
          control={control}
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>First Variable</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Your variable name like <i>Potatoes</i>
              </FormDescription>
            </FormItem>
          )}
        />
        {/* <FormField
        name="xPositive"
        control={control}
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormControl>
              <div className="flex items-center space-x-2">
                <Checkbox
                  {...field}
                  checked={value}
                  onCheckedChange={onChange}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  X must be positive
                </label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}

        <FormField
          name="yName"
          control={control}
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Second Variable</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Your variable name like <i>Onions</i>
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </section>
  )
}
