import { useContext, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import HeaderH from './HeaderH'
import FooterF from './FooterF'
import AuthContext from './Auth/AuthContext'

function App() {
  const { theme } = useContext(AuthContext);

  return (
    <div
      className={`min-h-screen flex bg-[#34455d] flex-col ${theme == false ? "bg-[#fbf8f6]" : "bg-[#121212]"} `}
    >
      {/* Header */}
      <HeaderH />

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        <Outlet />
      </div>

      {/* Footer */}
      
    </div>
  )
}

export default App;
