import React from "react";
import { Card } from "@/components/ui/Card";
import { Building, MapPin, Users, Globe, ExternalLink } from "lucide-react";

interface CompanyCardProps {
  company: any;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-20 h-20 bg-[#f6f5f4] rounded-xl flex items-center justify-center flex-shrink-0 border border-[var(--color-border-subtle)] shadow-sm">
            <Building className="w-8 h-8 text-[var(--color-text-muted)]" />
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-sub-heading text-[var(--color-text-primary)]">
                  {company.name || "Unknown Company"}
                </h2>
                {company.company_url && (
                  <a href={company.company_url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
              {company.tagline && (
                <p className="text-body-regular text-[var(--color-text-secondary)] mt-1">
                  {company.tagline}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-caption text-[var(--color-text-secondary)]">
              {company.industry && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-[#f6f5f4] rounded-md border border-[var(--color-border-subtle)]">
                  {company.industry}
                </div>
              )}
              {company.employee_count && (
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {company.employee_count} Employees
                </div>
              )}
              {company.headquarters && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {company.headquarters}
                </div>
              )}
              {company.website && (
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[var(--color-primary)] hover:underline">
                  <Globe className="w-4 h-4" />
                  Website
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>

      {company.about && (
        <Card className="p-6">
          <h3 className="text-ui-text font-bold mb-3">About</h3>
          <p className="text-caption leading-relaxed whitespace-pre-wrap text-[var(--color-text-secondary)]">
            {company.about}
          </p>
        </Card>
      )}
    </div>
  );
}
