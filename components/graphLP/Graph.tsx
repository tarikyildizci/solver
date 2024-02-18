"use client"

import React, { useEffect, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"

import { getConstraintFunction } from "@/lib/graph"

import { SolverCard } from "../common"
import { Checkbox } from "../ui/checkbox"
import { FunctionPlot } from "./Functions"
import { FormInputs, useAnswer } from "./Provider"

export type GraphProps = {
  className?: string
}

export const Graph: React.FC<GraphProps> = ({ className }) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const elementSize = useResizeObserver(elementRef)
  const answer = useAnswer()
  const { watch } = useFormContext<FormInputs>()
  const { constraints } = watch()

  const graphData = [
    ...constraints,
    {
      x: "1",
      y: "0",
      operator: ">=" as any,
      rhs: "0",
    },
    {
      x: "0",
      y: "1",
      operator: ">=",
      rhs: "0",
    },
  ].map((constraint) => getConstraintFunction(constraint))

  return (
    <SolverCard
      className={className}
      title="Graph"
      titleExtra={`X: ${answer.optimalXValue} | Y: ${answer.optimalYValue}`}
    >
      <div
        className="w-auto aspect-[16/9] bg-muted rounded-md"
        id="graph-parent"
        ref={elementRef}
      >
        <FunctionPlot
          options={{
            target: "#graph-parent",
            height: elementSize.height ?? 200,
            width: elementSize.width ?? 300,
            grid: true,
            disableZoom: true,

            xAxis: {
              label: "x-axis",
              domain: [-1, 10],
            },
            yAxis: {
              label: "y-axis",
              domain: [-1, 10],
            },
            annotations: [
              {
                x: 6,
                text: "x = 6",
              },
              {
                y: 0,
                text: "y = 0",
              },
              {
                x: 0,
                text: "x = 0",
              },
            ],
            data: [
              ...graphData,
              ...(answer && answer.optimalXValue != null
                ? [
                    {
                      graphType: "text",
                      location: [answer.optimalXValue, answer.optimalYValue],
                      text: `(${answer.optimalXValue},${answer.optimalYValue})`,
                      color: "black",
                      attr: {
                        "font-size": "14px",
                      },
                    },
                    {
                      points: [[answer.optimalXValue, answer.optimalYValue]],
                      graphType: "scatter",
                      fnType: "points",
                      color: "purple",
                      closed: true,
                      attr: {
                        r: 5,
                      },
                    },
                  ]
                : []),
            ] as any,
            // [
            // {
            //   graphType: "text",
            //   location: [5, 3],
            //   text: "(5,3)",
            //   color: "black",
            //   attr: {
            //     "font-size": "16px",
            //   },
            // },
            // {
            //   fn: "6 - x",
            //   fnType: "implicit",
            // },
            // {
            //   fn: "0 - x",
            //   fnType: "implicit",
            // },
            // {
            //   fn: "0",
            // },
            // {
            //   fn: "(19 - 2x) / 3",
            // },
            // {
            //   fn: "8 - x",
            // },
            // {
            //   points: [
            //     [0, 6.33],
            //     [5, 3],
            //     [6, 2],
            //     [6, 0],
            //     [0, 0],
            //   ],
            //   graphType: "scatter",
            //   fnType: "points",
            //   color: "red",
            //   attr: {
            //     r: 5,
            //   },
            // },
            // {
            //   points: [
            //     [0, 6.33],
            //     [5, 3],
            //     [6, 2],
            //     [6, 0],
            //     [0, 0],
            //   ],
            //   graphType: "polyline",
            //   fnType: "points",
            //   color: "purple",
            //   closed: true,
            // },
            // ],
          }}
        />
      </div>
      {/*
      <div className="w-full border-b" />
       <div className="grid grid-cols-2 p-4 border rounded-md bg-muted shadow-sm">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={true} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Basic Variables
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={true} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Area
          </label>
        </div>
      </div>
      <div className="w-full border-b" />
      <h3 className="text-md font-semibold">Optimal Solution</h3>
      <p>X: 14</p>
      <p>Y: 14</p> */}
    </SolverCard>
  )
}

const useResizeObserver = (ref: React.RefObject<HTMLDivElement>) => {
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setElementSize({ width, height })
    })
    if (ref.current != null) {
      resizeObserver.observe(ref.current)

      return () => {
        ref.current != null && resizeObserver.unobserve(ref.current)
      }
    }
  }, [ref])

  return elementSize
}
