import { useState } from "react";

interface RepoInputProps {
  onSubmit: (owner: string, repo: string) => void;
}

export default function RepoInput({ onSubmit }: RepoInputProps) {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!owner || !repo) return;
    onSubmit(owner, repo);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-2 items-center justify-center my-4"
    >
      <input
        type="text"
        placeholder="owner (ex: facebook)"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <input
        type="text"
        placeholder="repo (ex: react)"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        가져오기
      </button>
    </form>
  );
}