import { TriangleAlert } from 'lucide-react';

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="bg-destructive/25 p-2 rounded-md flex items-center gap-x-2 text-base text-destructive">
      <TriangleAlert className="size-4" />
      <p>{message}</p>
    </div>
  );
}
