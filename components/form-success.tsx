import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';

interface FormSuccessProps {
  className?: string;
  message?: string;
}

export function FormSuccess({ className, message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div
      className={cn(
        'bg-emerald-400/25 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-600',
        className
      )}
    >
      <CircleCheck className="size-4" />
      <p>{message}</p>
    </div>
  );
}
