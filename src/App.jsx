import {Route, Routes} from "react-router-dom";
import {Layout} from "./layout/index.jsx";
import {MainPage} from "./pages/main-page/index.jsx";

function App() {

    return (
        <>
         <Routes>
             <Route path="/" element={<Layout />}>
                 <Route index element={<MainPage />} />
             </Route>
         </Routes>
        </>
    );
}

export default App;
