import { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { ProfileContext } from '@/contexts/ProfileContext'

const Profile: React.FC = () => {
  const { user } = useContext(UserContext)
  const { displayName, updateDisplayName } = useContext(ProfileContext)
  const [newDisplayName, setNewDisplayName] = useState('')

  const handleUpdateDisplayName = () => {
    if (newDisplayName.trim()) {
      updateDisplayName(newDisplayName.trim())
      setNewDisplayName('')
    }
  }

  return (
    <>
      {user && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>
          <p>
            Display Name: <strong>{displayName}</strong>
          </p>
          <input
            type="text"
            value={newDisplayName}
            onChange={e => setNewDisplayName(e.target.value)}
            placeholder="New Display Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
          />
          <button
            onClick={handleUpdateDisplayName}
            className="w-full mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md"
          >
            Update Display Name
          </button>
        </div>
      )}
    </>
  )
}

export default Profile
