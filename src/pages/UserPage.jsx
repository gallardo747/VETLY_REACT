import { UserCard } from '../components/UserCard'

export default function UserPage () {
  return (
    <section className='h-full flex flex-col px-3'>
      <h2 className='text-3xl font-bold py-5'>Mi Cuenta</h2>
      <UserCard />
    </section>
  )
}
