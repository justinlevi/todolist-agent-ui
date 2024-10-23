import React from "react";
import { SequenceItem } from "../types";

function getSequenceItemBgColor(item: SequenceItem): string {
  if (item.title === "CALL_TOOL" && item.type === "AI") return "bg-blue-100";
  if (item.title === "START") return "bg-green-100";
  if (item.title === "END") return "bg-red-300";
  return "bg-yellow-100";
}

interface SequenceProps {
  sequence: SequenceItem[];
}

const Sequence: React.FC<SequenceProps> = ({ sequence }) => {
  return (
    <div className="w-full max-w-2xl p-4 overflow-y-auto border border-gray-300 max-h-[48rem]">
      <h2 className="mb-4 text-lg font-bold">Sequence:</h2>
      {sequence.map((item, index) => (
        <div
          key={`step-${index}`}
          className={`p-4 mb-4 rounded-lg ${getSequenceItemBgColor(item)}`}
        >
          <h3 className="font-bold">
            {`${index + 1}: ${item.title}${index !== 0 ? " Node" : ""}`}
            {item.title === "CALL_TOOL" && index > 0 && (
              <span>({sequence[index - 1].toolCalls})</span>
            )}
            {item.title === "START" && index > 0 && <span>(HUMAN)</span>}
          </h3>
          {item.type === "AI" && item.toolCalls && (
            <p>Chooses tool: {item.toolCalls}</p>
          )}
          {item.content && (
            <p className="mt-2 text-sm">
              {`${index !== 0 ? "" : "Query: "} ${item.content}`}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sequence;
