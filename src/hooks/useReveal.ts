import { useEffect, useState } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      document.documentElement.classList.remove('js-reveal-ready')
      return
    }

    const html = document.documentElement
    html.classList.add('js-reveal-ready')

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]')
    )

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -48px 0px',
      }
    )

    let raf1 = 0
    let raf2 = 0

    // Wait two frames so the browser paints the initial hidden state first,
    // enabling smooth entrance transitions for above-the-fold elements too.
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        const vh = window.innerHeight
        for (const el of targets) {
          const rect = el.getBoundingClientRect()
          if (rect.top < vh * 0.94 && rect.bottom > 0) {
            el.classList.add('is-revealed')
          } else {
            observer.observe(el)
          }
        }
      })
    })

    // Safety fallback on fast scroll so tall elements never remain unrevealed
    const handleScrollFallback = () => {
      const vh = window.innerHeight
      for (const el of targets) {
        if (el.classList.contains('is-revealed')) continue
        const rect = el.getBoundingClientRect()
        if (rect.top < vh * 0.92 && rect.bottom > 0) {
          el.classList.add('is-revealed')
          observer.unobserve(el)
        }
      }
    }

    window.addEventListener('scroll', handleScrollFallback, { passive: true })

    return () => {
      window.cancelAnimationFrame(raf1)
      window.cancelAnimationFrame(raf2)
      window.removeEventListener('scroll', handleScrollFallback)
      observer.disconnect()
    }
  }, [])
}

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? 'hero')

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-28% 0px -48% 0px',
        threshold: [0.05, 0.2, 0.45, 0.7],
      }
    )

    sections.forEach((sec) => observer.observe(sec))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
