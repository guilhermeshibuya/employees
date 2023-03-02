import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import PageNavbar from './components/pageNavbar';

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <PageNavbar />
            <Routes>
                <Route path="/" element={ <RecordList /> } />
                <Route path="/edit/:id" element={ <Edit/> } />
                <Route path="/create" element={ <Create /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;