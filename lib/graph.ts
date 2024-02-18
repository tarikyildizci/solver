import { FormInputs } from "@/components/graphLP/Provider"

export const getConstraintFunction = (
  constraint: FormInputs["constraints"][0]
) => {
  const { rhs, x, y } = constraint

  const constant = Number(rhs)
  const xCoefficient = Number(x)
  const yCoefficient = Number(y)

  if (yCoefficient === 0) {
    return {
      fn: `${constant / xCoefficient} - x`,
      fnType: "implicit",
    }
  }

  if (xCoefficient === 0) {
    return {
      fn: `${constant / yCoefficient}`,
    }
  }

  if (yCoefficient !== 0 && xCoefficient !== 0) {
    return {
      fn: `${constant / yCoefficient} - (${xCoefficient / yCoefficient})x`,
    }
  }
}
