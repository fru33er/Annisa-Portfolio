import type { CSSProperties } from 'react'

interface SectionHeaderProps {
  index: string
  title: string
  subtitle?: string
}

export function SectionHeader({ index, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3.5 px-1 pb-1">
      <span
        data-reveal="scale"
        style={{ '--reveal-delay': '0ms' } as CSSProperties}
        className="font-mono-tech inline-flex items-center justify-center rounded-full border border-[var(--glass-border-accent)] bg-[var(--maroon-tint)] px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.06em] text-[var(--maroon-bright)] backdrop-blur-md"
      >
        {index}
      </span>
      <span
        data-reveal="up"
        style={{ '--reveal-delay': '70ms' } as CSSProperties}
        className="text-[15px] font-semibold tracking-[-0.015em] text-[var(--text-primary)] sm:text-[16px]"
      >
        {title}
      </span>
      <div
        aria-hidden="true"
        data-reveal="line"
        style={{ '--reveal-delay': '130ms' } as CSSProperties}
        className="h-px flex-1 bg-gradient-to-r from-[var(--glass-border-accent)] via-[var(--divider)] to-transparent"
      />
      {subtitle && (
        <span
          data-reveal="right"
          style={{ '--reveal-delay': '180ms' } as CSSProperties}
          className="font-mono-tech hidden text-[11px] tracking-[0.08em] text-[var(--text-muted)] uppercase sm:inline"
        >
          {subtitle}
        </span>
      )}
    </div>
  )
}
