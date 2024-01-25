"use client"

import React from "react"
import { Minus, Plus, PlusSquare } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { useDialog } from "@/lib/useDialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { OptionArea } from "../ObjectiveFunction/ConfigureObjectiveFunction"

export type AddConstraintProps = {}

const schema = z.object({
  leftHandSide: z.array(
    z.object({
      coefficient: z.number(),
      decision_variable: z.object({
        value: z.string(),
        label: z.string(),
      }),
    })
  ),
  rightHandSide: z.number(),
  operator: z.enum([">", "<", ">=", "<=", "="]),
  tempCoefficient: z.number().optional(),
  tempDecisionVariable: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
})

type FormInputs = z.infer<typeof schema>

export const AddConstraint: React.FC<AddConstraintProps> = () => {
  const { open, close, isOpen, setIsOpen } = useDialog()

  const methods = useForm<FormInputs>()

  const { control } = methods

  const { fields, append } = useFieldArray<FormInputs>({
    name: "leftHandSide",
    control,
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={open}>Add Constraint</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...methods}>
          <DialogHeader>
            <DialogTitle>Add Constraint</DialogTitle>
            <DialogDescription>
              Formulate your constraint, step by step
            </DialogDescription>
          </DialogHeader>
          <OptionArea>
            <Popover modal>
              <PopoverTrigger asChild>
                <Button size="sm" variant="ghost">
                  <PlusSquare className="mr-2 h-4 w-4" />
                  Add Step
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-4">
                <FormField
                  name="tempCoefficient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coefficient</FormLabel>
                      <Input {...field} type="number" min={0} />
                      <FormMessage />
                    </FormItem>
                  )}
                  control={control}
                />
                <FormField
                  name="tempDecisionVariable"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Decision Variable</FormLabel>
                      <Select>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hello">Hello</SelectItem>
                          <SelectItem value="hello2">Hello2</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                  control={control}
                />
              </PopoverContent>
            </Popover>
          </OptionArea>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
