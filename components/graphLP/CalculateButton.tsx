"use client"

import React from "react"
import { useFormContext } from "react-hook-form"

import { Button } from "../ui/button"
import { FormInputs } from "./Provider"

export const CalculateButton: React.FC = () => {
  const {
    formState: { errors },
  } = useFormContext<FormInputs>()

  return (
    <>
      <Button type="submit">Calculate</Button>
      {errors && (
        <div className="text-red-500">
          Please fix the errors: {JSON.stringify(errors)}
        </div>
      )}
    </>
  )
}
