import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";

interface CounterProps {
  quantity: number;
  plusQuantity: () => void;
  minusQuantity: () => void;
}

export default function Counter({ quantity, plusQuantity, minusQuantity }: CounterProps) {
  return (
    <Card className="w-full max-w-[200px]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={minusQuantity}
            aria-label="Decrease count"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-4xl font-bold">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={plusQuantity}
            aria-label="Increase count"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
