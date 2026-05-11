"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"

import { cn } from "../utils/cn"

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
  {
    variants: {
      size: {
        lg: "size-10",
        default: "size-6",
      },
      color: {
        stone: "bg-neutral-subtle-default text-subtle",
        orange: "bg-accent-orange text-accent-orange",
        lime: "bg-accent-lime text-accent-lime",
        indigo: "bg-accent-indigo text-accent-indigo",
      },
    },
    defaultVariants: {
      size: "lg",
      color: "orange",
    },
  },
)

const initialVariants = cva("select-none", {
  variants: {
    size: {
      default: "body-10-regular",
      lg: "body-14-regular",
    },
  },
  defaultVariants: {
    size: "lg",
  },
})

type AvatarVariantProps = VariantProps<typeof avatarVariants>

export type AvatarProps = Omit<ComponentProps<"div">, "className"> &
  AvatarVariantProps & {
    src?: string
    alt?: string
    name?: string
    children?: string
    className?: string
  }

export function Avatar({
  size = "lg",
  color = "orange",
  src,
  alt,
  name,
  children,
  className,
  ...props
}: AvatarProps) {
  const displayText = children || name
  return (
    <div className={cn(avatarVariants({ size, color }), className)} {...props}>
      {src ? (
        <img src={src} alt={alt || ""} className="size-full object-cover" />
      ) : (
        <span className={initialVariants({ size })}>
          {displayText?.slice(0, 2)}
        </span>
      )}
    </div>
  )
}

export { avatarVariants }
