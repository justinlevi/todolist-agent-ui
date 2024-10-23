import { useState } from "react";
import { gql, request } from "graphql-request";

export const useAIAssistant = (onQueryComplete?: () => void) => {
  const [agentInput, setAgentInput] = useState("");
  const [agentResponse, setAgentResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAgentQuery = async () => {
    if (!agentInput.trim() || isLoading) return;
    setIsLoading(true);
    try {
      const { processQuery } = await request<{ processQuery: string }>(
        "http://localhost:3000/graphql",
        gql`
          query agentQuery($input: String!) {
            processQuery(query: $input)
          }
        `,
        { input: agentInput }
      );
      setAgentResponse(processQuery);
      setAgentInput("");
      onQueryComplete?.();
    } catch (error) {
      console.error("Error processing agent query:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    agentInput,
    setAgentInput,
    agentResponse,
    isLoading,
    handleAgentQuery,
  };
};
