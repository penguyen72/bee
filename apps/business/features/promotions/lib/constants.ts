export const PROMOTION_TYPE_OPTIONS = [
  {
    label: "Everything",
    value: "everything"
  },
  {
    label: "Nail Care",
    value: "nailCare"
  },
  {
    label: "Foot Care",
    value: "footCare"
  }
]

export const PROMOTION_UNIT_OPTIONS = [
  { label: "$", value: "$" },
  { label: "%", value: "%" }
]

export const PROMOTION_PROGRESS = {
  IN_PROGRESS: "In Progress",
  PREVIEW: "Preview",
  CONFIRMED: "Confirmed"
} as const
