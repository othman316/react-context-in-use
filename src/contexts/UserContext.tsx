import { auth, firestore } from '@/firebase/firebaseConfig'
import firebase from 'firebase/app'
import {
  QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'

interface UserContextType {
  user: firebase.User | null
  todos: string[]
  loading: boolean
  addTodo: (todo: string) => void
  removeTodo: (index: number) => void
}

export const UserContext = createContext<UserContextType>({
  user: null,
  todos: [],
  loading: true,
  addTodo: () => {},
  removeTodo: () => {},
})

interface UserContextProps {
  children: ReactNode
}

export const UserProvider: FC<UserContextProps> = ({ children }) => {
  const [user, setUser] = useState<firebase.user | null>(null)
  const [todos, setTodos] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user)
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (user && user.uid) {
      const userDocRef = doc(firestore, 'users', user.uid)
      const todosCollectionRef = collection(userDocRef, 'todos')
      const todosQueryWithConstraints = query(
        todosCollectionRef,
        orderBy('createdAt', 'desc')
      )

      const unsubscribe = onSnapshot(
        todosQueryWithConstraints,
        (snapshot: { docs: any[] }) => {
          const newTodos = snapshot.docs.map(doc => doc.data().text)
          setTodos(newTodos)
        }
      )

      return () => {
        unsubscribe()
      }
    } else {
      setTodos([])
    }
  }, [user])

  const addTodo = async (todo: string) => {
    if (user) {
      const userDocRef = doc(firestore, 'users', user.uid)
      const todosCollectionRef = collection(userDocRef, 'todos')
      const todoData = { text: todo, createdAt: serverTimestamp() }

      const newTodoDocRef = await addDoc(todosCollectionRef, todoData)
    }
  }

  const removeTodo = async (index: number) => {
    if (user) {
      const userDocRef = doc(firestore, 'users', user.uid)
      const todosCollectionRef = collection(userDocRef, 'todos')
      const todosQueryWithConstraints = query(
        todosCollectionRef,
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(todosQueryWithConstraints)
      if (querySnapshot.docs[index]) {
        await deleteDoc(querySnapshot.docs[index].ref)
        console.log('Document successfully deleted!')
      } else {
        console.error('Error: Document not found')
      }

      // const todoToBeDeleted =
      // firestore
      //   .collection('users')
      //   .doc(user.id)
      //   .collection('todos')
      //   .orederBy('createdAt', 'asc')
      //   .get()
      //   .then(querySnapshot => {
      //     querySnapshot.docs[index].ref.delte()
      //   })
    }
  }

  return (
    <UserContext.Provider value={{ user, todos, loading, addTodo, removeTodo }}>
      {children}
    </UserContext.Provider>
  )
}
