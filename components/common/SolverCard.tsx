import React, { PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

export type SolverCardProps = {
  title: string
  titleExtra?: React.ReactNode
  className?: React.HTMLAttributes<HTMLElement>["className"]
}

export const SolverCard: React.FC<PropsWithChildren<SolverCardProps>> = ({
  title,
  titleExtra,
  className,
  children,
}) => {
  return (
    <section className={cn("p-6 flex flex-col gap-2 w-full", className)}>
      <div className="flex justify-between gap-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        {titleExtra}
      </div>
      {children}
    </section>
  )
}
