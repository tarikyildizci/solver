"use client"

import React, { PropsWithChildren } from "react"
import { Delete, PlusCircle, Trash2 } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

import { SolverCard } from "../common"
import { Button } from "../ui/button"
import { FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { FormInputs } from "./Provider"

export type ConstraintsProps = {
  className?: string
}

export const Constraints: React.FC<ConstraintsProps> = ({ className }) => {
  const { control, watch } = useFormContext<FormInputs>()

  const watchXName = watch("xName") ?? "X"
  const watchYName = watch("yName") ?? "Y"

  const {
    fields: constraints,
    append,
    remove,
  } = useFieldArray({
    name: "constraints",
    control,
  })

  return (
    <SolverCard
      title={`Constraints (${constraints.length})`}
      className={cn(className)}
      titleExtra={
        <Button
          type="button"
          onClick={() => append({ x: "1", y: "1", operator: "<=", rhs: "1" })}
          size={"sm"}
          className="w-fit"
          variant={"outline"}
        >
          Add Constraint <PlusCircle className="h-4 w-4 mx-2" />
        </Button>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{watchXName}</TableHead>
            <TableHead>{watchYName}</TableHead>
            <TableHead>Operator</TableHead>
            <TableHead>RHS</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {constraints.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No constraints added.
              </TableCell>
            </TableRow>
          )}
          {constraints.map((constraint, index) => (
            <Row
              key={constraint.id}
              index={index}
              onRemove={() => remove(index)}
            />
          ))}
        </TableBody>
      </Table>
    </SolverCard>
  )
}

const Row: React.FC<{
  index: number
  onRemove: () => void
}> = ({ index, onRemove }) => {
  const { control, watch, register } = useFormContext<FormInputs>()

  return (
    <TableRow>
      <ConstraintCell>
        <Input type="number" {...register(`constraints.${index}.x`)} />
      </ConstraintCell>
      <ConstraintCell>
        <Input type="number" {...register(`constraints.${index}.y`)} />
      </ConstraintCell>
      <ConstraintCell>
        <FormField
          name={`constraints.${index}.operator`}
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(val) =>
                field.onChange({ target: { value: val } })
              }
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="<=">{"<="}</SelectItem>
                <SelectItem value=">=">{">="}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </ConstraintCell>
      <ConstraintCell>
        <Input type="number" {...register(`constraints.${index}.rhs`)} />
      </ConstraintCell>
      <ConstraintCell>
        <Button variant={"outline"} size={"icon"} onClick={onRemove}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </ConstraintCell>
    </TableRow>
  )
}

const ConstraintCell: React.FC<PropsWithChildren> = ({ children }) => {
  return <TableCell className="p-3">{children}</TableCell>
}
