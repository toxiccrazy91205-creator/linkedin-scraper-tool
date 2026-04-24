import React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { User, MapPin, Building, Briefcase, Link as LinkIcon, BookOpen } from "lucide-react";

interface ProfileCardProps {
  profile: any;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-sub-heading text-[var(--color-text-primary)]">
                {profile.name || "Unknown Profile"}
              </h2>
              {profile.headline && (
                <p className="text-body-regular text-[var(--color-text-secondary)] mt-1">
                  {profile.headline}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-4 text-caption text-[var(--color-text-secondary)]">
              {profile.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </div>
              )}
              {profile.followers && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {profile.followers} Followers
                </div>
              )}
              {profile.profile_url && (
                <a href={profile.profile_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[var(--color-primary)] hover:underline">
                  <LinkIcon className="w-4 h-4" />
                  LinkedIn Profile
                </a>
              )}
            </div>

            {profile.about && (
              <div className="pt-4 border-t border-[var(--color-border-subtle)]">
                <h3 className="text-ui-text font-bold mb-2">About</h3>
                <p className="text-caption leading-relaxed whitespace-pre-wrap text-[var(--color-text-secondary)]">
                  {profile.about}
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {profile.experience && profile.experience.length > 0 && (
        <Card className="p-6">
          <h3 className="text-ui-text font-bold mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[var(--color-text-secondary)]" />
            Experience
          </h3>
          <div className="space-y-6">
            {profile.experience.map((exp: any, i: number) => (
              <div key={i} className={`flex gap-4 ${i !== profile.experience.length - 1 ? "pb-6 border-b border-[var(--color-border-subtle)]" : ""}`}>
                <div className="w-10 h-10 rounded bg-[#f6f5f4] flex items-center justify-center flex-shrink-0 border border-[var(--color-border-subtle)]">
                  <Building className="w-5 h-5 text-[var(--color-text-muted)]" />
                </div>
                <div>
                  <h4 className="text-ui-text font-bold">{exp.title}</h4>
                  <div className="text-caption text-[var(--color-text-secondary)] mt-0.5">{exp.company}</div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-1">{exp.date_range}</div>
                  {exp.description && (
                    <p className="text-caption mt-2 text-[var(--color-text-secondary)]">{exp.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {profile.education && profile.education.length > 0 && (
        <Card className="p-6">
          <h3 className="text-ui-text font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--color-text-secondary)]" />
            Education
          </h3>
          <div className="space-y-6">
            {profile.education.map((edu: any, i: number) => (
              <div key={i} className={`flex gap-4 ${i !== profile.education.length - 1 ? "pb-6 border-b border-[var(--color-border-subtle)]" : ""}`}>
                <div>
                  <h4 className="text-ui-text font-bold">{edu.school}</h4>
                  <div className="text-caption text-[var(--color-text-secondary)] mt-0.5">{edu.degree}</div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-1">{edu.date_range}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
