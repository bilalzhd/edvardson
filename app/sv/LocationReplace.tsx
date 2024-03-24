"use client"
import { useEffect } from "react"

export default function LocationReplace() {
    useEffect(() => {
        window.location.replace("/")

    }, [])
  return (
    <div>page</div>
  )
}
