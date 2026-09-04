import { motion as Motion, useMotionValue, useReducedMotion, useSpring, useTransform, useScroll } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, className = '', delay = 0, y = 24, ...props }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, y }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease }}
      {...props}
    >
      {children}
    </Motion.div>
  )
}

export function Stagger({ children, className = '', delayChildren = 0, staggerChildren = 0.08, ...props }) {
  const shouldReduceMotion = useReducedMotion()
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren, staggerChildren },
    },
  }

  return (
    <Motion.div
      className={className}
      variants={variants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.12 }}
      {...props}
    >
      {children}
    </Motion.div>
  )
}

export function StaggerItem({ children, className = '', ...props }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Motion.div
      className={className}
      variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }}
      initial={shouldReduceMotion ? false : undefined}
      {...props}
    >
      {children}
    </Motion.div>
  )
}

export function TiltCard({ children, className = '', ...props }) {
  const shouldReduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 })
  const glowX = useSpring(useTransform(pointerX, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 })
  const glowY = useSpring(useTransform(pointerY, [-0.5, 0.5], [0, 100]), { stiffness: 150, damping: 20 })

  const handlePointerMove = (event) => {
    if (shouldReduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }

  const resetPointer = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <Motion.div
      className={`relative transform-gpu ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      style={shouldReduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
      whileHover={shouldReduceMotion ? undefined : { z: 20 }}
      {...props}
    >
      {children}
      {!shouldReduceMotion && (
        <Motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.15), transparent 80%)`,
          }}
        />
      )}
    </Motion.div>
  )
}

export function FloatingOrb({ className = '', delay = 0, duration = 8, ...props }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Motion.div
      aria-hidden="true"
      className={className}
      animate={shouldReduceMotion ? undefined : { y: [0, -20, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      {...props}
    />
  )
}

export function Parallax({ children, offset = 50, className = '', ...props }) {
  const ref = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

  return (
    <div ref={ref} className={className} {...props}>
      <Motion.div style={shouldReduceMotion ? undefined : { y }}>
        {children}
      </Motion.div>
    </div>
  )
}

export function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  return (
    <Reveal className={`relative z-10 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}>
      {eyebrow && <p className="section-kicker">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </Reveal>
  )
}
