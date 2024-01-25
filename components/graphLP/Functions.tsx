"use client"

import React, { useEffect, useRef } from "react"
import functionPlot, { FunctionPlotOptions } from "function-plot"

export interface FunctionPlotProps {
  options?: FunctionPlotOptions
}

const FunctionPlot: React.FC<FunctionPlotProps> = React.memo(
  ({ options }) => {
    const rootEl = useRef(null)

    useEffect(() => {
      try {
        functionPlot(Object.assign({}, options, { target: rootEl.current }))
      } catch (e) {}
    })

    return <div ref={rootEl} />
  },
  () => false
)

FunctionPlot.displayName = "FunctionPlot"

export { FunctionPlot }
