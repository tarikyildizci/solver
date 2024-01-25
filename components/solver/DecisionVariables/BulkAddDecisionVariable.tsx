"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useDialog } from "@/lib/useDialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

export type BulkAddDecisionVariableProps = {
  onSubmit: (data: BulkAddFormInputs) => void
}

const schema = z.object({
  count: z.number().min(1),
  prefix: z.string().nonempty("Enter at least one character"),
})

export type BulkAddFormInputs = z.infer<typeof schema>

export const BulkAddDecisionVariable: React.FC<
  BulkAddDecisionVariableProps
> = ({ onSubmit: propOnSubmit }) => {
  const { isOpen, close, open, setIsOpen } = useDialog()

  const methods = useForm<BulkAddFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      prefix: "x",
    },
  })

  const { control, handleSubmit, watch } = methods

  const onSubmit = (data: BulkAddFormInputs) => {
    propOnSubmit(data)
    close()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={open}>
          Bulk Add Variables
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Bulk Add Decision Variables</DialogTitle>
          <DialogDescription>
            Choose how many variables you want to have, and the system will auto
            name them with the following configuration
          </DialogDescription>
        </DialogHeader>
        <Form {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={control}
              name="count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Variables</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="How many variables do you need?"
                      type="number"
                      min={0}
                      onChange={(e) =>
                        field.onChange(Math.abs(+e.target.value))
                      }
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="prefix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prefix</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value ?? ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h3 className="text-md font-semibold leading-none tracking-tight">
              Preview
            </h3>
            {watch("prefix") || "?"}1 - {watch("prefix") || "?"}1 amount to
            produce
            <DialogFooter>
              <Button type="submit">Add Variables</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
