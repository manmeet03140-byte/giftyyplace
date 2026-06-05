"use client";

import { BuilderProvider, useBuilder } from "@/stores/builder-store";
import { BuilderProgress } from "@/components/builder/BuilderProgress";
import { BuilderSidebar } from "@/components/builder/BuilderSidebar";
import { StepBase } from "@/components/builder/steps/StepBase";
import { StepItems } from "@/components/builder/steps/StepItems";
import { StepFinishing } from "@/components/builder/steps/StepFinishing";
import { StepReview } from "@/components/builder/steps/StepReview";

function BuilderOrchestrator() {
  const { state } = useBuilder();

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] pt-24 pb-24">
      <BuilderProgress />
      
      <div className="container-premium mt-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content Area */}
          <div className="flex-grow lg:w-2/3">
            {state.currentStep === 1 && <StepBase />}
            {state.currentStep === 2 && <StepItems />}
            {state.currentStep === 3 && <StepFinishing />}
            {state.currentStep === 4 && <StepReview />}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <BuilderSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuildHamperPage() {
  return (
    <BuilderProvider>
      <BuilderOrchestrator />
    </BuilderProvider>
  );
}
