"use client"

import React, { useEffect, useRef, useState } from "react"

import { Checkbox } from "../ui/checkbox"
import { FunctionPlot } from "./Functions"

export type GraphProps = {}

export const Graph: React.FC<GraphProps> = () => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setElementSize({ width, height })
    })
    if (elementRef.current != null) {
      resizeObserver.observe(elementRef.current)

      return () => {
        elementRef.current != null &&
          resizeObserver.unobserve(elementRef.current)
      }
    }
  }, [])
  return (
    <section className="md:col-span-2 p-4 flex flex-col gap-2 rounded-md border shadow-sm">
      <h1 className="text-xl font-semibold">Graph</h1>
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
            xAxis: {
              label: "x-axis",
            },
            yAxis: {
              label: "y-axis",
            },
            data: [
              {
                fn: "4x - 5",
                closed: true,
              },
              {
                fn: "x + 2",
                closed: true,
              },
              {
                fn: "2 - x",
                fnType: "implicit",
                closed: true,
              },
              // {
              //   fn: "x = 3 + 0/y",
              //   closed: true,
              // },
              // {
              //   fn: "y = x^5",
              //   closed: true,
              // },
            ],
          }}
        />
      </div>
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
      <p>Y: 14</p>
    </section>
  )
}
