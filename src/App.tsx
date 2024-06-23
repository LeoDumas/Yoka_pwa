import { useState } from "react";
import ProductPage from "./components/ProductPage";
import HistoricPage from "./components/HistoricPage";
import BottomNav from "./components/BottomNav";
// import NavBar from "./components/NavBar";

function App() {
    const [currentPage, setCurrentPage] = useState<"ProductPage" | "HistoricPage">("ProductPage");

    return (
        <main className="relative ">
            {/* <NavBar></NavBar> */}
            {currentPage === "ProductPage" && <ProductPage />}
            {currentPage === "HistoricPage" && <HistoricPage />}

            <BottomNav setCurrentPage={setCurrentPage} />
        </main>
    );
}

export default App;