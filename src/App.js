import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList/TodoList";

function App() {
    return (
        <>
            <div className="grid place-items-center bg-blue-100 h-screen px-6 font-sans">
                <Navbar />

                <div className="w-full max-w-3xl mt-14 shadow-lg rounded-lg p-6 bg-white">
                    <Header />

                    <hr className="mt-4" />

                    <TodoList />

                    <hr className="mt-4" />

                    <Footer />
                </div>
            </div>

            {/* react toastify */}
            <ToastContainer />
        </>
    );
}

export default App;
