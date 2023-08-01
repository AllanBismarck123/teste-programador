import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import FileUploadComponent from "./pages/form.js";
import SavedPages from "./pages/saved_pages.js";

const MyRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<FileUploadComponent />} />
                    <Route path="/saved-pages" element={<SavedPages />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default MyRoutes;