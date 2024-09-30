import './App.css'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

const App = () => {
  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')

  return (
    <main className='App'>
      <BrowserRouter >
        <Routes >
          <Route path='/' element={<Register
            props={{ user, setUser, validName, setValidName, userFocus, setUserFocus, email, setEmail, validEmail, setValidEmail, emailFocus, setEmailFocus, pwd, setPwd, validPwd, setValidPwd, pwdFocus, setPwdFocus, matchPwd, setMatchPwd, validMatch, setValidMatch, matchFocus, setMatchFocus, errMsg, setErrMsg }} />}>
          </Route>
          <Route path='/login' element={<Login
            props={{ user, setUser, validName, setValidName, email, setEmail, validEmail, setValidEmail, pwd, setPwd, validPwd, setValidPwd }} />}>
          </Route>
          <Route path='/home' element={<Home
            props={{ user }} />}></Route>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App