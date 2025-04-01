import React from 'react'

export default function CopyRightAndPowerBy() {
  return (
    <footer className="text-center py-4 text-muted-foreground text-[10px]">
      <p>&copy; {new Date().getFullYear()} sdsarun. All rights reserved.</p>
      {/* <p>Powered by sdsarun</p> */}
    </footer>
  )
}
