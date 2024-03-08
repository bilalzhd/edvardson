"use client"

import { useEffect } from 'react'

let checkoutRef: any = null
function setDangerousHtml(html: any) {
    if (checkoutRef === null) {
        return
    }

    const range = document.createRange()

    range.selectNodeContents(checkoutRef)
    range.deleteContents()

    checkoutRef.appendChild(range.createContextualFragment(html))
}

export default function KlarnaCheckout({ snippet }: any) {
    useEffect(() => {
        if (snippet) {
            setDangerousHtml(snippet)
        }
    }, [snippet])

    return (
        <div ref={(ref) => (checkoutRef = ref)} suppressHydrationWarning={true} />
    )
}