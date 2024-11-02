import { cn } from "@/lib/utils"
import { TriangleAlert } from "lucide-react"

interface FormErrorProps {
  className?: string
  message?: string
}

export function FormError({ className, message }: FormErrorProps) {
  if (!message) return null

  return (
    <div
      className={cn(
        "bg-destructive/25 p-2 rounded-md flex items-center gap-x-2 text-base text-destructive",
        className
      )}
    >
      <TriangleAlert className="size-4" />
      <p>{message}</p>
    </div>
  )
}
