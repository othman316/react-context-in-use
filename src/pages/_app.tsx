import { LanguageProvider } from '@/contexts/LanguageContext'
import ProfileProvider from '@/contexts/ProfileContext'
import { UserProvider } from '@/contexts/UserContext'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <UserProvider>
        <ProfileProvider>
          <Component {...pageProps} />
        </ProfileProvider>
      </UserProvider>
    </LanguageProvider>
  )
}
