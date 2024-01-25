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

import { AddConstraint } from "./AddConstraint"

export type ConstraintsProps = {}

export const Constraints: React.FC<ConstraintsProps> = ({}) => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Constraints</CardTitle>
        <CardDescription>Add your constraints</CardDescription>
      </CardHeader>
      <CardContent>
        <AddConstraint />
      </CardContent>
    </Card>
  )
}
