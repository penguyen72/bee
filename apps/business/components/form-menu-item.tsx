import { Button } from "@/components/ui/button"

type option<T> = {
  label: string
  value: T
}

interface Props<T> {
  options: option<T>[]
  value: T
  disabled?: boolean
  onChange: (...event: any[]) => void
  isIcon?: boolean
}

export function FormMenuItem<T>({
  options,
  value,
  isIcon,
  disabled = false,
  onChange
}: Props<T>) {
  return (
    <div className="flex h-10 items-center space-x-1 rounded-md border bg-background p-1 w-fit">
      {options.map((item, index) => {
        return (
          <Button
            key={index}
            className="h-8"
            variant={value === item.value ? "secondary" : "ghost"}
            type="button"
            disabled={disabled}
            size={isIcon ? "icon" : undefined}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </Button>
        )
      })}
    </div>
  )
}
