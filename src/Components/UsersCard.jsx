export default function UsersCard({users}) {
    return(
        <div  className='w-auto m-2 rounded-2xl h-20 border-2 hover:shadow-2xl '>
            <h1>Name = {users.name}</h1>
            <p>Tital = {users.tital}</p>
        </div>
    )
};
