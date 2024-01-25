export type ObjectiveFunctionType = "minimize" | "maximize"
export type DecisionVariableType = {
  id: string
  name: string
  description: string
}

export type ConstraintOperatorType = ">=" | "<="

export type OperatorType = "plus" | "minus"

export type ObjectiveFunctionPartType = {
  id: string
  type: "decision-variable" | "constant" | "operator"
  constant: number
  coefficient: number
  decisionVariable: DecisionVariableType
  operator: OperatorType
}

export type LeftHandSideType = {
  id: string
  decisionVariable: DecisionVariableType
  coefficient: number
  operator: OperatorType
}

export type ConstraintType = {
  id: string
  leftHandSide: Array<LeftHandSideType>
  rightHandSide: number
  operator: ConstraintOperatorType
}

export type SolverInputs = {
  decisionVariables: Array<DecisionVariableType>
  objectiveFunction: {
    functionType: ObjectiveFunctionType
    functionParts: Array<ObjectiveFunctionPartType>
  }
  constraints: Array<ConstraintType>
}
