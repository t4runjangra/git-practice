import { useState } from "react";
import supabase from "../config/supabaseConfig";

export default function AddUser({ onAddUser }) {
  const [name, setName] = useState("");
  const [tital, setTital] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!name || !tital) {
      setError("Both fields are required");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ name, tital }])
      .select()
      .single();

    if (error) {
      setError("Failed to add user");
      console.log(error);
    }

    if (data) {
      onAddUser(data); 
      setName("");
      setTital("");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded-xl"
      />

      <input
        type="text"
        placeholder="Job Title"
        value={tital}
        onChange={(e) => setTital(e.target.value)}
        className="w-full p-3 border rounded-xl"
      />

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
      >
        {loading ? "Adding..." : "Add User"}
      </button>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
    </form>
  );
}
