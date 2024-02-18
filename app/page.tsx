import Link from "next/link"
import { Settings } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <main className="flex flex-col items-center pt-24 gap-4">
      <div className="h-96 w-96 absolute bottom-0 -left-20 bg-gradient-to-br rounded-md bg-amber-500 blur-3xl opacity-40 animate-blob-move" />
      <div className="h-96 w-64 absolute top-0 -right-24 bg-gradient-to-br rounded-md bg-blue-500 blur-3xl opacity-20 animate-blob-move" />
      <section className="p-12 w-full flex justify-center items-center">
        <Settings className="h-32 w-32 text-foreground animate-spin-slow" />
        <Settings className="relative h-32 w-32 text-foreground animate-spin-slow-reverse right-10 top-6" />
      </section>
      <section className="flex flex-col gap-6 items-center justify-center max-w-3xl ">
        <h1 className="text-6xl font-bold text-center">Solver</h1>
        <h1 className="text-3xl font-semibold text-center">
          For Linear Programming Problems
        </h1>
        <p className="text-md text-center w-[70%]">
          You can either solve two variable problems and get a graph result, or
          multivariable problems and get the optimal result.
        </p>
      </section>
      <section className="flex gap-4">
        <Link href={"/graphical"}>
          <Button variant={"outline"}>Two Variable (Graphical)</Button>
        </Link>
        <Link href={"/multivariable"}>
          <Button>Multi-Variable</Button>
        </Link>
      </section>
    </main>
  )
}
