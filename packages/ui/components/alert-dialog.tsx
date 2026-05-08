"use client"

import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog"
import { XIcon } from "@phosphor-icons/react"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../utils/cn"
import { Button, type ButtonProps, IconButton } from "./button"

export type AlertDialogRootProps = ComponentProps<typeof BaseAlertDialog.Root>

export function AlertDialogRoot(props: AlertDialogRootProps) {
  return <BaseAlertDialog.Root {...props} />
}

export type AlertDialogTriggerProps = ComponentProps<
  typeof BaseAlertDialog.Trigger
>

export function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  return <BaseAlertDialog.Trigger {...props} />
}

export type AlertDialogContentProps = Omit<
  ComponentProps<typeof BaseAlertDialog.Popup>,
  "className"
> & {
  className?: string
}

export function AlertDialogContent({
  className,
  children,
  ...props
}: AlertDialogContentProps) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop className="fixed inset-0 z-50 bg-blanket-default" />
      <BaseAlertDialog.Popup
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-[480px]",
          "-translate-1/2",
          "rounded-xl bg-elevation-surface-overlay-default",
          "shadow-overlay",
          "focus-visible:outline-hidden",
          className,
        )}
        {...props}
      >
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  )
}

export type AlertDialogTitleProps = Omit<
  ComponentProps<typeof BaseAlertDialog.Title>,
  "className"
> & {
  className?: string
}

export function AlertDialogTitle({
  className,
  ...props
}: AlertDialogTitleProps) {
  return (
    <BaseAlertDialog.Title
      className={cn("pr-8 title-16-bold text-default", className)}
      {...props}
    />
  )
}

export type AlertDialogDescriptionProps = Omit<
  ComponentProps<typeof BaseAlertDialog.Description>,
  "className"
> & {
  className?: string
}

export function AlertDialogDescription({
  className,
  ...props
}: AlertDialogDescriptionProps) {
  return (
    <BaseAlertDialog.Description
      className={cn("body-14-regular text-subtle", className)}
      {...props}
    />
  )
}

export type AlertDialogFooterProps = {
  children: ReactNode
  variant?: "default" | "directional"
  className?: string
}

export function AlertDialogFooter({
  children,
  variant = "default",
  className,
}: AlertDialogFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-5 pt-3 pb-5",
        variant === "default" ? "justify-end" : "justify-between",
        className,
      )}
    >
      {children}
    </div>
  )
}

export type AlertDialogCloseProps = Omit<
  ComponentProps<typeof BaseAlertDialog.Close>,
  "className"
> & {
  className?: string
}

export function AlertDialogClose({
  className,
  ...props
}: AlertDialogCloseProps) {
  return (
    <BaseAlertDialog.Close
      render={
        <IconButton
          appearance="ghost"
          size="md"
          className={cn("absolute top-2 right-2", className)}
        />
      }
      {...props}
    >
      <XIcon />
    </BaseAlertDialog.Close>
  )
}

export type AlertDialogActionProps = Omit<
  ComponentProps<typeof BaseAlertDialog.Close>,
  "className"
> & {
  appearance?: ButtonProps["appearance"]
  size?: ButtonProps["size"]
  className?: string
}

export function AlertDialogAction({
  appearance = "default",
  size = "lg",
  className,
  ...props
}: AlertDialogActionProps) {
  return (
    <BaseAlertDialog.Close
      render={
        <Button appearance={appearance} size={size} className={className} />
      }
      {...props}
    />
  )
}

export type AlertDialogCancelProps = Omit<
  ComponentProps<typeof BaseAlertDialog.Close>,
  "className"
> & {
  appearance?: ButtonProps["appearance"]
  size?: ButtonProps["size"]
  className?: string
}

export function AlertDialogCancel({
  appearance = "subtle",
  size = "lg",
  className,
  ...props
}: AlertDialogCancelProps) {
  return (
    <BaseAlertDialog.Close
      render={
        <Button appearance={appearance} size={size} className={className} />
      }
      {...props}
    />
  )
}

export type AlertDialogHeaderProps = {
  children: ReactNode
  className?: string
}

export function AlertDialogHeader({
  children,
  className,
}: AlertDialogHeaderProps) {
  return (
    <div
      className={cn("relative flex flex-col gap-3 px-5 pt-5 pb-3", className)}
    >
      {children}
      <BaseAlertDialog.Close
        render={
          <IconButton
            appearance="ghost"
            size="md"
            className="absolute top-2 right-2"
          />
        }
      >
        <XIcon />
      </BaseAlertDialog.Close>
    </div>
  )
}

export { AlertDialogRoot as AlertDialog }
