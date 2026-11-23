import type { CSSProperties, MouseEvent, ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  wrapperClassName?: string
  variant?: 'glass' | 'maroon'
  reveal?: 'card' | 'up' | 'down' | 'left' | 'right' | 'scale'
  delay?: number
}

export function GlassCard({
  children,
  className = '',
  wrapperClassName = '',
  variant = 'glass',
  reveal = 'card',
  delay = 0,
}: GlassCardProps) {
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  const revealStyle = {
    '--reveal-delay': `${delay}ms`,
  } as CSSProperties

  return (
    <div
      data-reveal={reveal}
      style={revealStyle}
      className={wrapperClassName}
    >
      <div
        onMouseMove={handleMouseMove}
        className={`glass-reveal-surface ${
          variant === 'maroon' ? 'maroon-glass-card' : 'glass-card'
        } rounded-[24px] ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
