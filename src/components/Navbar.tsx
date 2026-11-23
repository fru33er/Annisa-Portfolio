import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import {
  PROFILE_META,
  type Lang,
  type PortfolioContent,
  type Theme,
} from '../data/content'

interface NavbarProps {
  content: PortfolioContent
  lang: Lang
  theme: Theme
  activeSection: string
  onLangChange: (lang: Lang) => void
  onThemeToggle: () => void
  onNavigate: (id: string) => void
}

export function Navbar({
  content,
  lang,
  theme,
  activeSection,
  onLangChange,
  onThemeToggle,
  onNavigate,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!mobileOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  const handleAnchorClick = (
    e: MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault()
    setMobileOpen(false)
    onNavigate(id)
  }

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:inline-flex focus:min-h-[44px] focus:items-center focus:rounded-full focus:bg-[var(--maroon-solid)] focus:px-5 focus:py-2.5 focus:text-[13px] focus:font-semibold focus:text-[var(--text-on-maroon)] focus:shadow-lg"
      >
        {content.nav.skipToContent}
      </a>

      <div data-reveal="down" className="mx-auto max-w-[1200px]">
        <nav
          aria-label="Primary"
          className="glass-nav flex items-center justify-between rounded-full py-1.5 pl-3 pr-2 sm:pl-5 sm:pr-3"
        >
          <a
            href="#hero"
            onClick={(e) => handleAnchorClick(e, 'hero')}
            className="inline-flex min-h-[44px] items-center rounded-full px-2 text-left"
          >
            <span className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
              {PROFILE_META.name}
            </span>
          </a>

          <div className="hidden items-center gap-2 lg:flex">
            {content.nav.links.map((link) => {
              const isActive =
                activeSection === link.id ||
                (link.id === 'hero' && activeSection === 'impact')
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(e) => handleAnchorClick(e, link.id)}
                  className={`relative inline-flex min-h-[44px] items-center rounded-full px-3.5 text-[14px] font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-2 left-0 right-0 mx-auto h-[2px] rounded-full bg-[var(--maroon-bright)] transition-all duration-300 ${
                      isActive ? 'w-4 opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div
              role="group"
              aria-label="Language switcher"
              className="flex items-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-subtle)] p-0.5"
            >
              {(['id', 'en'] as const).map((code) => {
                const active = lang === code
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => onLangChange(code)}
                    aria-pressed={active}
                    className={`font-mono-tech inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full px-2.5 text-[11px] font-semibold uppercase transition-all duration-250 ${
                      active
                        ? 'bg-[var(--maroon-solid)] text-[var(--text-on-maroon)] shadow-sm'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {code}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={onThemeToggle}
              aria-label={
                theme === 'dark'
                  ? content.nav.themeToLight
                  : content.nav.themeToDark
              }
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-subtle)] text-[var(--text-primary)] transition-all duration-250 hover:border-[var(--glass-border-accent)] hover:bg-[var(--maroon-tint)]"
            >
              {theme === 'dark' ? (
                <Moon aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Sun aria-hidden="true" className="h-4 w-4" />
              )}
            </button>

            <a
              href={PROFILE_META.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-[44px] items-center justify-center rounded-full bg-[var(--maroon-solid)] px-5 py-2 text-[13px] font-semibold text-[var(--text-on-maroon)] transition-all duration-250 hover:bg-[var(--maroon-solid-hover)] hover:shadow-md sm:inline-flex"
            >
              <span>{content.nav.downloadCv}</span>
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={
                mobileOpen
                  ? content.nav.menuCloseLabel
                  : content.nav.menuOpenLabel
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--glass-subtle)] text-[var(--text-primary)] lg:hidden"
            >
              {mobileOpen ? (
                <X aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Menu aria-hidden="true" className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>

        {mobileOpen && (
          <div
            id="mobile-nav-drawer"
            className="glass-nav mt-2.5 flex flex-col gap-1.5 rounded-[22px] p-3.5 lg:hidden"
          >
            {content.nav.links.map((link) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(e) => handleAnchorClick(e, link.id)}
                  className={`flex min-h-[44px] items-center justify-between rounded-xl px-4 py-2.5 text-left text-[14px] font-medium transition-colors ${
                    isActive
                      ? 'bg-[var(--maroon-tint)] text-[var(--maroon-bright)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--glass-subtle)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span>{link.label}</span>
                </a>
              )
            })}
            <a
              href={PROFILE_META.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex min-h-[44px] items-center justify-center rounded-full bg-[var(--maroon-solid)] px-4 py-2.5 text-[13px] font-semibold text-[var(--text-on-maroon)]"
            >
              <span>{content.nav.downloadCv}</span>
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
