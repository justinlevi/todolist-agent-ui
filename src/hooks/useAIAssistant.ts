import { useState } from "react";

export const useAIAssistant = (onQueryComplete?: () => void) => {
  const [agentInput, setAgentInput] = useState("");
  const [agentResponse, setAgentResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [status, setStatus] = useState("");

  const handleAgentQuery = async () => {
    if (!agentInput.trim() || isLoading) return;
    setIsLoading(true);
    setStreamingContent("");
    setStatus("");

    try {
      const response = await fetch(
        "http://localhost:8000/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: agentInput }],
            model: "agent",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let isStreamComplete = false;

        while (!isStreamComplete) {
          const { value, done } = await reader.read();
          if (done) {
            isStreamComplete = true;
            break;
          }
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ") && line.slice(6) !== "[DONE]") {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.type === "status" && data.content !== status) {
                  setStatus(data.content);
                } else if (data.choices && data.choices[0].delta.content) {
                  if (status !== "") {
                    setStatus("");
                  }
                  setStreamingContent(
                    (prev) => prev + data.choices[0].delta.content
                  );
                }
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            } else if (line.slice(6) === "[DONE]") {
              isStreamComplete = true;
            }
          }
        }
      }

      setAgentResponse(streamingContent);
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
    streamingContent,
    status,
  };
};
