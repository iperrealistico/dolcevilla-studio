export default function GalleryLoading() {
  return (
    <main className="h-[100dvh] overflow-hidden bg-[var(--color-bg)] text-[var(--color-ink)]">
      <div className="relative flex h-full flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(95,113,103,0.12),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(160,184,170,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(177,149,110,0.08),transparent_22%)]" />
        <div className="relative z-10 flex items-start justify-between gap-4 px-4 pt-4 sm:px-6 lg:px-8">
          <div className="hidden w-full max-w-sm rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--surface-overlay)] px-5 py-4 shadow-[var(--shadow-floating)] backdrop-blur-xl sm:block">
            <div className="h-3 w-16 rounded-full bg-[var(--surface-panel)]" />
            <div className="mt-4 h-10 w-56 rounded-[var(--radius-panel)] bg-[var(--surface-panel)]" />
            <div className="mt-3 h-4 w-full rounded-full bg-[var(--surface-panel-soft)]" />
            <div className="mt-2 h-4 w-4/5 rounded-full bg-[var(--surface-panel-soft)]" />
          </div>
          <div className="ml-auto flex rounded-[var(--radius-frame)] border border-[var(--color-line)] bg-[var(--surface-overlay)] p-2 shadow-[var(--shadow-floating)] backdrop-blur-xl">
            <div className="h-11 w-11 rounded-[var(--radius-control)] bg-[var(--surface-panel)]" />
            <div className="ml-2 h-11 w-11 rounded-[var(--radius-control)] bg-[var(--surface-panel)]" />
            <div className="ml-2 h-11 w-[4.75rem] rounded-[var(--radius-control)] bg-[var(--surface-panel)]" />
          </div>
        </div>
        <div className="relative z-10 flex-1 overflow-hidden px-3 pb-4 pt-24 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4 lg:gap-5">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-[calc(var(--radius-frame)+0.08rem)] border border-[var(--color-line)] bg-[var(--surface-panel)] p-2 shadow-[var(--shadow-soft)]">
                <div
                  className="w-full rounded-[var(--radius-frame)] bg-[var(--surface-panel-soft)]"
                  style={{ aspectRatio: index % 3 === 0 ? "4 / 5" : index % 3 === 1 ? "3 / 4" : "1 / 1.25" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
