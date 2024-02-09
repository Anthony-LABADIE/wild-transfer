import React from 'react'

interface LinkProps {
  to: string
  children: React.ReactNode
  className?: string
}

const Link: React.FC<LinkProps> = ({ to, children, className }) => {
  return (
    <a href={to} className={className}>
      {children}
    </a>
  )
}

export default Link
