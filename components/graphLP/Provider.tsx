"use client"

import React, { PropsWithChildren, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { getConstraintFunction } from "@/lib/graph"
import { simplex } from "@/lib/simplex"

import { Form } from "../ui/form"

export type ProviderProps = {}

const schema = z.object({
  xName: z.string(),
  yName: z.string(),
  xPositive: z.boolean(),
  yPositive: z.boolean(),
  constraints: z.array(
    z.object({
      x: z.string(),
      y: z.string(),
      operator: z.enum(["=", ">=", "<="]),
      rhs: z.string(),
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
  const [state, setState] = useState<{
    optimalXValue: number | undefined
    optimalYValue: number | undefined
    optimalValue: number | undefined
  }>({
    optimalXValue: undefined,
    optimalYValue: undefined,
    optimalValue: undefined,
  })

  const methods = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      xName: "x",
      yName: "y",
      xPositive: true,
      yPositive: true,
      objectiveFunction: {
        direction: "maximize",
        items: [
          { coefficient: 5, variable: "x" },
          { coefficient: 7, variable: "y" },
        ],
        raw: "5x + 7y",
      },
      constraints: [
        {
          x: "1",
          y: "0",
          operator: "<=",
          rhs: "6",
        },
        {
          x: "2",
          y: "3",
          operator: "<=",
          rhs: "19",
        },
        {
          x: "1",
          y: "1",
          operator: "<=",
          rhs: "8",
        },
      ],
    },
  })

  const onSubmit = (data: FormInputs) => {
    const objectiveFunction = data.objectiveFunction.items.flatMap((item) =>
      data.objectiveFunction.direction === "maximize"
        ? item.coefficient
        : -1 * item.coefficient
    )

    const constraints = data.constraints.map((constraint) => [
      constraint.operator === "<=" ? +constraint.x : -1 * +constraint.x,
      constraint.operator === "<=" ? +constraint.y : -1 * +constraint.y,
    ])

    // non-negative constraints
    constraints.push([-1, 0], [0, -1])

    const rhs = data.constraints.map((constraint) => +constraint.rhs)

    //non-negative rhs
    rhs.push(0, 0)

    const solution = simplex(objectiveFunction, constraints, rhs)

    console.table(solution)

    setState({
      optimalXValue: solution[solution.length - 2][solution[0].length - 1],
      optimalYValue: solution[solution.length - 1][solution[0].length - 1],
      optimalValue: solution[0][solution[0].length - 1],
    })
  }

  return (
    <Form {...methods}>
      <answerContext.Provider value={state}>
        <form className="grow" onSubmit={methods.handleSubmit(onSubmit)}>
          {children}
        </form>
      </answerContext.Provider>
    </Form>
  )
}

const answerContext = React.createContext<{
  optimalXValue: number | undefined
  optimalYValue: number | undefined
  optimalValue: number | undefined
}>({
  optimalXValue: undefined,
  optimalYValue: undefined,
  optimalValue: undefined,
})

export const useAnswer = () => React.useContext(answerContext)
