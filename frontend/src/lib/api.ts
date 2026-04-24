const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export const api = {
  async getStatus() {
    const res = await fetch(`${API_BASE}/status`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch status");
    return res.json();
  },
  
  async login() {
    const res = await fetch(`${API_BASE}/login`, { method: "POST" });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },

  async getProfile(urlOrUsername: string) {
    const isUrl = urlOrUsername.includes("linkedin.com");
    const query = isUrl ? `profile_url=${encodeURIComponent(urlOrUsername)}` : `username=${encodeURIComponent(urlOrUsername)}`;
    const res = await fetch(`${API_BASE}/profile?${query}`);
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
  },

  async searchJobs(query: string, location: string = "") {
    const params = new URLSearchParams({ query, location });
    const res = await fetch(`${API_BASE}/search/jobs?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to search jobs");
    return res.json();
  },

  async searchPeople(query: string, location: string = "") {
    const params = new URLSearchParams({ query, location });
    const res = await fetch(`${API_BASE}/search/people?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to search people");
    return res.json();
  },

  async getCompany(slugOrUrl: string) {
    const isUrl = slugOrUrl.includes("linkedin.com");
    const query = isUrl ? `company_url=${encodeURIComponent(slugOrUrl)}` : `company_slug=${encodeURIComponent(slugOrUrl)}`;
    const res = await fetch(`${API_BASE}/company?${query}`);
    if (!res.ok) throw new Error("Failed to fetch company");
    return res.json();
  }
};
