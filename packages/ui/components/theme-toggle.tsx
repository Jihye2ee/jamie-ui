"use client"

import { MoonIcon, SunIcon } from "@phosphor-icons/react"
import { useTheme } from "next-themes"

import { Button } from "./button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      appearance="ghost"
      size="sm"
      icon={<ThemeIcon />}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    />
  )
}

function ThemeIcon() {
  return (
    <>
      <SunIcon className="absolute size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <MoonIcon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </>
  )
}
