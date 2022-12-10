import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route, Link, } from 'react-router-dom';
import './App.css'
import Layout from './components/Layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import Main from './components/Main';
import Survey from './components/Survey';
import Questions from './components/Questions';

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/Survey" element={<Survey />} />
          <Route path="/Question" element={<Questions />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  )
}

export default App
