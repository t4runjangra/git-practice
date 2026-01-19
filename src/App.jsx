
import { useEffect, useState } from 'react';
import './App.css'
import supabase from './config/supabaseConfig';
import UsersCard from './Components/UsersCard';
import AddUser from './Components/AddUser';

function App() {
  // console.log(supabase)
  const [fetchError , setFetchError] = useState(null)
  const [users , setUsers] = useState(null)

  const handleDelete = (id) => {
    setUsers(prev => {
      return prev.filter(u => u.id != id)
    })
  }

  const handleAddUser = (newUser) => {
    setUsers((prev) => [newUser, ...prev]);
  };


  useEffect(() => {
    const fetchUsers = async () => {
      const {data , error} = await supabase.from('users').select()

      if(error){
        setFetchError("chould not find the data")
        setUsers(null)
        console.log(error);
      }

      if(data){
        setUsers(data)
        setFetchError(null)
      }

    }

    fetchUsers()
  } , [])
 
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-100 flex flex-col items-center py-8">
      <header className="mb-8 w-full max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2 drop-shadow">Supabase Users</h1>
        <p className="text-lg text-gray-500">A modern user management app</p>
      </header>

      <section className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 mb-8">
         <AddUser onAddUser={handleAddUser} />
      </section>

      <section className="w-full max-w-xl">
        {fetchError && (<p className="text-red-500 text-center mb-4">{fetchError}</p>)}
        <div className="grid gap-4">
          {
            users && (
              <>
                {users.map(users => (
                  <UsersCard key={users.id} users={users} onDelete={handleDelete}/>
                ))}
              </>
            )
          }
        </div>
      </section>
    </div>
  )
}

export default App
