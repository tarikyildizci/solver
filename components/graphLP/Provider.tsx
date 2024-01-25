"use client"

import React, { PropsWithChildren } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "../ui/form"

export type ProviderProps = {}

const schema = z.object({
  xName: z.string(),
  yName: z.string(),
  xPositive: z.boolean(),
  yPositive: z.boolean(),
  constraints: z.array(
    z.object({
      x: z.number(),
      y: z.number(),
      operator: z.enum(["=", ">=", "<="]),
      rhs: z.number(),
    })
  ),
  objectiveFunction: z.object({
    direction: z.enum(["minimize", "maximize"]),
    raw: z.string(),
    items: z.array(
      z.object({
        coefficient: z.number(),
        variable: z.enum(["x", "y"]),
      })
    ),
  }),
})

export type FormInputs = z.infer<typeof schema>

export const Provider: React.FC<PropsWithChildren<ProviderProps>> = ({
  children,
}) => {
  const methods = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      xName: "x",
      yName: "y",
      xPositive: true,
      yPositive: true,
      objectiveFunction: {
        direction: "maximize",
      },
    },
  })
  return <Form {...methods}>{children}</Form>
}
