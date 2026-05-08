"use client"

import { Slider as BaseSlider } from "@base-ui/react/slider"
import type { ComponentProps, ReactNode } from "react"

import { cn } from "../utils/cn"

const thumbClasses = cn(
  "size-4 -translate-1/2 rounded-full border-2 border-selected bg-elevation-surface-default shadow-sm transition-colors duration-150 ease-out",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--border-color-focused)",
  "hover:border-bold",
  "data-dragging:border-bold",
  "data-disabled:border-disabled data-disabled:bg-elevation-surface-default data-disabled:shadow-none",
)

const trackClasses = cn(
  "relative h-1.5 w-full rounded-full bg-neutral-default",
  "data-disabled:bg-disabled",
)

const indicatorClasses = cn(
  "rounded-full bg-neutral-bold-default",
  "data-disabled:bg-disabled",
)

const controlClasses = cn(
  "flex cursor-pointer items-center py-1",
  "data-disabled:cursor-not-allowed",
)

type SliderProps = Omit<ComponentProps<typeof BaseSlider.Root>, "className"> & {
  label?: ReactNode
  showValue?: boolean
  className?: string
}

export function Slider({
  label,
  showValue,
  className,
  disabled,
  ...props
}: SliderProps) {
  return (
    <BaseSlider.Root
      disabled={disabled}
      {...props}
      className={cn("flex w-full flex-col gap-2", className)}
    >
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span
              className={cn(
                "body-14-medium text-default",
                disabled && "text-disabled",
              )}
            >
              {label}
            </span>
          )}
          {showValue && (
            <BaseSlider.Value
              className={cn(
                "body-14-regular text-subtle",
                disabled && "text-disabled",
              )}
            />
          )}
        </div>
      )}
      <BaseSlider.Control className={controlClasses}>
        <BaseSlider.Track className={trackClasses}>
          <BaseSlider.Indicator className={indicatorClasses} />
          <BaseSlider.Thumb className={thumbClasses} />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}

type RangeSliderProps = Omit<
  ComponentProps<typeof BaseSlider.Root>,
  "className"
> & {
  label?: ReactNode
  showValue?: boolean
  className?: string
}

export function RangeSlider({
  label,
  showValue,
  className,
  disabled,
  ...props
}: RangeSliderProps) {
  return (
    <BaseSlider.Root
      disabled={disabled}
      {...props}
      className={cn("flex w-full flex-col gap-2", className)}
    >
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span
              className={cn(
                "body-14-medium text-default",
                disabled && "text-disabled",
              )}
            >
              {label}
            </span>
          )}
          {showValue && (
            <BaseSlider.Value
              className={cn(
                "body-14-regular text-subtle",
                disabled && "text-disabled",
              )}
            >
              {(formattedValues) => formattedValues.join(" – ")}
            </BaseSlider.Value>
          )}
        </div>
      )}
      <BaseSlider.Control className={controlClasses}>
        <BaseSlider.Track className={trackClasses}>
          <BaseSlider.Indicator className={indicatorClasses} />
          <BaseSlider.Thumb
            index={0}
            aria-label="Minimum"
            className={thumbClasses}
          />
          <BaseSlider.Thumb
            index={1}
            aria-label="Maximum"
            className={thumbClasses}
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}
