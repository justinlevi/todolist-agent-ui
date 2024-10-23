import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Loader } from "lucide-react";
import { Input } from "./Input";
import { Button } from "./Button";

import { useAIAssistant } from "../hooks/useAIAssistant";
import { useEffect, useState } from "react";

type AIAssistantProps = ReturnType<typeof useAIAssistant>;

export const AIAssistant: React.FC<AIAssistantProps> = ({
  agentInput,
  setAgentInput,
  handleAgentQuery,
  isLoading,
  agentResponse,
}) => {
  const [showResponse, setShowResponse] = useState(true);

  useEffect(() => {
    if (agentResponse) {
      setShowResponse(true);
    }
  }, [agentResponse]);

  return (
    <>
      <div className="flex items-center">
        <div className="flex-grow">
          <Input
            type="text"
            value={agentInput}
            onChange={(e) => setAgentInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAgentQuery();
            }}
            placeholder="Enter AI Task Instruction"
            className="w-full"
            aria-label="Enter AI Task Instruction"
            disabled={isLoading}
          />
        </div>
        <Button
          onClick={handleAgentQuery}
          className="px-4 py-2 ml-2 font-bold text-white transition-colors bg-blue-500 rounded hover:bg-blue-400"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="animate-spin" size={18} />
          ) : (
            "✨ 🦄 ✨"
          )}
        </Button>
      </div>
      {agentResponse && showResponse && (
        <div className="relative p-5 mt-4 bg-yellow-100 rounded-lg">
          <button
            onClick={() => setShowResponse(false)}
            className="absolute text-gray-500 top-2 right-2 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={16} />
          </button>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h3: ({ node, ...props }) => (
                <h3 className="pb-3 text-lg font-bold" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className="pb-6 pl-6 space-y-2 text-sm list-decimal"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="pb-6 pl-6 space-y-2 list-disc" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            }}
          >
            {agentResponse}
          </ReactMarkdown>
        </div>
      )}
    </>
  );
};
