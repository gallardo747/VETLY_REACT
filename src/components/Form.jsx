import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'wouter'
import { useUser } from '../hooks/useUser'
import { PickTypeUser } from './PickTypeUser'
import { LoginButton, SignUpButton } from './Auth'

export function Form () {
  const { user: authUser, isAuthenticated } = useAuth0()
  const { signupUser } = useUser()
  const [userType, setUserType] = useState(null)
  const [showPickUserType, setShowPickUserType] = useState(false)

  useEffect(() => {
    if (authUser && userType) {
      const newUser = {
        email: authUser.email,
        type: userType
      }
      signupUser(newUser)
      setShowPickUserType(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser])

  return (
    <form className='flex flex-col items-center gap-5'>
      {!showPickUserType && <LoginButton />}

      {(!isAuthenticated && !showPickUserType) && (
        <>
          <button onClick={() => setShowPickUserType(true)} className='w-52 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300'>
            <span className='w-52 px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0'>
              ¡Unirme a Vetly!
            </span>
          </button>
          <button>
            <Link href='/'>Continuar como Invitado</Link>
          </button>
        </>
      )}

      {(!isAuthenticated && showPickUserType) && <PickTypeUser onPick={setUserType} />}
      {(!isAuthenticated && showPickUserType) && <SignUpButton disabled={userType === null}>¡Unirme a Vetly!</SignUpButton>}
    </form>
  )
}
