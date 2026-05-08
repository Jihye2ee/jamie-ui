"use client"

import {
  ActionProvider,
  type ComponentRegistry,
  Renderer,
  type Spec,
  StateProvider,
  VisibilityProvider,
} from "@json-render/react"
import { CopyIcon } from "@phosphor-icons/react"
import { useMemo, useState } from "react"

import { PanelTabs } from "./panel-tabs"
import { specToCode } from "./spec-to-code"

const RIGHT_TABS = ["preview", "code"] as const
type RightTab = (typeof RIGHT_TABS)[number]

interface PreviewPanelProps {
  spec: Spec | null
  registry: ComponentRegistry
  isStreaming: boolean
}

export function PreviewPanel({
  spec,
  registry,
  isStreaming,
}: PreviewPanelProps) {
  const [tab, setTab] = useState<RightTab>("preview")
  const hasSpec = spec !== null

  const generatedCode = useMemo(() => {
    if (!hasSpec || !spec.root) return null
    return specToCode(spec)
  }, [spec, hasSpec])

  function handleCopyCode() {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode)
    }
  }

  return (
    <div className="flex w-1/3 flex-col">
      <PanelTabs
        tabs={RIGHT_TABS}
        active={tab}
        onTabChange={setTab}
        trailing={
          tab === "code" && generatedCode ? (
            <button
              type="button"
              onClick={handleCopyCode}
              className="text-subtlest transition-colors hover:text-subtle"
              title="Copy code"
            >
              <CopyIcon size={14} />
            </button>
          ) : undefined
        }
      />

      <div className="flex-1 overflow-auto bg-elevation-surface-raised-default p-4">
        {tab === "preview" ? (
          hasSpec ? (
            <StateProvider initialState={spec.state ?? {}}>
              <ActionProvider>
                <VisibilityProvider>
                  <Renderer
                    spec={spec}
                    registry={registry}
                    loading={isStreaming}
                  />
                </VisibilityProvider>
              </ActionProvider>
            </StateProvider>
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="body-12-regular text-placeholder">
                {isStreaming
                  ? "Generating..."
                  : "// enter a prompt to generate UI"}
              </span>
            </div>
          )
        ) : generatedCode ? (
          <pre className="body-12-regular leading-relaxed text-subtle">
            {generatedCode}
          </pre>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="body-12-regular text-placeholder">
              {/* // generate a UI to see code */}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
