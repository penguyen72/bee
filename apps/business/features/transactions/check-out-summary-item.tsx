import { CircleMinus } from "lucide-react"

interface Props {
  label: string
  value: number
  handleDelete: () => void
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
})

export function CheckOutSummaryItem({ label, value, handleDelete }: Props) {
  return (
    <div className="flex gap-2 items-center justify-between">
      <div className="flex gap-2 items-center">
        <CircleMinus
          className="hover:cursor-pointer"
          onClick={() => handleDelete()}
        />
        <p className="font-semibold">{label}</p>
      </div>
      <p className="font-semibold">{formatter.format(value)}</p>
    </div>
  )
}
