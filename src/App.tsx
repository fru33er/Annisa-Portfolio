import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import {
  ArrowUpRight,
  Award,
  Briefcase,
  Check,
  Linkedin,
  Mail,
  MessageSquare,
  Pause,
  Play,
  TrendingUp,
  Users,
} from 'lucide-react'
import { CONTENT, PROFILE_META, type Lang, type Theme } from './data/content'
import { AuroraBackground } from './components/AuroraBackground'
import { CustomCursor } from './components/CustomCursor'
import { GlassCard } from './components/GlassCard'
import { Navbar } from './components/Navbar'
import { SectionHeader } from './components/SectionHeader'
import { SectionSnapNav } from './components/SectionSnapNav'
import { useActiveSection, useScrollReveal } from './hooks/useReveal'

const SECTION_IDS = ['hero', 'impact', 'experience', 'skills', 'awards', 'contact']

function revealStyle(delayMs: number): CSSProperties {
  return { '--reveal-delay': `${delayMs}ms` } as CSSProperties
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem('annisa-lang')
      return stored === 'en' ? 'en' : 'id'
    } catch {
      return 'id'
    }
  })

  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem('annisa-theme')
      return stored === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })

  const [copied, setCopied] = useState(false)
  const [motionPaused, setMotionPaused] = useState(false)

  useScrollReveal()
  const activeSection = useActiveSection(SECTION_IDS)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('annisa-theme', theme)
    } catch {
      // ignore storage failure
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    try {
      localStorage.setItem('annisa-lang', lang)
    } catch {
      // ignore storage failure
    }
  }, [lang])

  const content = CONTENT[lang]

  const snapSections = useMemo(
    () =>
      SECTION_IDS.map((id) => ({
        id,
        label: content.sectionNames[id] ?? id,
      })),
    [content.sectionNames]
  )

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_META.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${PROFILE_META.email}`
    }
  }, [])

  const renderPillarIcon = (type: 'message' | 'chart' | 'users') => {
    const cls = 'h-3.5 w-3.5 shrink-0 text-[var(--maroon-bright)]'
    if (type === 'message') return <MessageSquare aria-hidden="true" className={cls} />
    if (type === 'chart') return <TrendingUp aria-hidden="true" className={cls} />
    return <Users aria-hidden="true" className={cls} />
  }

  return (
    <div
      className={`relative min-h-screen overflow-x-clip ${
        motionPaused ? 'aurora-paused' : ''
      }`}
    >
      <AuroraBackground />
      <CustomCursor />

      <Navbar
        content={content}
        lang={lang}
        theme={theme}
        activeSection={activeSection}
        onLangChange={setLang}
        onThemeToggle={() =>
          setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
        }
        onNavigate={handleNavigate}
      />

      <SectionSnapNav
        sections={snapSections}
        activeSection={activeSection}
        onSelect={handleNavigate}
      />

      {copied && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[var(--glass-border-accent)] bg-[var(--maroon-solid)] px-4 py-2 text-[13px] font-medium text-[var(--text-on-maroon)] shadow-lg"
        >
          <Check aria-hidden="true" className="h-3.5 w-3.5" />
          <span>{content.hero.copiedToast}</span>
        </div>
      )}

      <main
        id="main-content"
        className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-9 px-4 pb-16 pt-28 sm:px-6 lg:px-0"
      >
        {/* ROW 1: HERO BENTO */}
        <section id="hero" className="snap-section flex flex-col gap-3.5">
          <SectionHeader
            index="01"
            title={content.sectionNames.hero}
            subtitle={content.sectionSubtitles.hero}
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <GlassCard
              wrapperClassName="lg:col-span-8"
              className="flex h-full flex-col justify-between gap-7 p-7 sm:p-9"
              reveal="card"
              delay={60}
            >
              <div className="flex flex-col gap-5">
                <div
                  data-reveal="scale"
                  style={revealStyle(160)}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--glass-border-accent)] bg-[var(--maroon-tint)] px-3.5 py-1.5"
                >
                  <span className="status-dot-pulse h-2 w-2 rounded-full bg-[var(--maroon-bright)]" />
                  <span className="font-mono-tech text-[11px] font-medium tracking-[0.07em] text-[var(--maroon-bright)]">
                    {content.hero.status}
                  </span>
                </div>

                <h1
                  data-reveal="up"
                  style={revealStyle(220)}
                  className="text-[32px] font-bold leading-[1.12] tracking-[-0.03em] text-[var(--text-primary)] sm:text-[42px] lg:text-[46px]"
                >
                  {content.hero.headline}
                </h1>

                <p
                  data-reveal="up"
                  style={revealStyle(300)}
                  className="max-w-[66ch] text-[15px] leading-[1.65] text-[var(--text-secondary)] sm:text-[16px]"
                >
                  {content.hero.subcopy}
                </p>
              </div>

              <div
                data-reveal="up"
                style={revealStyle(370)}
                className="flex flex-wrap items-center gap-3 pt-1"
              >
                <a
                  href={PROFILE_META.cvPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--maroon-solid)] px-6 py-3 text-[14px] font-semibold text-[var(--text-on-maroon)] transition-all duration-250 hover:bg-[var(--maroon-solid-hover)] hover:shadow-lg"
                >
                  <span>{content.hero.primaryCta}</span>
                </a>

                <a
                  href={PROFILE_META.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-subtle)] px-5 py-3 text-[14px] font-medium text-[var(--text-primary)] transition-all duration-250 hover:border-[var(--glass-border-accent)] hover:bg-[var(--maroon-tint)]"
                >
                  <span>{content.hero.secondaryCta}</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-[var(--text-secondary)]" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-3.5 py-2.5 text-[12px] font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--glass-subtle)] hover:text-[var(--text-primary)]"
                >
                  <Mail aria-hidden="true" className="h-3.5 w-3.5 text-[var(--maroon-bright)]" />
                  <span className="font-mono-tech">{PROFILE_META.email}</span>
                </button>
              </div>
            </GlassCard>

            <GlassCard
              variant="maroon"
              wrapperClassName="lg:col-span-4 h-full"
              className="flex h-full flex-col justify-between gap-7 p-7 sm:p-8"
              reveal="card"
              delay={180}
            >
              <div
                data-reveal="up"
                style={revealStyle(260)}
                className="flex items-center justify-between"
              >
                <span className="font-mono-tech text-[11px] font-semibold tracking-[0.1em] text-[var(--text-on-maroon-soft)]">
                  {content.hero.profileKicker}
                </span>
                <Briefcase aria-hidden="true" className="h-4 w-4 text-[var(--text-on-maroon-soft)]" />
              </div>

              <div className="flex flex-col gap-3">
                <p
                  data-reveal="up"
                  style={revealStyle(320)}
                  className="font-serif-editorial text-[44px] italic leading-[1.02] text-[var(--text-on-maroon)] sm:text-[48px]"
                >
                  {PROFILE_META.name}
                </p>
                <p
                  data-reveal="up"
                  style={revealStyle(380)}
                  className="text-[15px] font-medium leading-[1.5] text-[var(--text-on-maroon-soft)]"
                >
                  {content.hero.profileRole}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Client Relations', 'CRM', 'Sales Ops', 'Data Analytics'].map(
                    (tag, tIdx) => (
                      <span
                        key={tag}
                        data-reveal="scale"
                        style={revealStyle(420 + tIdx * 50)}
                        className="font-mono-tech rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-[var(--text-on-maroon)]"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div
                data-reveal="up"
                style={revealStyle(480)}
                className="flex items-center justify-between border-t border-white/15 pt-4 text-[12px]"
              >
                <span className="font-medium text-[var(--text-on-maroon-soft)]">
                  {content.hero.profileDegree}
                </span>
                <span className="font-mono-tech font-semibold text-[var(--text-on-maroon)]">
                  {content.hero.profileGpa}
                </span>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ROW 2: IMPACT & APPROACH BENTO */}
        <section id="impact" className="snap-section flex flex-col gap-3.5">
          <SectionHeader
            index="02"
            title={content.sectionNames.impact}
            subtitle={content.sectionSubtitles.impact}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
            {content.impact.cards.map((card, idx) => (
              <GlassCard
                key={card.kicker}
                wrapperClassName="lg:col-span-3"
                className="flex h-full flex-col justify-start gap-3.5 p-6.5"
                reveal="card"
                delay={idx * 100}
              >
                <span
                  data-reveal="up"
                  style={revealStyle(idx * 100 + 80)}
                  className="font-mono-tech text-[11px] font-semibold tracking-[0.09em] text-[var(--text-muted)]"
                >
                  {card.kicker}
                </span>
                <div className="flex flex-col gap-1.5">
                  <span
                    data-reveal="scale"
                    style={revealStyle(idx * 100 + 130)}
                    className="text-[36px] font-bold leading-none tracking-[-0.03em] text-[var(--text-primary)]"
                  >
                    {card.value}
                  </span>
                  <span
                    data-reveal="up"
                    style={revealStyle(idx * 100 + 180)}
                    className="text-[14px] font-semibold text-[var(--maroon-bright)]"
                  >
                    {card.title}
                  </span>
                  <p
                    data-reveal="up"
                    style={revealStyle(idx * 100 + 220)}
                    className="text-[12.5px] leading-[1.5] text-[var(--text-secondary)]"
                  >
                    {card.desc}
                  </p>
                </div>
              </GlassCard>
            ))}

            <GlassCard
              wrapperClassName="md:col-span-2 lg:col-span-6"
              className="flex h-full flex-col justify-between gap-4 p-7"
              reveal="card"
              delay={200}
            >
              <div
                data-reveal="up"
                style={revealStyle(260)}
                className="flex flex-col gap-1.5"
              >
                <span className="font-mono-tech text-[11px] font-semibold tracking-[0.1em] text-[var(--maroon-bright)]">
                  {content.impact.approachKicker}
                </span>
                <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[24px]">
                  {content.impact.approachHeadline}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {content.impact.pillars.map((pillar, idx) => (
                  <div
                    key={pillar.title}
                    data-reveal="scale"
                    style={revealStyle(310 + idx * 75)}
                    className="flex flex-col gap-1.5 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-subtle)] p-3.5 transition-colors duration-250 hover:border-[var(--glass-border-accent)]"
                  >
                    <div className="flex items-center gap-2">
                      {renderPillarIcon(pillar.icon)}
                      <span className="text-[13px] font-semibold text-[var(--text-primary)]">
                        {pillar.title}
                      </span>
                    </div>
                    <p className="text-[12px] leading-[1.45] text-[var(--text-secondary)]">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ROW 3: EXPERIENCE & LEADERSHIP BENTO */}
        <section id="experience" className="snap-section flex flex-col gap-3.5">
          <SectionHeader
            index="03"
            title={content.sectionNames.experience}
            subtitle={content.sectionSubtitles.experience}
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="flex flex-col gap-4 lg:col-span-7">
              {content.experience.items.map((item, idx) => (
                <GlassCard
                  key={item.company}
                  className="flex flex-col gap-4 p-7 sm:p-7.5"
                  reveal="card"
                  delay={idx * 120}
                >
                  <div
                    data-reveal="up"
                    style={revealStyle(idx * 120 + 70)}
                    className="flex flex-wrap items-center justify-between gap-2"
                  >
                    <span
                      className={`font-mono-tech rounded-full border px-3 py-1 text-[10.5px] font-semibold tracking-[0.08em] ${item.isFeatured
                          ? 'border-[var(--glass-border-accent)] bg-[var(--maroon-tint)] text-[var(--maroon-bright)]'
                          : 'border-[var(--glass-border)] bg-[var(--glass-subtle)] text-[var(--text-secondary)]'
                        }`}
                    >
                      {item.badge}
                    </span>
                    <span className="font-mono-tech text-[12px] font-medium text-[var(--text-muted)]">
                      {item.period}
                    </span>
                  </div>

                  <div
                    data-reveal="up"
                    style={revealStyle(idx * 120 + 130)}
                    className="flex flex-col gap-1"
                  >
                    <h2 className="text-[21px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[22px]">
                      {item.role}
                    </h2>
                    <p className="text-[14px] font-semibold text-[var(--maroon-bright)]">
                      {item.company}
                    </p>
                  </div>

                  <p
                    data-reveal="up"
                    style={revealStyle(idx * 120 + 185)}
                    className="text-[14px] leading-[1.65] text-[var(--text-secondary)]"
                  >
                    {item.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {item.chips.map((chip, cIdx) => (
                      <span
                        key={chip}
                        data-reveal="scale"
                        style={revealStyle(idx * 120 + 230 + cIdx * 50)}
                        className="font-mono-tech rounded-full border border-[var(--glass-border)] bg-[var(--glass-subtle)] px-3 py-1.5 text-[11px] font-medium text-[var(--text-primary)]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard
              wrapperClassName="lg:col-span-5"
              className="flex h-full flex-col justify-between gap-5 p-7 sm:p-7.5"
              reveal="card"
              delay={160}
            >
              <div
                data-reveal="up"
                style={revealStyle(220)}
                className="flex flex-col gap-1.5"
              >
                <span className="font-mono-tech text-[11px] font-semibold tracking-[0.1em] text-[var(--maroon-bright)]">
                  {content.experience.orgKicker}
                </span>
                <h2 className="text-[21px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[22px]">
                  {content.experience.orgTitle}
                </h2>
              </div>

              <div className="flex flex-1 flex-col justify-between">
                {content.experience.orgItems.map((org, idx) => (
                  <div
                    key={org.role}
                    data-reveal="up"
                    style={revealStyle(140 + idx * 70)}
                    className={`flex flex-col gap-1 ${idx > 0
                        ? 'border-t border-[var(--divider)] pt-4 mt-4'
                        : ''
                      }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[14.5px] font-semibold text-[var(--text-primary)]">
                        {org.role}
                      </h3>
                      <span className="font-mono-tech shrink-0 text-[11px] font-medium text-[var(--text-muted)]">
                        {org.year}
                      </span>
                    </div>
                    <p className="text-[12.5px] font-medium text-[var(--maroon-bright)]">
                      {org.org}
                    </p>
                    <p className="text-[12.5px] leading-[1.55] text-[var(--text-secondary)]">
                      {org.desc}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ROW 4: SKILLS MATRIX & CERTIFICATIONS BENTO */}
        <section id="skills" className="snap-section flex flex-col gap-3.5">
          <SectionHeader
            index="04"
            title={content.sectionNames.skills}
            subtitle={content.sectionSubtitles.skills}
          />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <GlassCard
              wrapperClassName="lg:col-span-5"
              className="flex h-full flex-col justify-between gap-5 p-7 sm:p-7.5"
              reveal="card"
              delay={60}
            >
              <div
                data-reveal="up"
                style={revealStyle(120)}
                className="flex flex-col gap-1.5"
              >
                <span className="font-mono-tech text-[11px] font-semibold tracking-[0.1em] text-[var(--maroon-bright)]">
                  {content.skills.kicker}
                </span>
                <h2 className="text-[21px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[22px]">
                  {content.skills.title}
                </h2>
              </div>

              <div className="flex flex-col gap-5">
                {content.skills.groups.map((group, gIdx) => (
                  <div
                    key={group.label}
                    data-reveal="up"
                    style={revealStyle(160 + gIdx * 80)}
                    className="flex flex-col gap-2.5"
                  >
                    <span className="font-mono-tech text-[10.5px] font-semibold tracking-[0.09em] text-[var(--text-muted)]">
                      {group.label}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill, sIdx) => (
                        <span
                          key={skill}
                          data-reveal="scale"
                          style={revealStyle(180 + gIdx * 70 + sIdx * 40)}
                          className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors duration-200 ${group.accent
                              ? 'border-[var(--glass-border-accent)] bg-[var(--maroon-tint)] text-[var(--text-primary)] hover:bg-[var(--maroon-solid)] hover:text-[var(--text-on-maroon)]'
                              : 'border-[var(--glass-border)] bg-[var(--glass-subtle)] text-[var(--text-secondary)] hover:border-[var(--glass-border-accent)] hover:text-[var(--text-primary)]'
                            }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard
              wrapperClassName="lg:col-span-7"
              className="flex h-full flex-col justify-between gap-5 p-7 sm:p-7.5"
              reveal="card"
              delay={160}
            >
              <div
                data-reveal="up"
                style={revealStyle(210)}
                className="flex flex-col gap-1.5"
              >
                <span className="font-mono-tech text-[11px] font-semibold tracking-[0.1em] text-[var(--maroon-bright)]">
                  {content.skills.certsKicker}
                </span>
                <h2 className="text-[21px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[22px]">
                  {content.skills.certsTitle}
                </h2>
              </div>

              <div
                data-reveal="scale"
                style={revealStyle(160)}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-[var(--glass-border-accent)] bg-[var(--maroon-tint)] px-5 py-4 sm:flex-row sm:items-center"
              >
                <div className="flex flex-col gap-0.5">
                  <p className="text-[14.5px] font-bold text-[var(--text-primary)]">
                    {content.skills.eduSchool}
                  </p>
                  <p className="text-[12.5px] text-[var(--text-secondary)]">
                    {content.skills.eduYears}
                  </p>
                </div>
                <span className="font-mono-tech w-fit shrink-0 rounded-full bg-[var(--maroon-solid)] px-3.5 py-1.5 text-[12px] font-semibold text-[var(--text-on-maroon)]">
                  {content.skills.eduGpa}
                </span>
              </div>

              <div className="flex flex-col">
                {content.skills.certifications.map((cert, idx) => (
                  <div
                    key={cert.name}
                    data-reveal="up"
                    style={revealStyle(170 + idx * 55)}
                    className={`flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:items-center sm:gap-4 ${idx > 0 ? 'border-t border-[var(--divider)]' : ''
                      }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Award aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--maroon-bright)]" />
                      <span className="text-[13.5px] font-medium text-[var(--text-primary)]">
                        {cert.name}
                      </span>
                    </div>
                    <span className="font-mono-tech pl-6.5 text-[11.5px] text-[var(--text-muted)] sm:shrink-0 sm:pl-0">
                      {cert.issuer} · {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        {/* ROW 5: HONORS & NATIONAL BUSINESS AWARDS BENTO */}
        <section id="awards" className="snap-section flex flex-col gap-3.5">
          <SectionHeader
            index="05"
            title={content.sectionNames.awards}
            subtitle={content.sectionSubtitles.awards}
          />
          <GlassCard className="flex flex-col gap-6 p-7 sm:p-8" reveal="card" delay={60}>
            <div
              data-reveal="up"
              style={revealStyle(120)}
              className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"
            >
              <div className="flex flex-col gap-1">
                <span className="font-mono-tech text-[11px] font-semibold tracking-[0.1em] text-[var(--maroon-bright)]">
                  {content.awards.kicker}
                </span>
                <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[var(--text-primary)] sm:text-[24px]">
                  {content.awards.title}
                </h2>
              </div>
              <span className="font-mono-tech w-fit shrink-0 rounded-full border border-[var(--glass-border-accent)] bg-[var(--maroon-tint)] px-3.5 py-2 text-[11px] font-semibold text-[var(--maroon-bright)]">
                {content.awards.countPill}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
              {content.awards.podiums.map((award, idx) => (
                <div
                  key={award.title}
                  data-reveal="scale"
                  style={revealStyle(100 + idx * 80)}
                  className={`flex min-h-[144px] flex-col justify-between gap-4 rounded-[18px] border p-5.5 transition-all duration-300 hover:-translate-y-0.5 ${award.featured
                      ? 'border-[var(--glass-border-accent)] bg-[var(--maroon-tint)]'
                      : 'border-[var(--glass-border)] bg-[var(--glass-subtle)] hover:border-[var(--glass-border-accent)]'
                    }`}
                >
                  <span className="font-mono-tech text-[10.5px] font-semibold tracking-[0.08em] text-[var(--maroon-bright)]">
                    {award.tag}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[15.5px] font-bold leading-[1.35] text-[var(--text-primary)]">
                      {award.title}
                    </h3>
                    <p className="text-[12.5px] text-[var(--text-secondary)]">
                      {award.org}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 border-t border-[var(--divider)] pt-5 lg:grid-cols-2 lg:gap-8">
              {[content.awards.ledgerLeft, content.awards.ledgerRight].map(
                (col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-3">
                    {col.map((entry, idx) => (
                      <div
                        key={entry.event + entry.date}
                        data-reveal="up"
                        style={revealStyle(140 + (colIdx * 3 + idx) * 45)}
                        className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3"
                      >
                        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                          <span
                            className={`font-mono-tech shrink-0 text-[11.5px] font-semibold text-[var(--maroon-bright)] ${colIdx === 0 ? 'sm:w-[116px]' : 'sm:w-[96px]'
                              }`}
                          >
                            {entry.rank}
                          </span>
                          <span className="text-[13px] leading-[1.45] text-[var(--text-secondary)]">
                            {entry.event}
                          </span>
                        </div>
                        <span className="font-mono-tech shrink-0 text-[11px] text-[var(--text-muted)]">
                          {entry.date}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </GlassCard>
        </section>

        {/* ROW 6: CONTACT & CTA MAROON GLASS BANNER */}
        <section id="contact" className="snap-section flex flex-col gap-3.5">
          <SectionHeader
            index="06"
            title={content.sectionNames.contact}
            subtitle={content.sectionSubtitles.contact}
          />
          <GlassCard
            variant="maroon"
            className="flex flex-col justify-between gap-8 rounded-[28px] p-7 sm:p-10 lg:flex-row lg:items-center"
            reveal="card"
            delay={60}
          >
            <div className="flex max-w-[600px] flex-col gap-3">
              <span
                data-reveal="up"
                style={revealStyle(130)}
                className="font-mono-tech text-[11px] font-semibold tracking-[0.12em] text-[var(--text-on-maroon-soft)]"
              >
                {content.contact.kicker}
              </span>
              <h2
                data-reveal="up"
                style={revealStyle(190)}
                className="text-[26px] font-bold leading-[1.18] tracking-[-0.025em] text-[var(--text-on-maroon)] sm:text-[32px]"
              >
                {content.contact.headline}
              </h2>
              <p
                data-reveal="up"
                style={revealStyle(250)}
                className="text-[14.5px] leading-[1.6] text-[var(--text-on-maroon-soft)]"
              >
                {content.contact.subtext}
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 lg:w-[380px] lg:shrink-0">
              <a
                href={PROFILE_META.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal="scale"
                style={revealStyle(120)}
                className="flex items-center justify-center rounded-full bg-[var(--text-on-maroon)] px-6 py-3.5 text-[14px] font-bold text-[var(--maroon-solid)] transition-all duration-250 hover:scale-[1.015] hover:shadow-xl"
              >
                <span>{content.contact.downloadCta}</span>
              </a>

              <a
                href={`mailto:${PROFILE_META.email}`}
                data-reveal="up"
                style={revealStyle(170)}
                className="group flex min-h-[44px] items-center justify-between rounded-[14px] border border-white/15 bg-white/10 px-4 py-3 text-[var(--text-on-maroon)] transition-all duration-250 hover:border-white/30 hover:bg-white/15"
              >
                <span className="flex items-center gap-2.5">
                  <Mail aria-hidden="true" className="h-4 w-4" />
                  <span className="font-mono-tech text-[12.5px] font-medium">
                    {PROFILE_META.email}
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-[var(--text-on-maroon-soft)] transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={PROFILE_META.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                data-reveal="up"
                style={revealStyle(220)}
                className="group flex min-h-[44px] items-center justify-between rounded-[14px] border border-white/15 bg-white/10 px-4 py-3 text-[var(--text-on-maroon)] transition-all duration-250 hover:border-white/30 hover:bg-white/15"
              >
                <span className="flex items-center gap-2.5">
                  <Linkedin aria-hidden="true" className="h-4 w-4" />
                  <span className="font-mono-tech text-[12.5px] font-medium">
                    {PROFILE_META.linkedinLabel}
                  </span>
                </span>
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-[var(--text-on-maroon-soft)] transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </GlassCard>

          <footer
            data-reveal="up"
            style={revealStyle(200)}
            className="flex flex-col items-center justify-between gap-3 px-2 pt-3 text-center sm:flex-row sm:text-left"
          >
            <span className="font-mono-tech text-[11.5px] text-[var(--text-muted)]">
              © 2026 {PROFILE_META.name} · {PROFILE_META.location}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="font-mono-tech text-[11.5px] text-[var(--text-muted)]">
                {content.contact.footerMeta}
              </span>
              <button
                type="button"
                onClick={() => setMotionPaused((prev) => !prev)}
                aria-pressed={motionPaused}
                className="font-mono-tech inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[var(--glass-subtle)] px-3.5 py-2 text-[11px] font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--glass-border-accent)] hover:text-[var(--text-primary)]"
              >
                {motionPaused ? (
                  <Play aria-hidden="true" className="h-3 w-3 text-[var(--maroon-bright)]" />
                ) : (
                  <Pause aria-hidden="true" className="h-3 w-3 text-[var(--maroon-bright)]" />
                )}
                <span>
                  {motionPaused
                    ? content.contact.playMotion
                    : content.contact.pauseMotion}
                </span>
              </button>
            </div>
          </footer>
        </section>
      </main>
    </div>
  )
}
