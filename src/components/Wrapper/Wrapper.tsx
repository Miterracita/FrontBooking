import type { ElementType } from 'react'

import './Wrapper.css'

type WrapperProps = {
  /** The content to be wrapped inside the component. */
  children: React.ReactNode

  /** The HTML element type to render. Defaults to 'div'. */
  as?: ElementType
}

export default function Wrapper ({
  children,
  as: Element = 'div',
}: WrapperProps): JSX.Element {
  return (
    <Element className="c-wrapper">
      {children}
    </Element>
  )
}