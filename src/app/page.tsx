import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/patients/1')
}
