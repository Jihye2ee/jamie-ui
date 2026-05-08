import { defineCatalog } from "@json-render/core"
import { schema } from "@json-render/react/schema"
import { z } from "zod"

export const catalog = defineCatalog(schema, {
  components: {
    Stack: {
      props: z.object({
        direction: z
          .enum(["vertical", "horizontal"])
          .nullable()
          .describe("Layout direction. Default: vertical"),
        gap: z
          .enum(["none", "sm", "md", "lg"])
          .nullable()
          .describe("Spacing between children. Default: md"),
        align: z
          .enum(["start", "center", "end", "stretch"])
          .nullable()
          .describe("Cross-axis alignment. Default: stretch"),
        justify: z
          .enum(["start", "center", "end", "between"])
          .nullable()
          .describe("Main-axis alignment. Default: start"),
      }),
      description:
        "Flex layout container. Use as the primary building block for arranging children vertically or horizontally.",
    },
    Card: {
      props: z.object({
        title: z.string().nullable().describe("Card heading"),
        description: z
          .string()
          .nullable()
          .describe("Subtitle text below the title"),
      }),
      description:
        "Bordered card container with optional title and description. Children render inside.",
    },
    Grid: {
      props: z.object({
        columns: z
          .number()
          .nullable()
          .describe("Number of columns (1-6). Default: 2"),
        gap: z
          .enum(["none", "sm", "md", "lg"])
          .nullable()
          .describe("Spacing between cells. Default: md"),
      }),
      description: "CSS grid layout. Children fill cells left-to-right.",
    },
    Separator: {
      props: z.object({}),
      description: "Horizontal divider line.",
    },
    Heading: {
      props: z.object({
        text: z.string().describe("Heading text"),
        level: z
          .enum(["h1", "h2", "h3", "h4"])
          .nullable()
          .describe("Heading level. Default: h2"),
      }),
      description: "Section heading with semantic level.",
    },
    Text: {
      props: z.object({
        text: z.string().describe("Text content"),
        variant: z
          .enum(["body", "caption", "muted"])
          .nullable()
          .describe("Text style. Default: body"),
      }),
      description: "Paragraph text with style variants.",
    },
    Button: {
      props: z.object({
        label: z.string().describe("Button text"),
        appearance: z
          .enum(["default", "subtle", "ghost", "error", "error-subtle"])
          .nullable()
          .describe("Visual style. Default: default (filled brand color)"),
        size: z
          .enum(["sm", "md", "lg"])
          .nullable()
          .describe("Button size. Default: sm"),
        disabled: z.boolean().nullable().describe("Disable the button"),
      }),
      description:
        "Clickable button. Appearances: default (brand), subtle (neutral), ghost (transparent), error, error-subtle.",
    },
    Avatar: {
      props: z.object({
        src: z
          .string()
          .nullable()
          .describe("Image URL for avatar. If empty, initials are shown"),
        alt: z.string().nullable().describe("Alt text for avatar image"),
        initials: z
          .string()
          .nullable()
          .describe("Single character shown when src is not provided"),
        size: z
          .enum(["lg", "default"])
          .nullable()
          .describe("Avatar size. Default: lg"),
        color: z
          .enum(["stone", "orange", "lime", "indigo"])
          .nullable()
          .describe("Avatar color variant. Default: neutral"),
      }),
      description:
        "User avatar. Shows image if src provided, otherwise shows first char of initials.",
    },
    Checkbox: {
      props: z.object({
        label: z.string().describe("Checkbox label text"),
        checked: z
          .boolean()
          .nullable()
          .describe("Checked state. Default: false"),
        disabled: z.boolean().nullable().describe("Disable the checkbox"),
        size: z
          .enum(["md", "sm"])
          .nullable()
          .describe("Checkbox size. Default: md"),
      }),
      description: "Single checkbox with label.",
    },
    CheckboxGroup: {
      props: z.object({
        title: z.string().nullable().describe("Optional group title"),
        columns: z.number().nullable().describe("Grid columns for layout"),
      }),
      description:
        "Groups multiple Checkbox children. Optional title and grid layout.",
    },
    Switch: {
      props: z.object({
        label: z.string().nullable().describe("Optional switch label"),
        checked: z
          .boolean()
          .nullable()
          .describe("Checked state. Default: false"),
        disabled: z.boolean().nullable().describe("Disable the switch"),
      }),
      description: "Toggle switch with optional label.",
    },
    RadioGroup: {
      props: z.object({
        orientation: z
          .enum(["vertical", "horizontal"])
          .nullable()
          .describe("Layout direction. Default: vertical"),
      }),
      description:
        "Groups RadioItem children. Set orientation for layout direction.",
    },
    RadioItem: {
      props: z.object({
        label: z.string().describe("Radio option label"),
        value: z.string().describe("Radio option value"),
        disabled: z.boolean().nullable().describe("Disable this radio option"),
      }),
      description: "Single radio option. Must be inside RadioGroup.",
    },
    Slider: {
      props: z.object({
        label: z.string().nullable().describe("Optional slider label"),
        min: z.number().nullable().describe("Minimum value. Default: 0"),
        max: z.number().nullable().describe("Maximum value. Default: 100"),
        step: z.number().nullable().describe("Step increment. Default: 1"),
        defaultValue: z.number().nullable().describe("Initial slider value"),
        showValue: z
          .boolean()
          .nullable()
          .describe("Show current value beside label"),
        disabled: z.boolean().nullable().describe("Disable the slider"),
      }),
      description: "Range slider with optional label and value display.",
    },
    Select: {
      props: z.object({
        placeholder: z
          .string()
          .nullable()
          .describe("Placeholder shown when nothing is selected"),
        size: z
          .enum(["md", "sm"])
          .nullable()
          .describe("Select trigger size. Default: md"),
        disabled: z.boolean().nullable().describe("Disable the select"),
        options: z
          .array(
            z.object({
              label: z.string(),
              value: z.string(),
            }),
          )
          .describe("The dropdown options"),
      }),
      description: "Dropdown select. Options are rendered as selectable items.",
    },
    Accordion: {
      props: z.object({}),
      description:
        "Expandable section container. Children must be AccordionItem.",
    },
    AccordionItem: {
      props: z.object({
        title: z.string().describe("The header text"),
        value: z.string().describe("Unique key for open/close state"),
      }),
      description:
        "Single expandable section inside Accordion. Children render as panel content.",
    },
    Dialog: {
      props: z.object({
        title: z.string().describe("Dialog title"),
        description: z.string().nullable().describe("Dialog description text"),
        size: z
          .enum(["default", "md", "lg"])
          .nullable()
          .describe("Dialog width. Default: default (480px)"),
      }),
      description:
        "Modal dialog overlay. Children render as dialog body content.",
    },
    AlertDialog: {
      props: z.object({
        title: z.string().describe("Alert dialog title"),
        description: z.string().nullable().describe("Alert description text"),
        confirmLabel: z
          .string()
          .nullable()
          .describe("Confirm button text. Default: Confirm"),
        cancelLabel: z
          .string()
          .nullable()
          .describe("Cancel button text. Default: Cancel"),
        confirmAppearance: z
          .enum(["default", "error"])
          .nullable()
          .describe("Confirm button style. Use error for destructive actions"),
      }),
      description:
        "Confirmation dialog for destructive or important actions. Shows title, description, and confirm/cancel buttons.",
    },
    Menu: {
      props: z.object({
        triggerLabel: z.string().describe("Text for the menu trigger button"),
      }),
      description:
        "Dropdown menu anchored to a trigger button. Children must be MenuItem.",
    },
    MenuItem: {
      props: z.object({
        label: z.string().describe("Menu item text"),
        danger: z
          .boolean()
          .nullable()
          .describe("Show as danger/destructive item"),
        disabled: z.boolean().nullable().describe("Disable this menu item"),
      }),
      description: "Single item inside Menu.",
    },
    Popover: {
      props: z.object({
        triggerLabel: z
          .string()
          .describe("Text for the popover trigger button"),
        title: z.string().nullable().describe("Popover heading"),
        description: z.string().nullable().describe("Popover description text"),
      }),
      description:
        "Small overlay anchored to trigger. Children render as additional popover body content.",
    },
    Combobox: {
      props: z.object({
        placeholder: z.string().nullable().describe("Input placeholder text"),
        inputSize: z
          .enum(["md", "sm"])
          .nullable()
          .describe("Input size. Default: md"),
        disabled: z.boolean().nullable().describe("Disable the combobox"),
        options: z
          .array(
            z.object({
              label: z.string(),
              value: z.string(),
            }),
          )
          .describe("The searchable dropdown options"),
      }),
      description:
        "Searchable dropdown combobox. User can type to filter options.",
    },
    Toast: {
      props: z.object({
        title: z.string().describe("Toast notification title"),
        description: z.string().nullable().describe("Toast body text"),
        appearance: z
          .enum(["default", "warning", "error", "success"])
          .nullable()
          .describe("Toast type with matching icon. Default: default"),
      }),
      description:
        "Notification toast. Shows briefly at bottom-right with optional icon.",
    },
  },
  actions: {},
})
