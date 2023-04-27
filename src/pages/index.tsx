import Auth from '@/components/Auth'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import Profile from '@/components/Profile'
import { LanguageContext } from '@/contexts/LanguageContext'
import { UserContext } from '@/contexts/UserContext'
import Head from 'next/head'
import { FC, useContext, useState } from 'react'

interface HomePageProps {}

const translations = {
  en: {
    title: 'Multi-Language Todo List',
    addTodo: 'Add Todo',
    placeholder: 'Type your todo...',
  },
  es: {
    title: 'Lista de Tareas en Varios Idiomas',
    addTodo: 'Agregar Tarea',
    placeholder: 'Escribe tu tarea...',
  },
}

const HomePage: FC<HomePageProps> = ({}) => {
  const { language } = useContext(LanguageContext)
  const {
    user,
    todos: todosFirebase,
    loading,
    addTodo: addTodoFirebase,
    removeTodo,
  } = useContext(UserContext)

  const [todos, setTodos] = useState<string[]>([])

  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos(prevTodos => [newTodo.trim(), ...prevTodos])
      addTodoFirebase(newTodo.trim())
      setNewTodo('')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Next.js Multi-Language Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {translations[language].title}
          </h1>
          <LanguageSwitcher />
        </div>

        <div className="max-w-md mx-auto">
          <Auth />
          <Profile />

          {!loading && user && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  value={newTodo}
                  onChange={e => setNewTodo(e.target.value)}
                  placeholder={translations[language].placeholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={addTodo}
                  className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  {translations[language].addTodo}
                </button>
              </div>

              <ul>
                {todosFirebase.map((todo, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100 mb-2 px-4 py-2 rounded-md"
                  >
                    <span>{todo}</span>
                    <button
                      onClick={() => removeTodo(index)}
                      className="text-red-600"
                    >
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default HomePage
