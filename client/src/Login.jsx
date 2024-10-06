import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// eslint-disable-next-line react/prop-types
const Login = ({ props: { user, setUser, validName, setValidName, email, setEmail, validEmail, setValidEmail, pwd, setPwd, validPwd, setValidPwd } }) => {

    const userRef = useRef()

    const navigate = useNavigate()

    useEffect(() => {
        userRef.current.focus()
        setUser('')
        setValidName(true)
        setEmail('')
        setValidEmail(true)
        setPwd('')
        setValidPwd(true)
    }, [])

    useEffect(() => {
        console.log(user)
    }, [user])

    useEffect(() => {
        console.log(email)
    }, [email])

    useEffect(() => {
        console.log(pwd)
    }, [pwd])

    function handleSubmit(e) {
        e.preventDefault()

        axios.post('http://localhost:3001/login', { user, email, pwd })
            .then(result => {
                if (result.data === 'Success') {
                    setValidEmail(true)
                    setValidPwd(true)
                    setValidName(true)
                    navigate('/home')
                    // console.log(email, pwd)
                } else if (result.data === 'Username not found') {
                    setValidName(false)
                    setValidEmail(true)
                    setValidPwd(true)
                } else if (result.data === 'Email not found') {
                    setValidEmail(false)
                    setValidName(true)
                    setValidPwd(true)
                } else {
                    setValidEmail(true)
                    setValidName(true)
                    setValidPwd(false)
                }
            })
    }

    return (
        <section className="">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="user">
                    Username
                </label>
                <input
                    ref={userRef}
                    type='text'
                    id="user"
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value.toLowerCase())}
                    required
                    aria-invalid={validName ? 'false' : 'true'}
                    aria-describedby='usernamenote'
                />
                <p id='usernamenote' className={!validName ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    User not found.
                </p>

                <label htmlFor="loginEmail">
                    Email
                </label>
                <input
                    type='email'
                    id="loginEmail"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
                    aria-invalid={validEmail ? 'false' : 'true'}
                    aria-describedby='emailnote'
                />
                <p id='emailnote' className={!validEmail ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Email not found.
                </p>

                <label htmlFor="loginPassword">
                    Password
                </label>
                <input
                    type='password'
                    id="loginPassword"
                    autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? 'false' : 'true'}
                    aria-describedby='pwdnote'
                />
                <p id='pwdnote' className={!validPwd ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Incorrect password.
                </p>

                <button
                    disabled={!user || !pwd || !email ? true : false}
                    className={!user || !pwd || !email ? 'disabled-sign-up-btn' : 'sign-up-btn'}>
                    Sign In
                </button>
            </form>
            <p>
                Need to sign up?<br />
                <span className="line">
                    <a href="/">Sign Up</a>
                </span>
            </p>
        </section>
    )
}

export default Login 