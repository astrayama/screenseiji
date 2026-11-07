'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Modal from '@/components/Modal'

// The form's code downloads when the dialog first opens, not with the page.
const WaitlistForm = dynamic(() => import('@/components/WaitlistForm'))

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
