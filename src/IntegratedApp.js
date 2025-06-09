import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home.js';
import EditorPage from './pages/EditorPage.js';
import './App.css';
import ChatApp from '../src/ChatApp-main/public/ChatApp.js';


const IntegratedApp = () => {
    return (
        <>
            <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88',
                            },
                        },
                    }}
                ></Toaster>
            </div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/editor/:roomId" element={<EditorPage />} />
                    <Route path="/chatroom" element={<ChatApp />} />


                </Routes>
            </BrowserRouter>
        </>
    );
}

export default IntegratedApp;
