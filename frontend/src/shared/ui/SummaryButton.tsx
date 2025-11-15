import { useState } from "react";

interface SummaryButtonProps {
  title: string;
  content: string;
}

export default function SummaryButton({ title, content }: SummaryButtonProps) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/llm/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSummary(data.result);
    } catch (err) {
      console.error(err);
      alert("요약 생성 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inline-flex flex-col items-end">
      <button
        onClick={handleClick}
        disabled={loading}
        className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        {loading ? "생성 중..." : "요약 생성"}
      </button>

      {summary && (
        <div className="mt-3 text-left bg-gray-50 border rounded p-2 whitespace-pre-wrap text-sm max-w-xs">
          {summary}
        </div>
      )}
    </div>
  );
}