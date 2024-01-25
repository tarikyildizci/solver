import React from "react"

import { Constraints } from "@/components/graphLP/Constraints"
import { DecisionVariables } from "@/components/graphLP/DecisionVariables"
import { Graph } from "@/components/graphLP/Graph"
import { ObjectiveFunction } from "@/components/graphLP/ObjectiveFunction"
import { Provider } from "@/components/graphLP/Provider"

const Page: React.FC = () => {
  return (
    // <section className="grow grid xl:grid-cols-[2fr_1fr] md:grid-cols-2 sm:grid-cols-1">
    //   <Provider>
    //     <div className="grid xl:grid-cols-2 md:grid-cols-1">
    //       <div className="flex h-full flex-col">
    //         <DecisionVariables className="border-b" />
    //         <ObjectiveFunction />
    //       </div>
    //       <div className="xl:border-l xl:border-t-0 border-t">
    //         <Constraints />
    //       </div>
    //     </div>
    //     <div className="md:border-l md:border-t-0 border-t">
    //       <Graph />
    //     </div>
    //   </Provider>
    // </section>
    <Provider>
      <div className=" grid md:grid-cols-2 xs:grid-cols-1 gap-8 p-8">
        <div className="md:col-span-2 space-y-2">
          <h1 className="text-3xl font-semibold ">Graphical Solver</h1>
          <p className="text-sm text-muted-foreground">
            Enter the objective function and constraints for two varables named
            x and y, and click see results.
          </p>
        </div>
        <DecisionVariables />
        <ObjectiveFunction />
        <Constraints />
        <Graph />
      </div>
    </Provider>
  )
}

export default Page
