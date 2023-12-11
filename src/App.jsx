
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './layout/Layout'
import About from './pages/About'
import UsersTable from './components/UsersTable'
import UserFormPage from './pages/UserFormPage'

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<UsersTable />} />
            <Route path='/about' element={<About />} />
            <Route path='/newUser/:id?' element={<UserFormPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
