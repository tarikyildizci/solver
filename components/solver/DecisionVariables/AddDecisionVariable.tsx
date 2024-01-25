import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useDialog } from "@/lib/useDialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
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

export type AddDecisionVariableProps = {
  onSubmit: (decVar: FormInputs) => void
}

export const decisionVariableSchema = z.object({
  name: z.string(),
  description: z.string(),
})

type FormInputs = z.infer<typeof decisionVariableSchema>

export const AddDecisionVariable: React.FC<AddDecisionVariableProps> = ({
  onSubmit: propOnSubmit,
}) => {
  const { isOpen, close, open, setIsOpen } = useDialog()

  const methods = useForm<FormInputs>({
    resolver: zodResolver(decisionVariableSchema),
  })
  const { control, handleSubmit } = methods

  const onSubmit = (data: FormInputs) => {
    propOnSubmit(data)
    close()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="w-fit">
        <Button onClick={open}>Add Decision Variable</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Decision Variable</DialogTitle>
        </DialogHeader>
        <Form {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="x1"
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="x1 amount to produce"
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add Variable</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
