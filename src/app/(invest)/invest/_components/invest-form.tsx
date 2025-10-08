"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { GlassCard } from "@/components/ui/glass-card";
import { StatusPill } from "@/app/_components/status-pill";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  solAmount: z
    .string()
    .min(1, "Enter an amount")
    .refine((value) => Number(value) > 0, "Amount must be greater than zero"),
});

type FormValues = z.infer<typeof formSchema>;

interface InvestFormProps {
  tokenPrice: number;
}

export function InvestForm({ tokenPrice }: InvestFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { solAmount: "200" },
    mode: "onChange",
  });

  const solAmount = Number(form.watch("solAmount") || 0);
  const slippageBps = 50;
  const executionProbability = 0.97;
  const feeUsd = 0.28;

  const quote = useMemo(() => {
    if (!solAmount || Number.isNaN(solAmount)) {
      return {
        tokensOut: 0,
        worstCaseOut: 0,
      };
    }

    const tokensOut = solAmount / tokenPrice;
    const worstCaseOut = tokensOut * (1 - slippageBps / 10_000);

    return {
      tokensOut,
      worstCaseOut,
    };
  }, [solAmount, tokenPrice]);

  const onSubmit = (values: FormValues) => {
    console.log("submitted", values);
    // TODO: integrate wallet + Jupiter mock action
  };

  return (
    <GlassCard
      padding="lg"
      variant="trust"
      trustLevel="high"
      aiState="processing"
      className="space-y-8"
    >
      <header className="space-y-3">
        <StatusPill tone="positive" label="Invest" detail="Trust-first" />
        <h2 className="text-3xl font-semibold text-(--text-primary)">
          Acquire SOLAR tokens with constraints surfaced before you confirm.
        </h2>
        <p className="text-sm text-(--text-secondary)">
          Quotes use Jupiter mocks, worst-case receives, and Solana fee
          estimates. Program and PDA decoding keep you in control of authority.
        </p>
      </header>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-8 md:grid-cols-[minmax(0,420px)_minmax(0,1fr)] md:items-start"
      >
        <div className="space-y-5">
          <div>
            <label className="text-xs uppercase tracking-[0.32em] text-(--text-tertiary)">
              Amount in SOL
            </label>
            <input
              {...form.register("solAmount")}
              inputMode="decimal"
              className={cn(
                "mt-2 w-full rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3 text-lg font-semibold text-(--text-primary) outline-none",
                form.formState.errors.solAmount
                  ? "border-(--critical-primary)"
                  : "focus-visible:u-focus-ring"
              )}
              placeholder="200"
            />
            {form.formState.errors.solAmount ? (
              <p className="mt-2 text-xs text-(--critical-primary)">
                {form.formState.errors.solAmount.message}
              </p>
            ) : null}
          </div>
          <div className="grid gap-3 text-sm text-(--text-secondary)">
            <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3">
              <div className="flex items-center justify-between text-(--text-primary)">
                <span className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
                  Quote received
                </span>
                <span className="text-lg font-semibold text-(--text-primary)">
                  {quote.tokensOut ? quote.tokensOut.toFixed(2) : "—"} SOLAR
                </span>
              </div>
              <p className="mt-1 text-xs text-(--text-secondary)">
                Estimated at {tokenPrice.toFixed(2)} USD per SOLAR
              </p>
            </div>
            <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3">
              <div className="flex items-center justify-between text-(--text-primary)">
                <span className="text-xs uppercase tracking-[0.24em] text-(--text-tertiary)">
                  Worst-case receives
                </span>
                <span className="text-lg font-semibold text-(--caution-primary)">
                  {quote.worstCaseOut ? quote.worstCaseOut.toFixed(2) : "—"}{" "}
                  SOLAR
                </span>
              </div>
              <p className="mt-1 text-xs text-(--text-secondary)">
                Slippage guarded at {(slippageBps / 100).toFixed(2)}% • Fees $
                {feeUsd.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="space-y-2 rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-4 text-xs text-(--text-secondary)">
            <p className="uppercase tracking-[0.24em] text-(--text-tertiary)">
              Constraint highlights
            </p>
            <ul className="space-y-1">
              <li>• Max AI spend per tx $1,000</li>
              <li>• Daily allowance $5,000</li>
              <li>
                • PDA: AIAuthPDA • Programs: AssetRegistry, RevenueDistribution
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <GlassCard
            padding="md"
            variant="neural"
            aiState="learning"
            trustLevel="medium"
            className="space-y-3"
          >
            <p className="text-xs uppercase tracking-[0.32em] text-(--text-tertiary)">
              Execution probability
            </p>
            <p className="text-3xl font-semibold text-(--text-primary)">
              {(executionProbability * 100).toFixed(0)}%
            </p>
            <p className="text-sm text-(--text-secondary)">
              Based on mock Jupiter route with compute budget boosts and latest
              priority fee guidance.
            </p>
          </GlassCard>
          <Button type="submit" variant="neon" size="lg" className="w-full">
            Preview transaction
          </Button>
          <p className="text-xs text-(--text-secondary)">
            We never request private keys. Simulation receipts include decoded
            program IDs, PDA authority, and proof hashes for audit trails.
          </p>
        </div>
      </form>
    </GlassCard>
  );
}
