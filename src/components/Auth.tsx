import { UserContext } from '@/contexts/UserContext'
import { auth } from '@/firebase/firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { FC, useContext, useState } from 'react'

interface AuthProps {}

const Auth: FC<AuthProps> = ({}) => {
  const { user } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //   create the register function
  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error('Error registering user:', error.message)
    }
  }

  //   create the login function
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error('Error logging in:', error.message)
    }
  }

  //   create the logout function

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error logging out:', error.message)
    }
  }

  return (
    <div className="mb-4">
      {!user ? (
        <>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
          />
          <button
            onClick={register}
            className="w-full mb-2 px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Register
          </button>
          <button
            onClick={login}
            className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Login
          </button>
        </>
      ) : (
        <button
          onClick={logout}
          className="w-full mb-4 px-4 py-2 bg-red-600 text-white rounded-md"
        >
          Logout
        </button>
      )}
    </div>
  )
}

export default Auth
