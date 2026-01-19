export default function UsersCard({users}) {
    return(
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-4 flex flex-col sm:flex-row items-center justify-between hover:shadow-xl transition">
            <div>
                <h2 className="text-lg font-bold text-gray-800">{users.name}</h2>
                <p className="text-gray-500">{users.tital}</p>
            </div>
        </div>
    )
};
