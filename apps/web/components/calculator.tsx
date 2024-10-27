import { Button } from '@bee/ui/components/ui/button';
import { Separator } from '@bee/ui/components/ui/separator';
import { Delete } from 'lucide-react';

const operations = [
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '.', value: '.' },
  { label: '0', value: '0' },
  { label: 'x', value: 'delete' },
];

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export function Calculator({ value, setValue }: Props) {
  function performOperation(operation: string) {
    if (operation === 'delete') {
      setValue((prevValue) => {
        if (!prevValue) {
          return prevValue;
        }
        const newValue = prevValue.slice(0, -1);
        return newValue;
      });
    } else {
      setValue((prevValue) => {
        if (prevValue.length - 3 >= 0 && prevValue[prevValue.length - 3] === '.') {
          return prevValue;
        }
        return prevValue + operation;
      });
    }
  }

  return (
    <div className="flex flex-col gap-6 py-8 px-12 bg-white rounded-2xl h-full">
      <p className="text-4xl text-center font-bold">{value ? `$${value}` : '$0.00'}</p>
      <Separator />
      <div className="grid grid-cols-3 gap-4 h-full">
        {operations.map((operation, index) => {
          const content = operation.value === 'delete' ? <Delete color="black" size={48} /> : operation.value;

          return (
            <Button
              key={index}
              className="text-2xl font-semibold"
              variant="ghost"
              size="lg"
              onClick={() => performOperation(operation.value)}
            >
              {content}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
