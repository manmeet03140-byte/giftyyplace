"use client";

import { useBuilder } from "@/stores/builder-store";
import { Check } from "lucide-react";
import { clsx } from "clsx";

const STEPS = [
  { num: 1, label: "Base" },
  { num: 2, label: "Items" },
  { num: 3, label: "Finishing" },
  { num: 4, label: "Review" },
];

export function BuilderProgress() {
  const { state } = useBuilder();
  const { currentStep } = state;

  return (
    <div className="w-full py-6 border-b border-[var(--color-charcoal)]/10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between relative">
          {/* Background Line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-[var(--color-charcoal)]/10 z-0" />

          {/* Active Line */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[var(--color-gold)] z-0 transition-all duration-500 ease-in-out"
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          />

          {STEPS.map((step) => {
            const isCompleted = currentStep > step.num;
            const isActive = currentStep === step.num;

            return (
              <div key={step.num} className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300",
                    isCompleted
                      ? "bg-[var(--color-gold)] text-white"
                      : isActive
                      ? "bg-[var(--color-charcoal)] text-white ring-4 ring-[var(--color-charcoal)]/10"
                      : "bg-white text-[var(--color-charcoal-light)] border-2 border-[var(--color-charcoal)]/20"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.num}
                </div>
                <span
                  className={clsx(
                    "text-xs md:text-sm font-medium absolute -bottom-6 w-max text-center transition-colors duration-300",
                    isActive || isCompleted ? "text-[var(--color-charcoal)]" : "text-[var(--color-charcoal-light)]/60"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
