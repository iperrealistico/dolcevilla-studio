type BudgetSelectProps = {
  props: React.SelectHTMLAttributes<HTMLSelectElement>;
};

export function BudgetSelect({ props }: BudgetSelectProps) {
  return (
    <select
      {...props}
      className="min-h-12 w-full rounded-2xl border border-[var(--color-line)] bg-white/85 px-4 py-3 text-[var(--color-ink)]"
    >
      <option value="">Select a range</option>
      <option value="5000-8000">EUR 5,000 to 8,000</option>
      <option value="8000-12000">EUR 8,000 to 12,000</option>
      <option value="12000-plus">EUR 12,000+</option>
    </select>
  );
}
