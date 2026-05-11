"use client"

import {
  AccordionRoot,
  AccordionItem as UIAccordionItem,
} from "@jamie-ui/ui/components/accordion"
import { Avatar } from "@jamie-ui/ui/components/avatar"
import { Button } from "@jamie-ui/ui/components/button"
import { Card } from "@jamie-ui/ui/components/card"
import { Checkbox } from "@jamie-ui/ui/components/checkbox"
import { CheckboxGroup } from "@jamie-ui/ui/components/checkbox-group"
import { RadioGroup, Radio as UIRadio } from "@jamie-ui/ui/components/radio"
import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
  SelectItem as UISelectItem,
} from "@jamie-ui/ui/components/select"
import { Separator } from "@jamie-ui/ui/components/separator"
import { Slider } from "@jamie-ui/ui/components/slider"
import { Stack } from "@jamie-ui/ui/components/stack"
import { Switch } from "@jamie-ui/ui/components/switch"
import { cn } from "@jamie-ui/ui/utils/cn"
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogRoot,
  AlertDialogTitle,
} from "@jamie-ui/ui/components/alert-dialog"
import { Combobox } from "@jamie-ui/ui/components/combobox"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@jamie-ui/ui/components/dialog"
import {
  MenuContent,
  MenuItem as UIMenuItem,
  MenuRoot,
  MenuTrigger,
} from "@jamie-ui/ui/components/menu"
import {
  CheckCircleIcon,
  WarningCircleIcon,
  XCircleIcon,
} from "@phosphor-icons/react"
import {
  PopoverContent,
  PopoverDescription,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@jamie-ui/ui/components/popover"

import { defineRegistry } from "@json-render/react"

import { catalog } from "./catalog"

const GAP_MAP: Record<string, string> = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
}

export const { registry } = defineRegistry(catalog, {
  components: {
    Stack: ({ props, children }) => (
      <Stack
        direction={props.direction ?? "vertical"}
        gap={props.gap ?? "md"}
        align={props.align ?? "stretch"}
        justify={props.justify ?? "start"}
      >
        {children}
      </Stack>
    ),

    Card: ({ props, children }) => (
      <Card
        title={props.title ?? undefined}
        description={props.description ?? undefined}
      >
        {children}
      </Card>
    ),

    Grid: ({ props, children }) => {
      const cols = Math.min(Math.max(props.columns ?? 2, 1), 6)
      return (
        <div
          className={cn("grid", GAP_MAP[props.gap ?? "md"])}
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {children}
        </div>
      )
    },

    Separator: () => <Separator />,

    Heading: ({ props }) => {
      const tag = props.level ?? "h2"
      const styles: Record<string, string> = {
        h1: "title-16-semibold text-default text-2xl",
        h2: "title-16-semibold text-default text-xl",
        h3: "title-16-semibold text-default text-lg",
        h4: "body-15-semibold text-default",
      }
      const Tag = tag as "h1" | "h2" | "h3" | "h4"
      return <Tag className={styles[tag]}>{props.text}</Tag>
    },

    Text: ({ props }) => {
      const styles: Record<string, string> = {
        body: "body-15-medium text-default",
        caption: "body-12-medium text-subtle",
        muted: "body-13-medium text-subtle",
      }
      return <p className={styles[props.variant ?? "body"]}>{props.text}</p>
    },

    Button: ({ props }) => (
      <Button
        appearance={
          (props.appearance ?? "default") as
            | "default"
            | "subtle"
            | "ghost"
            | "error"
            | "error-subtle"
        }
        size={(props.size ?? "sm") as "sm" | "md" | "lg"}
        disabled={props.disabled ?? false}
      >
        {props.label}
      </Button>
    ),

    Avatar: ({ props }) => (
      <Avatar
        src={props.src ?? undefined}
        alt={props.alt ?? undefined}
        size={(props.size ?? "lg") as "lg" | "default"}
        color={
          (props.color ?? "orange") as "stone" | "orange" | "lime" | "indigo"
        }
        name={props.initials ?? undefined}
      />
    ),

    Checkbox: ({ props }) => (
      <Checkbox
        label={props.label}
        defaultChecked={props.checked ?? false}
        disabled={props.disabled ?? false}
        size={(props.size ?? "md") as "md" | "sm"}
      />
    ),

    CheckboxGroup: ({ props, children }) => (
      <CheckboxGroup
        title={props.title ?? undefined}
        columns={props.columns ?? undefined}
      >
        {children}
      </CheckboxGroup>
    ),

    Switch: ({ props }) => (
      <Switch
        label={props.label ?? undefined}
        defaultChecked={props.checked ?? false}
        disabled={props.disabled ?? false}
      />
    ),

    RadioGroup: ({ props, children }) => (
      <RadioGroup
        className={
          props.orientation === "horizontal" ? "flex flex-row gap-4" : undefined
        }
      >
        {children}
      </RadioGroup>
    ),

    RadioItem: ({ props }) => (
      <UIRadio
        label={props.label}
        value={props.value}
        disabled={props.disabled ?? false}
      />
    ),

    Slider: ({ props }) => (
      <Slider
        label={props.label ?? undefined}
        min={props.min ?? 0}
        max={props.max ?? 100}
        step={props.step ?? 1}
        defaultValue={
          props.defaultValue != null ? [props.defaultValue] : undefined
        }
        showValue={props.showValue ?? false}
        disabled={props.disabled ?? false}
      />
    ),

    Select: ({ props }) => {
      const options = props.options ?? []
      return (
        <SelectRoot>
          <SelectTrigger
            size={(props.size ?? "md") as "md" | "sm"}
            disabled={props.disabled ?? false}
            placeholder={props.placeholder ?? "Select..."}
          />
          <SelectContent>
            {options.map((opt: { label: string; value: string }) => (
              <UISelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </UISelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      )
    },

    Accordion: ({ children }) => <AccordionRoot>{children}</AccordionRoot>,

    AccordionItem: ({ props, children }) => (
      <UIAccordionItem title={props.title} value={props.value}>
        {children}
      </UIAccordionItem>
    ),
    Dialog: ({ props, children }) => (
      <DialogRoot defaultOpen modal={false}>
        <DialogContent
          size={(props.size ?? "default") as "default" | "md" | "lg"}
        >
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            {props.description && (
              <DialogDescription>{props.description}</DialogDescription>
            )}
          </DialogHeader>
          {children && <DialogFooter>{children}</DialogFooter>}
        </DialogContent>
      </DialogRoot>
    ),

    AlertDialog: ({ props }) => (
      <AlertDialogRoot defaultOpen>
        <AlertDialogContent>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          {props.description && (
            <AlertDialogDescription>{props.description}</AlertDialogDescription>
          )}
          <AlertDialogFooter>
            <Button appearance="subtle" size="md">
              {props.cancelLabel ?? "Cancel"}
            </Button>
            <Button
              appearance={
                (props.confirmAppearance ?? "default") as "default" | "error"
              }
              size="md"
            >
              {props.confirmLabel ?? "Confirm"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogRoot>
    ),

    Menu: ({ props, children }) => (
      <MenuRoot>
        <MenuTrigger
          className={cn(
            "inline-flex cursor-pointer items-center gap-1",
            "rounded-md px-3 py-2 body-14-medium",
            "bg-neutral-default text-default hover:bg-neutral-hovered",
          )}
        >
          {props.triggerLabel}
        </MenuTrigger>
        <MenuContent>{children}</MenuContent>
      </MenuRoot>
    ),

    MenuItem: ({ props }) => (
      <UIMenuItem
        danger={props.danger ?? false}
        disabled={props.disabled ?? false}
      >
        {props.label}
      </UIMenuItem>
    ),

    Popover: ({ props, children }) => (
      <PopoverRoot>
        <PopoverTrigger
          className={cn(
            "inline-flex cursor-pointer items-center gap-1",
            "rounded-md px-3 py-2 body-14-medium",
            "bg-neutral-default text-default hover:bg-neutral-hovered",
          )}
        >
          {props.triggerLabel}
        </PopoverTrigger>
        <PopoverContent>
          {props.title && <PopoverTitle>{props.title}</PopoverTitle>}
          {props.description && (
            <PopoverDescription>{props.description}</PopoverDescription>
          )}
          {children}
        </PopoverContent>
      </PopoverRoot>
    ),

    Combobox: ({ props }) => {
      const options = props.options ?? []
      return (
        <Combobox
          items={options.map(
            (opt: { label: string; value: string }) => opt.label,
          )}
          size={(props.inputSize ?? "md") as "md" | "sm"}
          disabled={props.disabled ?? false}
          placeholder={props.placeholder ?? "Search..."}
        />
      )
    },

    Toast: ({ props }) => {
      const appearance = props.appearance ?? "default"
      const iconMap: Record<string, typeof CheckCircleIcon> = {
        warning: WarningCircleIcon,
        error: XCircleIcon,
        success: CheckCircleIcon,
      }
      const colorMap: Record<string, string> = {
        warning: "fill-warning",
        error: "fill-error",
        success: "fill-success",
      }
      const Icon = appearance !== "default" ? iconMap[appearance] : null
      return (
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl p-3",
            "bg-elevation-surface-overlay-default",
            "shadow-[0_0_1px_var(--shadow-color-elevation-strong),0_4px_12px_var(--shadow-color-elevation-default)]",
          )}
        >
          {Icon && (
            <Icon
              size={20}
              weight="fill"
              className={cn("shrink-0", colorMap[appearance])}
            />
          )}
          <div className="flex-1">
            <p className="title-14-semibold text-default">{props.title}</p>
            {props.description && (
              <p className="mt-0.5 body-12-medium text-subtle">
                {props.description}
              </p>
            )}
          </div>
        </div>
      )
    },
  },
})
