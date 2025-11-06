import axios from "axios";

export interface Commit {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

export interface PullRequest {
  number: number;
  title: string;
  url: string;
  createdAt: string;
  author: {
    login: string;
    url: string;
  };
}

const api = axios.create({
  baseURL: "/api/github",
});

export const getCommits = async (owner: string, repo: string): Promise<Commit[]> => {
  const res = await api.get("/commits", { params: { owner, repo } });
  return res.data;
};

export const getPRs = async (owner: string, repo: string): Promise<PullRequest[]> => {
  const res = await api.get("/prs", { params: { owner, repo } });
  return res.data;
};