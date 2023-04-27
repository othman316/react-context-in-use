import { auth } from '@/firebase/firebaseConfig'
import { updateProfile } from 'firebase/auth'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'

interface ProfileContextType {
  displayName: string | null
  updateDisplayName: (displayName: string) => void
}

export const ProfileContext = createContext<ProfileContextType>({
  displayName: null,
  updateDisplayName: () => {},
})

interface ProfileProviderProps {
  children: ReactNode
}

const ProfileProvider: FC<ProfileProviderProps> = ({ children }) => {
  const [displayName, setDisplayName] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setDisplayName(user.displayName)
      } else {
        setDisplayName(null)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const updateDisplayName = async (displayName: string) => {
    const user = auth.currentUser
    if (user) {
      setDisplayName(displayName)
      await updateProfile(user, { displayName })
    }
  }

  return (
    <ProfileContext.Provider value={{ displayName, updateDisplayName }}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider
