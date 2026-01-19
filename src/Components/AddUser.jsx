import { useState } from "react";
import supabase from "../config/supabaseConfig";

export default function AddUser() {
  const [name, setName] = useState("")
  const [tital, setTitle] = useState("")
  const [formError , setFormError] = useState(null)

  const handleform = async(e) => {
    e.preventDefault()
    console.log(name)
    console.log(tital)
    setName("")
    setTitle("")

    if(!name && !tital){
        setFormError("Enter the value in text field before submit !")
        return
    }

    const {data , error} = await supabase.from("users").insert([{tital , name}])

    if(error){
        setFormError("error in submiting your data ")
    }

    if(data){
        console.log(data);
        setFormError(null)
    }
  };

  return (
    <div>
      <form onSubmit={handleform}>
        <input
          className="border-2 rounded-2xl p-2 m-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />

        <input
          className="border-2 rounded-2xl p-2 m-2"
          value={tital}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />

        <button className="border-2 rounded-2xl p-2 m-2 " type="submit">Submit</button>
      </form>

      <div>
        {formError && (<p>{formError}</p>)}
      </div>
    </div>
  );
}
