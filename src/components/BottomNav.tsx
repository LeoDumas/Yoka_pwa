

interface BottomNavProps {
    setCurrentPage: (page: "ProductPage" | "HistoricPage") => void;
}

function BottomNav({ setCurrentPage }: BottomNavProps) {
    function handlePageSwitch(page: "ProductPage" | "HistoricPage") {
        setCurrentPage(page);
    }

    return (
        <nav className="fixed bottom-0 w-full py-3 bg-green-800 text-white font-semibold">
            <div className="flex justify-evenly">
                <button onClick={() => handlePageSwitch("ProductPage")} className=" w-full">Accueil</button>
                <button onClick={() => handlePageSwitch("HistoricPage")} className=" w-full">Historique</button>
            </div>
        </nav>
    );
}

export default BottomNav;