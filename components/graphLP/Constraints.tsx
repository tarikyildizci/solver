"use client"

import React from "react"
import { PlusCircle } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { FormInputs } from "./Provider"

export type ConstraintsProps = {
  className?: string
}

export const Constraints: React.FC<ConstraintsProps> = ({ className }) => {
  const { control, watch } = useFormContext<FormInputs>()

  const watchXName = watch("xName") ?? "X"
  const watchYName = watch("yName") ?? "Y"

  const { fields: constraints, append } = useFieldArray({
    name: "constraints",
    control,
  })

  return (
    <section
      className={cn(
        "md:col-span-2 p-4 flex flex-col gap-2 border rounded-md shadow-sm",
        className
      )}
    >
      <h1 className="text-xl font-semibold">Constraints</h1>
      <div className="flex flex-col border rounded-md overflow-hidden">
        <div className="grid grid-cols-4 border-b font-semibold">
          <div className="border-r px-4 py-2">{watchXName}</div>
          <div className="border-r px-4 py-2">{watchYName}</div>
          <div className="border-r px-4 py-2">Operator</div>
          <div className="px-4 py-2">RHS</div>
        </div>
        {constraints.length === 0 && (
          <div className="w-full flex items-center border-b px-8 py-8">
            No constraints added.
          </div>
        )}
        {constraints.map((constraint, index) => (
          <Row key={constraint.id} {...constraint} index={index} />
        ))}
        <Button
          variant={"secondary"}
          className="rounded-none border-0 border-b last:border-b-0"
          onClick={() => {
            append({ x: 20, y: 43, operator: "<=", rhs: 12 })
          }}
        >
          <PlusCircle className="h-4 w-4 mr-4 text-foreground" />
          <p>Add Constraint</p>
        </Button>
      </div>
    </section>
  )
}

const Row: React.FC<{
  x: number
  y: number
  operator: FormInputs["constraints"][0]["operator"]
  rhs: number
  index: number
}> = ({ operator, rhs, x, y, index }) => {
  const { control, watch, register } = useFormContext<FormInputs>()

  return (
    <div className="grid grid-cols-4 border-b last:border-b-0">
      <input
        className="clear border-r px-4 py-2"
        {...register(`constraints.${index}.x`)}
      />
      <input
        className="clear border-r px-4 py-2"
        {...register(`constraints.${index}.y`)}
      />
      <select
        className="clear border-r px-4 py-2"
        {...register(`constraints.${index}.operator`)}
      >
        <option value="<=">{"<="}</option>
        <option value=">=">{">="}</option>
      </select>
      <input
        className="clear  px-4 py-2"
        {...register(`constraints.${index}.rhs`)}
      />
    </div>
  )
}
