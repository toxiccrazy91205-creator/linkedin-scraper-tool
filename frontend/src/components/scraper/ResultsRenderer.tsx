import React from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { JobCard } from "./cards/JobCard";
import { PersonCard } from "./cards/PersonCard";
import { ProfileCard } from "./cards/ProfileCard";
import { CompanyCard } from "./cards/CompanyCard";

interface ResultsRendererProps {
  type: string;
  results: any;
}

export function ResultsRenderer({ type, results }: ResultsRendererProps) {
  if (!results) return null;

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `linkedin_${type}_results.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pt-8 mt-8 border-t border-[var(--color-border-subtle)]">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-card-title">Results</h3>
          <p className="text-caption text-[var(--color-text-secondary)]">
            {results.total_count ? `Found ${results.total_count}` : "Successfully retrieved data."}
          </p>
        </div>
        <Button variant="secondary" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" />
          Export JSON
        </Button>
      </div>

      {type === "jobs" && results.results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.results.map((job: any, index: number) => (
            <JobCard key={index} job={job} />
          ))}
          {results.results.length === 0 && (
            <div className="col-span-full p-8 text-center text-[var(--color-text-secondary)] bg-[#f6f5f4] rounded-xl border border-[var(--color-border-subtle)]">
              No jobs found.
            </div>
          )}
        </div>
      )}

      {type === "people" && results.results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.results.map((person: any, index: number) => (
            <PersonCard key={index} person={person} />
          ))}
          {results.results.length === 0 && (
            <div className="col-span-full p-8 text-center text-[var(--color-text-secondary)] bg-[#f6f5f4] rounded-xl border border-[var(--color-border-subtle)]">
              No people found.
            </div>
          )}
        </div>
      )}

      {type === "profile" && (
        <ProfileCard profile={results} />
      )}

      {type === "company" && (
        <CompanyCard company={results} />
      )}
      
      {/* Fallback to raw JSON if it's an unrecognized format */}
      {(!["jobs", "people", "profile", "company"].includes(type) || results.error) && (
        <Card className="p-6 overflow-hidden">
          <div className="bg-[#f6f5f4] rounded border border-[var(--color-border-subtle)] p-4 max-h-[500px] overflow-auto">
            <pre className="text-[13px] leading-relaxed text-[#31302e]">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        </Card>
      )}
    </div>
  );
}
