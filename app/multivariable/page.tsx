"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Constraints,
  DecisionVariables,
  ObjectiveFunction,
} from "@/components/solver"
import { decisionVariableSchema } from "@/components/solver/DecisionVariables/AddDecisionVariable"
import {
  ObjectiveFunctionConfig,
  objectiveFunctionConfigSchema,
} from "@/components/solver/ObjectiveFunction/ConfigureObjectiveFunction"

const schema = z.object({
  decisionVariables: z.array(decisionVariableSchema).optional(),
  objectiveFunction: objectiveFunctionConfigSchema.optional(),
  constraints: z.string(),
})
type FormInputs = z.infer<typeof schema>

const Page: React.FC = () => {
  const methods = useForm<FormInputs>()

  const { watch, setValue } = methods

  const setObjectiveFunctionConfig = (config: ObjectiveFunctionConfig) => {
    setValue("objectiveFunction", config)
  }

  return (
    <section className="container grid grid-cols-2  gap-6 pb-8 pt-6 md:py-10">
      {/* <DecisionVariables />
      <ObjectiveFunction
        objectiveFunctionConfig={watch("objectiveFunction")}
        setObjectiveFunctionConfig={setObjectiveFunctionConfig}
      />
      <Constraints /> */}
      This page is still a work in progress.
    </section>
  )
}

export default Page
