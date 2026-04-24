import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { AlertCircle } from "lucide-react";

interface SearchFormProps {
  type: string;
  query: string;
  setQuery: (q: string) => void;
  location: string;
  setLocation: (l: string) => void;
  isLoading: boolean;
  needsLogin: boolean;
  loginRequired: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
}

export function SearchForm({
  type,
  query,
  setQuery,
  location,
  setLocation,
  isLoading,
  needsLogin,
  loginRequired,
  error,
  onSubmit,
}: SearchFormProps) {
  return (
    <Card className="p-8">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-card-title">Search Parameters</h3>
          {loginRequired ? (
            <Badge className="bg-[#fff8f5] text-[var(--color-warning)] border border-[var(--color-warning)]">Login Required</Badge>
          ) : (
            <Badge className="bg-[#f6f5f4] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)]">
              No Login Required
            </Badge>
          )}
        </div>

        {needsLogin && (
          <div className="bg-[#fff8f5] border border-[var(--color-warning)] p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-[var(--color-warning)] flex-shrink-0" />
              <span className="text-ui-text text-[var(--color-warning)]">
                You must log in to LinkedIn using the Authentication section above before using this search type.
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label={type === "profile" || type === "company" ? "URL or Username/Slug" : "Search Query"}
            placeholder={type === "jobs" ? "e.g. Software Engineer" : type === "profile" ? "e.g. johndoe" : "Enter keywords..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          
          {(type === "jobs" || type === "people") && (
            <Input
              label="Location (Optional)"
              placeholder="e.g. San Francisco, CA"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          )}
        </div>

        {error && (
          <div className="p-4 rounded border border-[var(--color-warning)] bg-[#fff8f5] text-[var(--color-warning)] text-caption">
            {error}
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <Button 
            type="submit" 
            variant="primary" 
            isLoading={isLoading} 
            disabled={needsLogin}
            className="w-full md:w-auto px-8"
          >
            {isLoading ? "Scraping Data..." : "Start Scraping"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
