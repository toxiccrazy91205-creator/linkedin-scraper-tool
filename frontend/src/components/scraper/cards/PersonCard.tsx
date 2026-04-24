import React from "react";
import { Card } from "@/components/ui/Card";
import { User, MapPin, Briefcase, ExternalLink } from "lucide-react";

interface PersonCardProps {
  person: any;
}

export function PersonCard({ person }: PersonCardProps) {
  return (
    <Card className="p-5 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-ui-text text-[var(--color-text-primary)] font-bold truncate pr-4">
          {person.name || "Unknown Person"}
        </h4>
        {person.profile_url && (
          <a href={person.profile_url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline flex-shrink-0">
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      
      <div className="space-y-2 mt-2">
        {person.headline && (
          <div className="flex items-start text-caption text-[var(--color-text-secondary)]">
            <Briefcase className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{person.headline}</span>
          </div>
        )}
        
        {person.location && (
          <div className="flex items-center text-caption text-[var(--color-text-secondary)]">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{person.location}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
