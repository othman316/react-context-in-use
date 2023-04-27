import { FC, ReactNode, createContext, useState } from 'react'

interface LanguageContextType {
  language: string
  changeLanguage: (lang: string) => void
}
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  changeLanguage: () => {},
})

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en')

  const changeLanguage = (lang: string) => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}
