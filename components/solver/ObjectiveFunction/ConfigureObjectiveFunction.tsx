"use client"

import React, { PropsWithChildren } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  ArrowDownToLine,
  ArrowUpToLine,
  Divide,
  Minus,
  Plus,
  X,
} from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { useDialog } from "@/lib/useDialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const styles = {
  functionType: {
    card: "flex justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground",
    label: "block w-full p-2 text-center font-normal",
    checked: "[&:has([data-state=checked])>div]:border-primary",
  },
}

const options = [
  {
    value: "0",
    label: "x1",
  },
  {
    value: "1",
    label: "x2",
  },
  {
    value: "2",
    label: "x3",
  },
  {
    value: "3",
    label: "x4",
  },
]

const operatorSchema = z.object({
  type: z.literal("operator"),
  operator: z.enum(["plus", "minus"]),
})

const constantSchema = z.object({
  type: z.literal("constant"),
  constant: z.number(),
})

const decisionVariableSchema = z.object({
  type: z.literal("decision-variable"),
  coefficient: z.number(),
  decision_variable: z.object({
    value: z.string(),
    label: z.string(),
  }),
})

const addDecisionVariableSchema = z.object({
  coefficient: z.number().optional(),
  decisionVariable: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
})

const addConstantSchema = z.object({
  constant: z.number().optional(),
})

export const objectiveFunctionConfigSchema = z.object({
  objectiveFunctionSteps: z
    .array(
      z.discriminatedUnion("type", [
        decisionVariableSchema,
        constantSchema,
        operatorSchema,
      ])
    )
    .min(1, { message: "Objective Function cannot be empty" }),
  functionType: z.enum(["maximize", "minimize"]),
})

const schema = objectiveFunctionConfigSchema
  .merge(addDecisionVariableSchema)
  .merge(addConstantSchema)
  .superRefine((val, ctx) => {
    // coeff & dv dependancy
    if (val.coefficient != null && val.decisionVariable == null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select a decision variable",
        path: ["decisionVariable"],
      })
    } else if (val.coefficient == null && val.decisionVariable != null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a coefficient",
        path: ["coefficient"],
      })
    }
  })

type FormInputs = z.infer<typeof schema>

type OperatorType = z.infer<typeof operatorSchema>["operator"]

export type ObjectiveFunctionConfig = z.infer<
  typeof objectiveFunctionConfigSchema
>

export type ConfigureObjectiveFunctionProps = {
  onSubmit: (objectiveFunction: ObjectiveFunctionConfig) => void
}

export const ConfigureObjectiveFunction: React.FC<
  ConfigureObjectiveFunctionProps
> = ({ onSubmit: onPropSubmit }) => {
  const { isOpen, close, open, setIsOpen } = useDialog()

  const methods = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      functionType: "maximize",
    },
  })

  const {
    control,
    watch,
    setValue,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = methods

  const { fields, append } = useFieldArray({
    name: "objectiveFunctionSteps",
    control: control,
  })

  const watchConstant = watch("constant")
  const watchCoefficient = watch("coefficient")
  const watchDecisionVariable = watch("decisionVariable")

  const isOperatorDisabled =
    fields.length > 0
      ? watchCoefficient == null || watchDecisionVariable == null
      : false

  const handleAddDecisionVariable = () => {
    watchCoefficient != null &&
      watchDecisionVariable != null &&
      append({
        type: "decision-variable",
        coefficient: +watchCoefficient,
        decision_variable: watchDecisionVariable,
      })
    setValue("coefficient", undefined)
    setValue("decisionVariable", undefined)
    setFocus("coefficient")
  }

  const handleAddConstant = () => {
    watchConstant != null &&
      append({
        type: "constant",
        constant: +watchConstant,
      })
    setValue("constant", undefined)
  }

  const handleAddOperator = (operator: OperatorType) => {
    handleAddDecisionVariable()
    append({
      type: "operator",
      operator,
    })
  }

  const onSubmit = (data: FormInputs) => {
    const {
      functionType,
      objectiveFunctionSteps,
      coefficient,
      constant,
      decisionVariable,
    } = data
    const parsedSteps: ObjectiveFunctionConfig["objectiveFunctionSteps"] =
      data.objectiveFunctionSteps
    if (coefficient && decisionVariable) {
      parsedSteps.push({
        type: "decision-variable",
        coefficient,
        decision_variable: decisionVariable,
      })
    }
    if (constant) {
      parsedSteps.push({
        type: "constant",
        constant,
      })
    }

    const parsedData: ObjectiveFunctionConfig = {
      functionType,
      objectiveFunctionSteps: parsedSteps,
    }

    onPropSubmit(parsedData)
    close()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={open}>Configure</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[40vw]">
        <DialogHeader>
          <DialogTitle>Configure Objective Function</DialogTitle>
          <DialogDescription>
            Configure the details of your objective function, step by step
          </DialogDescription>
          {errors.objectiveFunctionSteps?.message && (
            <p className="text-sm font-medium text-destructive">
              {errors.objectiveFunctionSteps.message}
            </p>
          )}
        </DialogHeader>
        <Form {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={control}
              name="functionType"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Function Type</FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid max-w-md grid-cols-2 gap-8 pt-2"
                  >
                    <FormItem>
                      <FormLabel className={styles.functionType.checked}>
                        <FormControl>
                          <RadioGroupItem
                            value="maximize"
                            className="sr-only"
                          />
                        </FormControl>
                        <div className={styles.functionType.card}>
                          <ArrowUpToLine />
                        </div>
                        <span className={styles.functionType.label}>
                          Maximize
                        </span>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormLabel className={styles.functionType.checked}>
                        <FormControl>
                          <RadioGroupItem
                            value="minimize"
                            className="sr-only"
                          />
                        </FormControl>
                        <div className={styles.functionType.card}>
                          <ArrowDownToLine />
                        </div>
                        <span className={styles.functionType.label}>
                          Minimize
                        </span>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormItem>
              )}
            />
            <Tabs defaultValue="decision-variable">
              <TabsList>
                <TabsTrigger value="decision-variable">
                  Decision Variable
                </TabsTrigger>
                <TabsTrigger value="constant">Constant</TabsTrigger>
              </TabsList>
              <TabsContent value="decision-variable">
                <OptionArea data-testid="option-area--decision-variable">
                  <div className="flex flex-col gap-1 justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleAddOperator("plus")}
                      disabled={isOperatorDisabled}
                    >
                      <Plus />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleAddOperator("minus")}
                      disabled={isOperatorDisabled}
                    >
                      <Minus />
                    </Button>
                  </div>
                  <div className="flex gap-4">
                    <FormField
                      control={control}
                      name="coefficient"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Coefficient</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              min={0}
                              value={field.value ?? ""}
                              onChange={(e) =>
                                field.onChange(Math.abs(+e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="decisionVariable"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Variable</FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              value={field.value?.value ?? ""}
                              onValueChange={(val) => {
                                const option = options.find(
                                  ({ value }) => value === val
                                )
                                field.onChange(option)
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {options.map((option, i) => (
                                  <SelectItem key={i} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </OptionArea>
              </TabsContent>
              <TabsContent value="constant">
                <OptionArea data-testid="option-area--constant">
                  <FormField
                    control={control}
                    name="constant"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Constant</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            min={0}
                            value={field.value ?? ""}
                            type="number"
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-4 justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleAddOperator("plus")}
                      disabled={isOperatorDisabled}
                    >
                      <Plus />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleAddOperator("minus")}
                      disabled={isOperatorDisabled}
                    >
                      <Minus />
                    </Button>
                  </div>
                </OptionArea>
              </TabsContent>
            </Tabs>
            <OptionArea>
              <div className="flex flex-col gap-3">
                <h3 className="text-md font-semibold">Function Preview</h3>
                <div className="flex gap-4 items-center flex-wrap">
                  <p className="font-mono uppercase">{watch("functionType")}</p>
                  {fields.map((field, i) => (
                    <p key={i} className="font-mono">
                      {getValuesFromFunctionStep(field)}
                    </p>
                  ))}
                  <p className="font-mono">
                    {watchCoefficient}
                    {(watchCoefficient != null ||
                      watchDecisionVariable != null) &&
                      "·"}
                    {watchDecisionVariable?.label}
                  </p>
                </div>
              </div>
            </OptionArea>

            <DialogFooter>
              <Button type="submit">Okay</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

type ValueType = z.infer<typeof schema>["objectiveFunctionSteps"]["0"]

const getValuesFromFunctionStep = (value: ValueType) => {
  switch (value.type) {
    case "decision-variable":
      return `${value.coefficient}·${value.decision_variable.label}`
    case "constant":
      return value.constant
    case "operator":
      switch (value.operator) {
        case "plus":
          return <Plus />
        case "minus":
          return <Minus />
      }
  }
}

export const OptionArea: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="flex  gap-4 p-4 rounded-md border border-dashed border-muted">
    {children}
  </div>
)
