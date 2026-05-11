"use client"

import { Button as BaseButton } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "../utils/cn"

const iconButtonVariants = cva(
  cn(
    `inline-flex shrink-0 items-center justify-center transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-color-focused) disabled:cursor-not-allowed disabled:text-disabled`,
    `disabled:pointer-events-none disabled:[&_svg]:fill-disabled`,
  ),
  {
    variants: {
      appearance: {
        subtle: `relative overflow-hidden border border-default bg-neutral-subtle-default text-default before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b before:from-transparent before:to-black/[0.03] hover:bg-neutral-subtle-hovered active:bg-neutral-subtle-pressed disabled:border-transparent disabled:bg-disabled disabled:before:hidden`,
        ghost: `relative overflow-hidden bg-transparent text-default hover:bg-interaction-hovered active:bg-interaction-pressed disabled:bg-transparent`,
      },
      size: {
        sm: `size-6 min-w-6 rounded-sm [&_svg]:size-4`,
        md: `size-8 min-w-8 rounded-md [&_svg]:size-5`,
        lg: `size-10 min-w-10 rounded-lg [&_svg]:size-6`,
      },
    },
    defaultVariants: {
      appearance: "ghost",
      size: "md",
    },
  },
)

const buttonVariants = cva(
  cn(
    `relative inline-flex items-center justify-center overflow-hidden transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-color-focused) disabled:cursor-not-allowed disabled:border-transparent disabled:bg-disabled disabled:text-disabled disabled:before:hidden disabled:hover:bg-disabled`,
  ),
  {
    variants: {
      appearance: {
        default: `bg-neutral-bold-default text-inverse before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b before:from-white/0 before:to-white/20 hover:bg-neutral-bold-hovered active:bg-neutral-bold-pressed`,
        subtle: `border border-default bg-neutral-subtle-default text-default before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b before:from-transparent before:to-black/[0.03] hover:bg-neutral-subtle-hovered active:bg-neutral-subtle-pressed`,
        ghost: `bg-transparent text-default hover:bg-interaction-hovered active:bg-interaction-pressed`,
        error: `bg-error-bold-default text-inverse before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b before:from-white/0 before:to-white/16 hover:bg-error-bold-hovered active:bg-error-bold-pressed`,
        "error-subtle": `bg-error-default text-error hover:bg-error-hovered aria-pressed:bg-error-pressed`,
      },
      size: {
        sm: "h-6 gap-1 rounded-sm px-2 body-12-medium",
        md: "h-8 gap-1.5 rounded-md px-3 body-12-medium",
        lg: "h-10 gap-2 rounded-lg px-4 body-14-medium",
      },
    },
    defaultVariants: {
      appearance: "default",
      size: "md",
    },
  },
)

type ButtonVariantProps = VariantProps<typeof buttonVariants>
type IconButtonVariantProps = VariantProps<typeof iconButtonVariants>

type ButtonAppearance = ButtonVariantProps["appearance"]
type IconButtonAppearance = IconButtonVariantProps["appearance"]

type BaseButtonProps = ComponentProps<typeof BaseButton>

type IconButtonProps = {
  icon: ReactNode
  children?: never
}

type RegularButtonProps = {
  icon?: never
  children?: ReactNode
}

export type ButtonProps = Omit<BaseButtonProps, "className"> &
  ButtonVariantProps & {
    loading?: boolean
    className?: string
  } & (IconButtonProps | RegularButtonProps)

export function Button({
  className,
  appearance = "default",
  size = "md",
  disabled,
  loading,
  children,
  icon,
  ...props
}: ButtonProps) {
  const isIconButton = Boolean(icon && !children)
  const child = isIconButton ? icon : children

  const getClassName = (state: { disabled: boolean }) => {
    const baseClassName = isIconButton
      ? iconButtonVariants({
          appearance: appearance as IconButtonAppearance,
          size,
        })
      : buttonVariants({
          appearance: appearance as ButtonAppearance,
          size,
        })

    return cn(
      baseClassName,
      state.disabled && "cursor-not-allowed opacity-50",
      loading && "pointer-events-none",
      className,
    )
  }

  const dotSize = size === "lg" ? "size-1.5" : "size-1"
  const dotGap = size === "lg" ? "gap-1" : "gap-[3px]"

  return (
    <BaseButton
      className={getClassName}
      disabled={disabled}
      aria-busy={loading || undefined}
      onClickCapture={
        loading ? (e: React.MouseEvent) => e.preventDefault() : undefined
      }
      onKeyDownCapture={
        loading
          ? (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") e.preventDefault()
            }
          : undefined
      }
      {...props}
    >
      {!loading ? (
        child
      ) : (
        <>
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              dotGap,
            )}
            aria-hidden
          >
            <span
              className={cn(
                "animate-dot-bounce rounded-full bg-current",
                dotSize,
              )}
            />
            <span
              className={cn(
                "animate-dot-bounce rounded-full bg-current [animation-delay:200ms]",
                dotSize,
              )}
            />
            <span
              className={cn(
                "animate-dot-bounce rounded-full bg-current [animation-delay:400ms]",
                dotSize,
              )}
            />
          </div>
          <span className="invisible">{child}</span>
        </>
      )}
    </BaseButton>
  )
}

export { buttonVariants, iconButtonVariants }

export type IconButtonComponentProps = Omit<BaseButtonProps, "className"> &
  IconButtonVariantProps & {
    className?: string
    children?: ReactNode
  }

export function IconButton({
  className,
  appearance = "ghost",
  size = "md",
  disabled,
  children,
  ...props
}: IconButtonComponentProps) {
  return (
    <BaseButton
      className={(state: { disabled: boolean }) =>
        cn(
          iconButtonVariants({ appearance, size }),
          state.disabled && "cursor-not-allowed opacity-50",
          className,
        )
      }
      disabled={disabled}
      {...props}
    >
      {children}
    </BaseButton>
  )
}
