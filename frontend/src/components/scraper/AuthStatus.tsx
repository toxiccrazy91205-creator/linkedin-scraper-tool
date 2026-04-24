import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { LogIn, CheckCircle2, AlertCircle } from "lucide-react";

interface AuthStatusProps {
  status: any;
  statusLoading: boolean;
  loginLoading: boolean;
  onLogin: () => void;
}

export function AuthStatus({ status, statusLoading, loginLoading, onLogin }: AuthStatusProps) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-sub-heading mb-1">LinkedIn Authentication</h2>
        <p className="text-body-regular text-[var(--color-text-secondary)]">
          Required for full profiles and people search. Opens a browser window for manual login.
        </p>
      </div>
      <Card className="p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            {statusLoading ? (
              <div className="text-ui-text text-[var(--color-text-muted)] animate-pulse">Checking status...</div>
            ) : status?.logged_in ? (
              <>
                <CheckCircle2 className="w-8 h-8 text-[var(--color-success)] flex-shrink-0" />
                <div>
                  <div className="text-ui-text text-[var(--color-text-primary)]">Authenticated</div>
                  <div className="text-caption text-[var(--color-text-secondary)]">Session cookies are active.</div>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="w-8 h-8 text-[var(--color-warning)] flex-shrink-0" />
                <div>
                  <div className="text-ui-text text-[var(--color-text-primary)]">Not Logged In</div>
                  <div className="text-caption text-[var(--color-text-secondary)]">Limited features available.</div>
                </div>
              </>
            )}
          </div>
          
          <Button 
            variant={status?.logged_in ? "secondary" : "primary"} 
            onClick={onLogin} 
            isLoading={loginLoading}
          >
            <LogIn className="w-4 h-4 mr-2" />
            {status?.logged_in ? "Re-Login" : "Login to LinkedIn"}
          </Button>
        </div>
      </Card>
    </section>
  );
}
