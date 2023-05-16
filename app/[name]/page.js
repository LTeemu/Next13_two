'use client'
import { useSearchParams } from "next/navigation"

export default function Page() {
  const searchParams = useSearchParams()
  const name = searchParams.get('name')
  return (
    <section className='bg-green-200'>
      <p>Empty</p>
    </section>
  )
}