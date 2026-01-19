import { Trash2 } from "lucide-react";
import supabase from "../config/supabaseConfig";

export default function UsersCard({ users , onDelete }) {

    const handleDelete = async() => {
        const {data , error} = await supabase
        .from('users')
        .delete()
        .eq('id' , users.id)

            onDelete(users.id)
        
    }

    

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 flex flex-col sm:flex-row items-center justify-between hover:shadow-xl transition">
      
      <div>
        <h2 className="text-lg font-bold text-gray-800">{users.name}</h2>
        <p className="text-gray-500">{users.tital}</p>
      </div>

      <button 
      onClick={handleDelete}
      className="mt-3 sm:mt-0 text-red-500 hover:text-red-600 transition">
        <Trash2 size={20} />
      </button>

    </div>
  );
}
