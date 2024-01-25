"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  AddDecisionVariable,
  decisionVariableSchema,
} from "./AddDecisionVariable"
import {
  BulkAddDecisionVariable,
  BulkAddFormInputs,
} from "./BulkAddDecisionVariable"
import { DataTableDemo } from "./DecisionVariablesTable"

function generateUniqueString(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let uniqueString = ""

  for (let i = 0; i < 5; i++) {
    const randomChar = chars.charAt(Math.floor(Math.random() * chars.length))
    uniqueString += randomChar
  }

  return uniqueString
}

export type DecisionVariablesProps = {}

const schema = z.object({
  decisionVariables: z.array(decisionVariableSchema),
})

export type DecisionVariableFormInputs = z.infer<typeof schema>
type DecisionVariableType = z.infer<typeof decisionVariableSchema>

export const DecisionVariables: React.FC<DecisionVariablesProps> = () => {
  const methods = useForm<DecisionVariableFormInputs>({
    resolver: zodResolver(schema),
  })

  const { control } = methods

  const { fields, prepend } = useFieldArray<DecisionVariableFormInputs>({
    control,
    name: "decisionVariables",
  })

  const isNameUnique = (name: string) => {
    return !fields.find(({ name: fieldName }) => name === fieldName)
  }

  const addDecisionVariable = (decVar: DecisionVariableType) => {
    if (isNameUnique(decVar.name)) {
      prepend(decVar)
    } else {
      // although they have unique id's,
      // names are kept unique to prevent confusion
      addDecisionVariable({
        ...decVar,
        name: `${decVar.name}_${generateUniqueString()}`,
      })
    }
  }

  const onAddBulk = (config: BulkAddFormInputs) => {
    const { count, prefix } = config

    for (let index = 0; index < count; index++) {
      const name = `${prefix}${index}`
      addDecisionVariable({
        name,
        description: `${name} amount to produce`,
      })
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            Decision Variables {fields.length ? `- ${fields.length}` : null}
          </CardTitle>
          <CardDescription>
            Add your decision variables and their descriptions
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-4">
            <AddDecisionVariable onSubmit={addDecisionVariable} />
            <BulkAddDecisionVariable onSubmit={onAddBulk} />
          </div>

          <DataTableDemo data={fields} />
        </CardContent>
      </Card>
    </>
  )
}
