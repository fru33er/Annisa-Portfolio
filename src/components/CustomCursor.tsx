import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFine || reduced) return

    setEnabled(true)
    document.documentElement.classList.add('custom-cursor-active')

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let rafId = 0

    const interactiveSelector =
      'a, button, [role="button"], [data-cursor="pointer"], input, textarea'

    const handleMove = (e: PointerEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setVisible(true)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`
      }

      const target = e.target as HTMLElement | null
      setHovering(Boolean(target?.closest(interactiveSelector)))
    }

    const handleDown = () => setPressed(true)
    const handleUp = () => setPressed(false)
    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    const tick = () => {
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16

      if (ringRef.current) {
        const half = ringRef.current.offsetWidth / 2
        ringRef.current.style.transform = `translate3d(${ringX - half}px, ${ringY - half}px, 0)`
      }
      rafId = window.requestAnimationFrame(tick)
    }

    rafId = window.requestAnimationFrame(tick)
    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerdown', handleDown)
    window.addEventListener('pointerup', handleUp)
    document.addEventListener('pointerleave', handleLeave)
    document.addEventListener('pointerenter', handleEnter)

    return () => {
      window.cancelAnimationFrame(rafId)
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
      document.removeEventListener('pointerleave', handleLeave)
      document.removeEventListener('pointerenter', handleEnter)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`cursor-ring ${hovering ? 'is-hovering' : ''} ${
          pressed ? 'is-pressed' : ''
        }`}
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  )
}
