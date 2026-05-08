"use client"

import { Toast as BaseToast } from "@base-ui/react/toast"
import {
  CheckCircleIcon,
  WarningIcon,
  XCircleIcon,
  XIcon,
} from "@phosphor-icons/react"
import type { ReactNode } from "react"

import { cn } from "../utils/cn"
import { Button } from "./button"

type ToastAppearance = "default" | "warning" | "error" | "success"

type ToastData = {
  appearance?: ToastAppearance
  action?: {
    label: string
    onClick: () => void
  }
}

const toastManager = BaseToast.createToastManager()

export { toastManager }

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <BaseToast.Provider toastManager={toastManager}>
      {children}
      <BaseToast.Portal>
        <BaseToast.Viewport className="fixed right-4 bottom-4 z-50 flex w-[380px]">
          <ToastList />
        </BaseToast.Viewport>
      </BaseToast.Portal>
    </BaseToast.Provider>
  )
}

export function useToast() {
  return BaseToast.useToastManager()
}

const iconMap: Record<
  Exclude<ToastAppearance, "default">,
  { Icon: typeof WarningIcon; bgClass: string; iconClass: string }
> = {
  warning: {
    Icon: WarningIcon,
    bgClass: "bg-warning-default",
    iconClass: "text-warning",
  },
  error: {
    Icon: XCircleIcon,
    bgClass: "bg-error-default",
    iconClass: "text-error",
  },
  success: {
    Icon: CheckCircleIcon,
    bgClass: "bg-success-default",
    iconClass: "text-success",
  },
}

function ToastList() {
  const { toasts } = BaseToast.useToastManager()

  return toasts.map((toast) => {
    const appearance =
      (toast.data as ToastData | undefined)?.appearance ?? "default"
    const action = (toast.data as ToastData | undefined)?.action
    const iconConfig = appearance !== "default" ? iconMap[appearance] : null

    return (
      <BaseToast.Root
        key={toast.id}
        toast={toast}
        className={cn(
          "[--gap:0.5rem] [--peek:0.5rem]",
          "[--scale:calc(max(0,1-(var(--toast-index)*0.05)))]",
          "[--shrink:calc(1-var(--scale))]",
          "[--height:var(--toast-frontmost-height,var(--toast-height))]",
          "[--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",

          "absolute right-0 bottom-0 left-auto w-full",
          "z-[calc(1000-var(--toast-index))]",
          "origin-bottom select-none",
          "h-[var(--height)]",
          "rounded-xl bg-elevation-surface-overlay-default bg-clip-padding",
          "shadow-[0_0_1px_var(--shadow-color-elevation-strong),0_4px_12px_var(--shadow-color-elevation-default)]",

          "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height))))_scale(var(--scale))]",
          "[transition:transform_0.5s_cubic-bezier(0.22,1,0.36,1),opacity_0.5s,height_0.15s]",

          "data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
          "data-[expanded]:h-[var(--toast-height)]",

          "data-[starting-style]:[transform:translateY(150%)]",
          "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
          "data-[ending-style]:opacity-0",
          "data-[limited]:opacity-0",

          "data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
          "data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
          "data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
          "data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",

          "data-[expanded]:data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
          "data-[expanded]:data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
          "data-[expanded]:data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
          "data-[expanded]:data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",

          "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        )}
      >
        <BaseToast.Content className="flex w-full overflow-hidden transition-opacity duration-250 data-[behind]:pointer-events-none data-[behind]:opacity-0 data-[expanded]:pointer-events-auto data-[expanded]:opacity-100">
          <div
            className={cn(
              "flex w-full items-center gap-3 py-3 pr-3",
              iconConfig ? "pl-3" : "pl-4",
            )}
          >
            {iconConfig && (
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-md",
                  iconConfig.bgClass,
                )}
              >
                <iconConfig.Icon
                  weight="fill"
                  className={cn("size-5", iconConfig.iconClass)}
                />
              </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
              <BaseToast.Title className="truncate title-14-semibold text-default" />
              <BaseToast.Description className="truncate body-14-regular text-subtle" />
            </div>

            {action ? (
              <BaseToast.Action
                render={
                  <Button size="md" appearance="default" className="shrink-0" />
                }
                onClick={action.onClick}
              >
                {action.label}
              </BaseToast.Action>
            ) : (
              <BaseToast.Close
                render={
                  <Button
                    size="sm"
                    appearance="ghost"
                    className="shrink-0"
                    icon={<XIcon weight="bold" />}
                    aria-label="닫기"
                  />
                }
              />
            )}
          </div>
        </BaseToast.Content>
      </BaseToast.Root>
    )
  })
}
