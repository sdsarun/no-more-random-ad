import React from 'react'
import CopyRight from '@/components/common/copy-right'

type FooterCopyRightProps = React.ComponentProps<"footer">

export default function FooterCopyRight({
  ...props
}: FooterCopyRightProps) {
  return (
    <footer {...props}>
      <CopyRight />
    </footer>
  )
}
