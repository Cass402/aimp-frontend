/**
 * RecentTransactions - On-chain Activity Display
 *
 * Shows recent blockchain transactions with verification links,
 * agent attribution, and transaction status indicators.
 *
 * @see PRD Section 7.6 - Transaction Receipts
 */

import { GlassCard } from "@/components/ui/glass-card";
import {
  TxReceipt,
  type SolanaTransaction,
} from "@/components/intelligence/TxReceipt";

// Fetch transactions from API
async function getTransactions(): Promise<SolanaTransaction[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/transactions?limit=3`, {
      next: { revalidate: 30 }, // Refresh every 30 seconds
    });

    if (!response.ok) {
      console.error("Failed to fetch transactions:", response.statusText);
      return [];
    }

    const json = await response.json();

    // The API returns { data: transactions[] } where transactions is the array directly
    return json.data || [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export async function RecentTransactions() {
  const transactions = await getTransactions();

  // Early return if no transactions
  if (!transactions || transactions.length === 0) {
    return (
      <GlassCard
        padding="lg"
        variant="neural"
        aiState="processing"
        trustLevel="high"
        className="space-y-6"
      >
        <div
          className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.25),transparent)]"
          aria-hidden
        />

        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
              On-chain Activity
            </p>
            <h3 className="text-xl font-semibold text-(--text-primary)">
              No recent transactions
            </h3>
          </div>
        </header>

        <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3">
          <p className="text-sm text-(--text-secondary)">
            Transaction history will appear here once blockchain activity is
            detected.
          </p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard
      padding="lg"
      variant="neural"
      aiState="processing"
      trustLevel="high"
      className="space-y-6"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.25),transparent)]"
        aria-hidden
      />

      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
            On-chain Activity
          </p>
          <h3 className="text-xl font-semibold text-(--text-primary)">
            {transactions.length} recent transactions with blockchain
            verification
          </h3>
        </div>
      </header>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <TxReceipt key={tx.signature} transaction={tx} compact showDetails />
        ))}
      </div>

      <div className="rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3">
        <p className="text-sm text-(--text-secondary)">
          All transactions are cryptographically signed and immutably recorded
          on Solana. Click signature to copy or view in explorer for independent
          verification.
        </p>
      </div>
    </GlassCard>
  );
}
