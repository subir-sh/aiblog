import RepoInput from "../components/RepoInput";
import CommitList from "../components/CommitList";
import Loader from "../../../shared/ui/Loader";
import useFetch from "../../../shared/hooks/useFetch";
import { getCommits } from "../../../shared/api/github";
import type { Commit } from "../../../shared/api/github";

export default function GithubPage() {
  const {
    data: commits,
    loading,
    error,
    fetchData,
  } = useFetch<Commit[], [string, string]>(getCommits);

  const handleSearch = (owner: string, repo: string) => {
    fetchData(owner, repo);
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">🔍 GitHub Commit Viewer</h1>
      <RepoInput onSubmit={handleSearch} />

      {loading && <Loader text="데이터 불러오는 중..." />}
      {error && <p className="text-red-500">{error}</p>}
      {commits && <CommitList commits={commits} />}
    </div>
  );
}