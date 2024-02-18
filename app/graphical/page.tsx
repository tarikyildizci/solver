"use client"

import React, { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CalculateButton } from "@/components/graphLP/CalculateButton"
import { Constraints } from "@/components/graphLP/Constraints"
import { DecisionVariables } from "@/components/graphLP/DecisionVariables"
import { Graph } from "@/components/graphLP/Graph"
import { ObjectiveFunction } from "@/components/graphLP/ObjectiveFunction"
import { Provider } from "@/components/graphLP/Provider"

const Page: React.FC = () => {
  return (
    <Provider>
      <div className="flex flex-col grow">
        <div className="flex justify-between items-center p-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Graphical Solver</h1>
            <p className="text-sm text-muted-foreground ">
              {/* max-w-xl */}
              Enter the objective function and constraints for two variables
              named x and y, and click `Calculate` button to see the results.
            </p>
          </div>
          <Button>Calculate</Button>
        </div>
        <div className="flex grow border">
          <div id="config" className="shrink-0 flex flex-col border-r">
            <ObjectiveFunction className="max-w-lg border-b" />
            <Constraints className="max-w-lg" />
          </div>
          <Graph className="md:col-span-2" />
        </div>
      </div>
    </Provider>
  )
}

export default Page
