"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { AuthStatus } from "@/components/scraper/AuthStatus";
import { SearchForm } from "@/components/scraper/SearchForm";
import { ResultsRenderer } from "@/components/scraper/ResultsRenderer";

export default function ScraperTool() {
  const [type, setType] = useState("jobs");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<any>(null);

  const [status, setStatus] = useState<any>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);

  const checkStatus = async () => {
    try {
      const res = await api.getStatus();
      setStatus(res);
    } catch (e) {
      console.error(e);
    } finally {
      setStatusLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const handleLogin = async () => {
    setLoginLoading(true);
    try {
      await api.login();
      await checkStatus();
    } catch (e) {
      console.error("Login failed", e);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResults(null);

    try {
      let data;
      if (type === "jobs") {
        data = await api.searchJobs(query, location);
      } else if (type === "people") {
        data = await api.searchPeople(query, location);
      } else if (type === "profile") {
        data = await api.getProfile(query);
      } else if (type === "company") {
        data = await api.getCompany(query);
      }
      
      setResults(data);
    } catch (err: any) {
      setError(err.message || "An error occurred during scraping. Did you log in?");
    } finally {
      setIsLoading(false);
    }
  };

  const loginRequired = type === "people" || type === "profile";
  const needsLogin = loginRequired && status && !status.logged_in;

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-4xl">
      
      <div className="pb-6 border-b border-[var(--color-border-subtle)]">
        <h1 className="text-large-heading text-[var(--color-text-primary)] mb-2">Scraper Dashboard</h1>
        <p className="text-body-regular text-[var(--color-text-secondary)]">
          Extract data from LinkedIn profiles, jobs, people, and companies.
        </p>
      </div>

      {/* 1. LOGIN LOGIC SECTION */}
      <AuthStatus 
        status={status} 
        statusLoading={statusLoading} 
        loginLoading={loginLoading} 
        onLogin={handleLogin} 
      />

      {/* 2. SCRAPING LOGIC SECTION */}
      <section>
        <div className="mb-6">
          <h2 className="text-sub-heading mb-1">Scraper Tool</h2>
          <p className="text-body-regular text-[var(--color-text-secondary)]">
            Select an extraction mode and enter your parameters.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pb-6 mb-8 border-b border-[var(--color-border-subtle)]">
          {["jobs", "people", "profile", "company"].map((t) => (
            <button
              key={t}
              onClick={() => {
                setType(t);
                setResults(null);
                setError("");
              }}
              className={`px-5 py-2.5 text-ui-text rounded-lg transition-all border ${
                type === t 
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm font-semibold" 
                  : "bg-[#f6f5f4] text-[var(--color-text-secondary)] border-[var(--color-border-subtle)] hover:bg-white hover:text-[var(--color-text-primary)] hover:border-[#dddddd]"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)} Search
            </button>
          ))}
        </div>

        <SearchForm 
          type={type}
          query={query}
          setQuery={setQuery}
          location={location}
          setLocation={setLocation}
          isLoading={isLoading}
          needsLogin={needsLogin}
          loginRequired={loginRequired}
          error={error}
          onSubmit={handleScrape}
        />

        <ResultsRenderer type={type} results={results} />
      </section>
    </div>
  );
}
