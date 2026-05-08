"use client"

import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { XIcon } from "@phosphor-icons/react"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "../utils/cn"
import { Button, type ButtonProps, IconButton } from "./button"

const dialogSizeVariants = cva(
  cn(
    "fixed top-1/2 left-1/2 z-50 w-full -translate-1/2",
    "rounded-xl bg-elevation-surface-overlay-default",
    "shadow-overlay",
    "focus-visible:outline-hidden",
  ),
  {
    variants: {
      size: {
        default: "max-w-[480px]",
        md: "max-w-[720px]",
        lg: "max-w-[1080px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

type DialogSize = VariantProps<typeof dialogSizeVariants>["size"]

export type DialogRootProps = ComponentProps<typeof BaseDialog.Root>

export function DialogRoot(props: DialogRootProps) {
  return <BaseDialog.Root {...props} />
}

export type DialogTriggerProps = ComponentProps<typeof BaseDialog.Trigger>

export function DialogTrigger(props: DialogTriggerProps) {
  return <BaseDialog.Trigger {...props} />
}

export type DialogContentProps = Omit<
  ComponentProps<typeof BaseDialog.Popup>,
  "className"
> & {
  size?: DialogSize
  className?: string
}

export function DialogContent({
  size = "default",
  className,
  children,
  ...props
}: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-blanket-default" />
      <BaseDialog.Popup
        className={cn(dialogSizeVariants({ size }), className)}
        {...props}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}

export type DialogHeaderProps = {
  children: ReactNode
  className?: string
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return (
    <div
      className={cn("relative flex flex-col gap-3 px-5 pt-5 pb-3", className)}
    >
      {children}
      <BaseDialog.Close
        render={
          <IconButton
            appearance="ghost"
            size="md"
            className="absolute top-2 right-2"
          />
        }
      >
        <XIcon />
      </BaseDialog.Close>
    </div>
  )
}

export type DialogTitleProps = Omit<
  ComponentProps<typeof BaseDialog.Title>,
  "className"
> & {
  className?: string
}

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <BaseDialog.Title
      className={cn("pr-8 title-16-bold text-default", className)}
      {...props}
    />
  )
}

export type DialogDescriptionProps = Omit<
  ComponentProps<typeof BaseDialog.Description>,
  "className"
> & {
  className?: string
}

export function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      className={cn("body-14-regular text-subtle", className)}
      {...props}
    />
  )
}

export type DialogFooterProps = {
  children: ReactNode
  variant?: "default" | "directional"
  className?: string
}

export function DialogFooter({
  children,
  variant = "default",
  className,
}: DialogFooterProps) {
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

export type DialogCloseProps = Omit<
  ComponentProps<typeof BaseDialog.Close>,
  "className"
> & {
  className?: string
}

export function DialogClose({ className, ...props }: DialogCloseProps) {
  return (
    <BaseDialog.Close
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
    </BaseDialog.Close>
  )
}

export { dialogSizeVariants }

export type DialogActionProps = Omit<
  ComponentProps<typeof BaseDialog.Close>,
  "className"
> & {
  appearance?: ButtonProps["appearance"]
  size?: ButtonProps["size"]
  className?: string
}

export function DialogAction({
  appearance = "default",
  size = "lg",
  className,
  ...props
}: DialogActionProps) {
  return (
    <BaseDialog.Close
      render={
        <Button appearance={appearance} size={size} className={className} />
      }
      {...props}
    />
  )
}

export type DialogCancelProps = Omit<
  ComponentProps<typeof BaseDialog.Close>,
  "className"
> & {
  appearance?: ButtonProps["appearance"]
  size?: ButtonProps["size"]
  className?: string
}

export function DialogCancel({
  appearance = "subtle",
  size = "lg",
  className,
  ...props
}: DialogCancelProps) {
  return (
    <BaseDialog.Close
      render={
        <Button appearance={appearance} size={size} className={className} />
      }
      {...props}
    />
  )
}

export { DialogRoot as Dialog }
