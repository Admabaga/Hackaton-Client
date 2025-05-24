import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Action from '../Components/Common/Cards/Action/Action.jsx'
import Home from '../Components/Pages/Home/Home.jsx'
import ProcessByCompany from '../Components/Pages/Company/ProcessByCompany.jsx'
import Document from '../Components/Common/Cards/Document/Document.jsx'

export default function AppRoutes() {
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 2500,
                    className: 'toast-common',
                    success: { className: 'toast-default' },
                    error: { className: 'toast-error' },
                }}
            />
            <Routes>
                <Route path="/" element={<Home />} ></Route>
                <Route path="/companies" element={<ProcessByCompany />}></Route>
                <Route path="/actions/:processId" element={<Action />} />
                <Route path="/documents/:actionId" element={<Document />} />
            </Routes>
        </>
    )
}  