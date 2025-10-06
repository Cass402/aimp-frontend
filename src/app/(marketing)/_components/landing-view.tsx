import { FeatureHighlights } from "./feature-highlights";
import { FlowNarrative } from "./flow-narrative";
import { Hero } from "./hero";

export function MarketingLandingView() {
  return (
    <div className="space-y-16 pb-16">
      <Hero />
      <FeatureHighlights />
      <FlowNarrative />
    </div>
  );
}
