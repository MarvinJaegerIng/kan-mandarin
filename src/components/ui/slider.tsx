"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      value = 0,
      onValueChange,
      min = 0,
      max = 100,
      step = 0.1,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = parseFloat(e.target.value);
      onValueChange?.(v);
    };

    const percent = max > min ? ((value - min) / (max - min)) * 100 : 0;

    return (
      <div className={cn("relative flex w-full touch-none items-center", className)}>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="absolute h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary opacity-0 [&::-webkit-slider-thumb]:appearance-none"
          {...props}
        />
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <div
            className="absolute h-full bg-primary transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div
          className="absolute h-4 w-4 rounded-full border-2 border-primary bg-background shadow transition-all hover:scale-110"
          style={{ left: `calc(${percent}% - 8px)` }}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
