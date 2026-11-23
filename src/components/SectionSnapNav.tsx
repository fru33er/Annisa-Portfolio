import type { MouseEvent } from 'react'

interface SectionSnapNavProps {
  sections: { id: string; label: string }[]
  activeSection: string
  onSelect: (id: string) => void
}

export function SectionSnapNav({
  sections,
  activeSection,
  onSelect,
}: SectionSnapNavProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    onSelect(id)
  }

  return (
    <aside
      aria-label="Section navigation"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end xl:flex"
    >
      <nav
        aria-label="Sections"
        className="glass-nav flex flex-col items-center rounded-full p-1"
      >
        {sections.map((section) => {
          const isActive = activeSection === section.id
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={(e) => handleClick(e, section.id)}
              aria-label={section.label}
              title={section.label}
              className="group relative flex h-11 w-11 items-center justify-center rounded-full"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-12 translate-x-1 whitespace-nowrap rounded-full border border-[var(--glass-border)] bg-[var(--glass-strong)] px-2.5 py-1 font-mono-tech text-[10px] font-medium tracking-wider text-[var(--text-primary)] opacity-0 backdrop-blur-md transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              >
                {section.label}
              </span>
              <span
                aria-hidden="true"
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-5 w-2 bg-[var(--maroon-bright)] shadow-[0_0_12px_var(--maroon-bright)]'
                    : 'h-2 w-2 bg-[var(--text-muted)] opacity-70 group-hover:scale-125 group-hover:bg-[var(--maroon-bright)] group-hover:opacity-100 group-focus-visible:scale-125 group-focus-visible:bg-[var(--maroon-bright)] group-focus-visible:opacity-100'
                }`}
              />
            </a>
          )
        })}
      </nav>
    </aside>
  )
}
