/**
 * AgentSidebarWrapper - Client-side Agent Q&A Interface
 *
 * Interactive sidebar for natural language questions to AI agents
 * with conversation history and suggested questions.
 *
 * @see PRD Section 7.3 - Dashboard Intelligence Layer
 */

"use client";

import * as React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import {
  AgentSidebar,
  type AgentMessage,
} from "@/components/intelligence/AgentSidebar";
import type { AgentPersona } from "@/lib/types";

// Fetch agent response from API
async function askAgent(
  agent: AgentPersona,
  question: string
): Promise<AgentMessage> {
  const response = await fetch("/api/agents/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agent, question }),
  });

  if (!response.ok) {
    throw new Error("Failed to get agent response");
  }

  const json = await response.json();
  return json.data;
}

export function AgentSidebarWrapper() {
  const [selectedAgent, setSelectedAgent] =
    React.useState<AgentPersona>("operations");
  const [messages, setMessages] = React.useState<AgentMessage[]>([]);
  const [isThinking, setIsThinking] = React.useState(false);

  const handleSendMessage = React.useCallback(
    async (message: string, agent: AgentPersona) => {
      // Add user message
      const userMessage: AgentMessage = {
        id: `msg-user-${Date.now()}`,
        role: "user",
        content: message,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsThinking(true);

      try {
        // Call API
        const response = await askAgent(agent, message);
        setMessages((prev) => [...prev, response]);
      } catch (error) {
        // Add error message
        const errorMessage: AgentMessage = {
          id: `msg-error-${Date.now()}`,
          role: "agent",
          agent,
          content: "Sorry, I encountered an error processing your request.",
          timestamp: new Date().toISOString(),
          error: error instanceof Error ? error.message : "Unknown error",
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsThinking(false);
      }
    },
    []
  );

  return (
    <GlassCard
      padding="lg"
      variant="neural"
      aiState="learning"
      trustLevel="high"
      className="h-[600px] flex flex-col"
    >
      <div
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.25),transparent)]"
        aria-hidden
      />

      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.35em] text-(--text-tertiary)">
          AI Agent Q&A
        </p>
        <h3 className="text-xl font-semibold text-(--text-primary)">
          Ask agents about their decisions
        </h3>
      </div>

      <div className="flex-1 min-h-0">
        <AgentSidebar
          selectedAgent={selectedAgent}
          messages={messages}
          isThinking={isThinking}
          agentHealth="online"
          onSendMessage={handleSendMessage}
          onSelectAgent={setSelectedAgent}
          className="h-full"
        />
      </div>

      <div className="mt-4 rounded-2xl border border-(--glass-border-soft) bg-(--glass-surface-primary) px-4 py-3">
        <p className="text-sm text-(--text-secondary)">
          Switch between agents using tabs or ask natural language questions to
          understand their reasoning and constraints.
        </p>
      </div>
    </GlassCard>
  );
}
