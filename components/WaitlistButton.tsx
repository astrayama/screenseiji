'use client'

import { useState } from 'react'
import Modal from '@/components/Modal'
import WaitlistForm from '@/components/WaitlistForm'

/** A button that opens an app's waitlist form (/api/waitlist) in a dialog. */
export default function WaitlistButton({
  appId,
  appName,
  className,
  children,
}: {
  appId: string
  appName: string
  className?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} eyebrow="In beta" title={`Join the ${appName} waitlist`}>
        <WaitlistForm appId={appId} appName={appName} />
      </Modal>
    </>
  )
}
