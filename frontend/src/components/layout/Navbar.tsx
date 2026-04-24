import React from "react";
import { Search } from "lucide-react";

export function Navbar() {
  return (
    <header className="h-16 border-b border-[var(--color-border-subtle)] bg-white flex items-center px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center">
        <Search className="w-6 h-6 text-[var(--color-primary)] mr-2" />
        <span className="font-bold text-[var(--color-text-primary)] text-ui-text">LinkedIn Scraper</span>
      </div>
    </header>
  );
}
