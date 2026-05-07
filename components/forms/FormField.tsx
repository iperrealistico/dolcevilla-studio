import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ label, error, children }: FormFieldProps) {
  return (
    <label className="space-y-2 text-sm text-[var(--color-mist)]">
      <span className="block font-medium text-[var(--color-ink)]">{label}</span>
      {children}
      {error ? (
        <span className="block text-xs text-[var(--color-danger)]">
          {error}
        </span>
      ) : null}
    </label>
  );
}
