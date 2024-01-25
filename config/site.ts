export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Solver",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Graphical",
      href: "/graphical",
    },
    {
      title: "Multi-Variable",
      href: "/multivariable",
    },
  ],
  links: {
    github: "https://github.com/shadcn/ui",
  },
}
