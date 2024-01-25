"use client"

import React from "react"
import { Minus, Plus } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ConfigureObjectiveFunction,
  ObjectiveFunctionConfig,
} from "./ConfigureObjectiveFunction"

export type ObjectiveFunctionProps = {
  objectiveFunctionConfig?: ObjectiveFunctionConfig
  setObjectiveFunctionConfig: (config: ObjectiveFunctionConfig) => void
}

export const ObjectiveFunction: React.FC<ObjectiveFunctionProps> = ({
  objectiveFunctionConfig,
  setObjectiveFunctionConfig,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Objective Function</CardTitle>
        <CardDescription>Configure your objective function</CardDescription>
      </CardHeader>
      <CardContent>
        <ConfigureObjectiveFunction onSubmit={setObjectiveFunctionConfig} />
        <div className="flex gap-4 flex-wrap items-center">
          <p className="font-mono uppercase">
            {objectiveFunctionConfig?.functionType}
          </p>

          {objectiveFunctionConfig?.objectiveFunctionSteps?.map((config) => {
            switch (config.type) {
              case "constant":
                return <p className="font-mono">{config.constant}</p>

              case "decision-variable":
                return (
                  <p className="font-mono">
                    {config.coefficient}·{config.decision_variable.label}
                  </p>
                )
              case "operator":
                return (
                  <p className="font-mono">
                    {config.operator === "minus" ? <Minus /> : <Plus />}
                  </p>
                )
            }
          })}
        </div>
      </CardContent>
    </Card>
  )
}
