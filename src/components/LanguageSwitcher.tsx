import { LanguageContext } from '@/contexts/LanguageContext'
import { FC, useContext } from 'react'

interface LanguageSwitcherProps {}

const LanguageSwitcher: FC<LanguageSwitcherProps> = ({}) => {
  const { language, changeLanguage } = useContext(LanguageContext)
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`border border-gray-300 px-3 py-1 rounded-md ${
          language === 'en' ? 'bg-gray-300' : 'bg-white'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('es')}
        className={`border border-gray-300 px-3 py-1 rounded-md ${
          language === 'es' ? 'bg-gray-300' : 'bg-white'
        }`}
      >
        ES
      </button>
    </div>
  )
}

export default LanguageSwitcher
