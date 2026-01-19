
import { useEffect, useState } from 'react';
import './App.css'
import supabase from './config/supabaseConfig';
import UsersCard from './Components/UsersCard';
import AddUser from './Components/AddUser';

function App() {
  // console.log(supabase)
  const [fetchError , setFetchError] = useState(null)
  const [users , setUsers] = useState(null)

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
    <>
      <div className=''>
        <h1>Hello , supabase</h1>
      </div>

      <div>
        <AddUser/>
      </div>

      <div>
        {fetchError && (<p>{fetchError}</p>)}
        <div>
          {
            users && (
              <div>
                {users.map(users => (
                 <UsersCard key={users.id} users={users} />
                ))}
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
