import React from "react";
import { Card } from "@/components/ui/Card";
import { Briefcase, MapPin, Building, Calendar, ExternalLink } from "lucide-react";

interface JobCardProps {
  job: any;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="p-5 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-ui-text text-[var(--color-text-primary)] font-bold truncate pr-4">
          {job.title || "Unknown Position"}
        </h4>
        {job.job_url && (
          <a href={job.job_url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline flex-shrink-0">
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      
      <div className="space-y-2 mt-2">
        {job.company && (
          <div className="flex items-center text-caption text-[var(--color-text-secondary)]">
            <Building className="w-4 h-4 mr-2" />
            <span className="truncate">{job.company}</span>
          </div>
        )}
        
        {job.location && (
          <div className="flex items-center text-caption text-[var(--color-text-secondary)]">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="truncate">{job.location}</span>
          </div>
        )}
        
        {job.posted_date && (
          <div className="flex items-center text-caption text-[var(--color-text-secondary)]">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{job.posted_date}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
