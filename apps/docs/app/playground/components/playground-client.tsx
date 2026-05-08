"use client"

import { registry } from "@jamie-ui/json-render"
import { useUIStream } from "@json-render/react"
import { MoonIcon, SunIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { PreviewPanel } from "./preview-panel"
import { PromptPanel } from "./prompt-panel"
import { SpecPanel } from "./spec-panel"

export function PlaygroundClient() {
  const [input, setInput] = useState("")
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const isDark = mounted ? resolvedTheme === "dark" : true

  useEffect(() => {
    setMounted(true)
  }, [])

  const { spec, isStreaming, send } = useUIStream({
    api: "/api/generate",
  })

  function handleSubmit() {
    if (!input.trim() || isStreaming) return
    send(input.trim())
  }

  function handleExample(example: string) {
    setInput(example)
    send(example)
  }

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <div className="flex h-screen flex-col bg-elevation-surface-sunken-default text-default">
      <header className="flex h-11 shrink-0 items-center justify-between border-b border-subtle px-4">
        <div className="flex items-center gap-2">
          <Link
            href="/docs"
            className="body-14-medium text-subtle transition-colors hover:text-default"
          >
            &larr;
          </Link>
          <span className="title-14-semibold text-default">Playground</span>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="flex size-8 items-center justify-center rounded-md text-subtle transition-colors hover:bg-interaction-hovered hover:text-default"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        <PromptPanel
          input={input}
          isStreaming={isStreaming}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onExample={handleExample}
        />
        <SpecPanel spec={spec} />
        <PreviewPanel
          spec={spec}
          registry={registry}
          isStreaming={isStreaming}
        />
      </div>
    </div>
  )
}
