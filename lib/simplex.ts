export const simplex = (
  objectiveFunction: ObjectiveFunction,
  constraints: Constraints,
  rhs: RHS
) => {
  const basicFeasibleSolutions: number[] = []

  const standardObjectiveFunction =
    convertObjectiveFunctionToStandardForm(objectiveFunction)

  const matrix = createMatrix(standardObjectiveFunction, constraints, rhs)

  let numberOfTrialsBeforeEnding = 1000
  while (
    !isBasicFeasibleSolutionOptimal(matrix) &&
    numberOfTrialsBeforeEnding > 0
  ) {
    // get entering variable column
    const enteringVariableColumn = getEnteringVariable(matrix)
    // get exit variable row
    const exitVariableRow = getExitVariable(matrix, enteringVariableColumn)
    // update matrix
    pivot(matrix, exitVariableRow, enteringVariableColumn)
    basicFeasibleSolutions.push(matrix[0][matrix[0].length - 1])
    numberOfTrialsBeforeEnding--
  }
  return matrix
}

const getEnteringVariable = (matrix: number[][]) => {
  const firstRow = matrix[0]

  return firstRow.indexOf(Math.min(...firstRow))
}

const getExitVariable = (
  matrix: number[][],
  enteringVariableColumnIndex: number
) => {
  const rhsColumn = matrix.map((row) => row[row.length - 1])
  const enteringVariableColumn = matrix.map(
    (row) => row[enteringVariableColumnIndex]
  )
  const ratios = rhsColumn.map((rhs, index) => {
    if (index === 0) return Infinity
    if (enteringVariableColumn[index] < 0) return Infinity
    return rhs / enteringVariableColumn[index]
  })

  return ratios.indexOf(Math.min(...ratios))
}

const pivot = (matrix: number[][], pivotRow: number, pivotColumn: number) => {
  const pivotValue = matrix[pivotRow][pivotColumn]

  // ero 1 - divide pivot row by pivot value
  matrix[pivotRow] = matrix[pivotRow].map(
    (coefficient) => coefficient / pivotValue
  )

  const newPivotRow = matrix[pivotRow]

  // rest of ero's - create zero coefficients in pivot column for all other rows
  matrix.forEach((row, index) => {
    if (index !== pivotRow) {
      const pivotColumnCoefficient = row[pivotColumn]
      if (pivotColumnCoefficient === 0) return

      matrix[index] = row.map(
        (coefficient, index) =>
          coefficient - pivotColumnCoefficient * newPivotRow[index]
      )
    }
  })

  return matrix
}

const convertObjectiveFunctionToStandardForm = (
  objectiveFunction: ObjectiveFunction
) => {
  return objectiveFunction.map((coefficient) => coefficient * -1)
}

const createMatrix = (
  objectiveFunction: ObjectiveFunction,
  constraints: Constraints,
  rhs: RHS
) => {
  const matrix: number[][] = []
  const Z = 0
  const numberOfSlackVariables = constraints.length

  // add row 0
  matrix[0] = [
    ...objectiveFunction,
    ...Array(numberOfSlackVariables).fill(0),
    Z,
  ]

  // add constraint rows
  constraints.forEach((constraint, index) => {
    const slackVariables = Array(numberOfSlackVariables).fill(0)
    slackVariables[index] = 1

    matrix.push([...constraint, ...slackVariables, rhs[index]])
  })

  return matrix
}

const isBasicFeasibleSolutionOptimal = (matrix: number[][]) => {
  const firstRow = matrix[0]

  return firstRow.every((coefficient) => coefficient >= 0)
}

type ObjectiveFunction = number[]
type Constraints = number[][]
type RHS = number[]

const objectiveFunction: ObjectiveFunction = [60, 30, 20]
const constraints: Constraints = [
  [8, 6, 1],
  [4, 2, 1.5],
  [2, 1.5, 0.5],
  [0, 1, 0],
]
const rhs: RHS = [48, 20, 8, 5]
