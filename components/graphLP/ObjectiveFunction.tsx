"use client"

import React, { useState } from "react"
import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"
import { FormInputs } from "./Provider"

export type ObjectiveFunctionProps = {}

export const ObjectiveFunction: React.FC<ObjectiveFunctionProps> = () => {
  const { control, setValue, watch } = useFormContext<FormInputs>()

  const parsedTerms = watch("objectiveFunction.items")

  const onObjectiveRawValueChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value

    setValue("objectiveFunction.raw", e.target.value)

    const terms = value?.replace(/\s/g, "").split(/(?=[+\-*/])/)

    const parsedTerms = terms?.map((term) => {
      const [coefficient, variable] = term.split(/(?=[xy])/)
      return {
        coefficient: parseFloat(coefficient),
        variable:
          variable as FormInputs["objectiveFunction"]["items"][0]["variable"],
      }
    })

    setValue("objectiveFunction.items", parsedTerms)
  }

  return (
    <section className="p-4 flex flex-col gap-2 border rounded-md shadow-sm">
      <h1 className={cn("text-xl font-semibold")}>Objective Function</h1>
      <FormField
        render={({ field: { onChange, value, ...rest } }) => (
          <FormItem>
            <FormControl>
              <Textarea
                {...rest}
                value={value ?? ""}
                onChange={onObjectiveRawValueChange}
                className="resize-none placeholder:italic"
                placeholder="4x - 6y + 6"
              />
            </FormControl>
            <FormDescription>
              Write your objective function in the following format: 4x - 6y +
              6. <i>x</i> is the first variable and <i>y</i> is the second
              variable. You can use the plus (+) and minus (-) operators.
            </FormDescription>
          </FormItem>
        )}
        name="objectiveFunction.raw"
        control={control}
      />
      <div className="flex gap-2 flex-wrap">
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-fit gap-2 py-1 h-fit text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maximize">Maximize</SelectItem>
                    <SelectItem value="minimize">Minimize</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
          name="objectiveFunction.direction"
          control={control}
        />
        {parsedTerms?.map(
          (term) =>
            !isNaN(term.coefficient) && (
              <div className="border bg-muted px-2 py-1 h-fit flex items-center rounded-md text-sm">
                {term.coefficient > 0
                  ? "+" + term.coefficient
                  : term.coefficient}
                {term.variable}
              </div>
            )
        )}
      </div>
    </section>
  )
}
