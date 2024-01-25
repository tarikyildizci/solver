"use client"

import { useState } from "react"

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)
  const toggle = () => setIsOpen((o) => !o)
  return {
    isOpen,
    setIsOpen,
    close,
    open,
    toggle,
  }
}
