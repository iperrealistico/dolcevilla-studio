import { inquiryFormContent } from "@/content/site/forms";

type BudgetSelectProps = {
  props: React.SelectHTMLAttributes<HTMLSelectElement>;
};

export function BudgetSelect({ props }: BudgetSelectProps) {
  return (
    <select
      {...props}
      className="min-h-12 w-full rounded-2xl border border-[var(--color-line)] bg-white/85 px-4 py-3 text-[var(--color-ink)]"
    >
      {inquiryFormContent.budgetOptions.map((option) => (
        <option key={option.value || "empty"} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
