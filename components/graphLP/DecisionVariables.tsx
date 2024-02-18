"use client"

import React from "react"
import { useForm, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

import { SolverCard } from "../common"
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
    <SolverCard title="1. Decision Variables" className={cn(className)}>
      <div className="flex gap-4">
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
    </SolverCard>
  )
}
