
const NavBar = () => {
    return (
        <nav className=' sticky top-0 py-6 pl-6 pr-6 flex justify-between w-full bg-green-800 text-white'>
            <h1 className=' text-4xl font-semibold'>Yuko</h1>
            {/* Search bar for product's bar code
            <div className="relative flex items-center w-56 h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    id="bar_code_search"
                    placeholder="Bar code number"
                />
            </div> */}
        </nav>
    )
}

export default NavBar