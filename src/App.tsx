import { useState } from "react";
import ProductPage from "./components/ProductPage";
import HistoricPage from "./components/HistoricPage";
import BottomNav from "./components/BottomNav";

function App() {
    const [currentPage, setCurrentPage] = useState<"ProductPage" | "HistoricPage">("ProductPage");

    return (
        <main className="relative h-screen w-screen">
            {currentPage === "ProductPage" && <ProductPage />}
            {currentPage === "HistoricPage" && <HistoricPage />}

            <BottomNav setCurrentPage={setCurrentPage} />
        </main>
    );
}

export default App;