"use client";

import { LoadingButton } from "@/components/LoadingButton";
import { useTransition } from "react";

export function DeleteApplication() {
  const [isPending, startTransition] = useTransition();

  async function handleDeleteApplication() {
  }

  return (
    <div className="max-w-md">
      <div className="border-destructive/20 bg-destructive/5 rounded-lg border p-4">
        <div className="space-y-3">
          <div>
            <h2 className="text-destructive font-medium">Delete Application</h2>
            <p className="text-muted-foreground text-sm">
              This action will delete the entire application. This cannot be
              undone.
            </p>
          </div>
          <LoadingButton
            loading={isPending}
            onClick={handleDeleteApplication}
            variant="destructive"
            className="w-full"
          >
            Delete Application
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
