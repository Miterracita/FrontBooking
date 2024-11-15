import type { ElementType } from 'react'

import './WrapperNav.css'

type WrapperNavProps = {
  /** The content to be wrapped inside the component. */
  children: React.ReactNode

  /** The HTML element type to render. Defaults to 'div'. */
  as?: ElementType
}

export default function WrapperNav ({
  children,
  as: Element = 'div',
}: WrapperNavProps): JSX.Element {
  return (
    <Element className="c-wrapper-nav">
      {children}
    </Element>
  )
}