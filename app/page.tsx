import Link from 'next/link'
import Button from '@/components/Button'

export default function Home() {
  return (
    <main className="text-center">
      <div>
        <h2 className="text-3xl mb-2">Welcome to Wednesday!</h2>
        <p className="tex-lg text-black/50">A project and task manager app.</p>
      </div>
      <div className="space-x-6 mt-6">
        <Link href={'/signin'}>
          <Button intent={'secondary'}>Sign In</Button>
        </Link>
        <Link href={'/register'}>
          <Button>Register</Button>
        </Link>
      </div>
    </main>
  )
}
