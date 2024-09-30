import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { USER_REGEX, PWD_REGEX, EMAIL_REGEX } from './utils/regexs'

// eslint-disable-next-line react/prop-types
const Register = ({ props: { user, setUser, validName, setValidName, userFocus, setUserFocus, email, setEmail, validEmail, setValidEmail, emailFocus, setEmailFocus, pwd, setPwd, validPwd, setValidPwd, pwdFocus, setPwdFocus, matchPwd, setMatchPwd, validMatch, setValidMatch, matchFocus, setMatchFocus, errMsg, setErrMsg } }) => {
    const userRef = useRef()
    const errRef = useRef()

    const navigate = useNavigate()

    const port = 'http://localhost:3001'

    useEffect(() => {
        userRef.current.focus()
        setUser('')
        setEmail('')
        setMatchPwd('')
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        console.log(result)
        console.log(user)
        setValidName(result)
    }, [user])

    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        const result = EMAIL_REGEX.test(email.toLowerCase())
        console.log(result)
        console.log(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        console.log(result)
        console.log(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [user, email, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const v1 = USER_REGEX.test(user)
        const v2 = PWD_REGEX.test(pwd)
        // eslint-disable-next-line react/prop-types
        const v3 = EMAIL_REGEX.test(email.toLowerCase())
        if (!v1 || !v2 || !v3) {
            setErrMsg('Invalid Entry')
            return
        }
        console.log(user, email, matchPwd)
        axios.post(port, { user, email, matchPwd })
            .then(result => {
                console.log(result)
                navigate('/login')
            })
            .catch(err => console.log(err))
    }

    return (
        <section className=''>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>
                    Username:
                    <span className={validName ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value.toLowerCase())}
                    required
                    aria-invalid={validName ? 'false' : 'true'}
                    aria-describedby='uidnote'
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id='uidnote' className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor='email'>
                    Email:
                    <span className={validEmail ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validEmail || !email ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type='email'
                    id='email'
                    autoComplete='off'
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
                    aria-invalid={validEmail ? 'false' : 'true'}
                    aria-describedby='emailnote'
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                <p id='emailnote' className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Enter a valid email.
                </p>

                <label htmlFor='password'>
                    Password:
                    <span className={validPwd ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type='password'
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? 'false' : 'true'}
                    aria-describedby='pwdnote'
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p>

                <label htmlFor='confirm_pwd'>
                    Confirm Password:
                    <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type='password'
                    id='confirm_pwd'
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? 'false' : 'true'}
                    aria-describedby='confirmnote'
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id='confirmnote' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>

                <button
                    className={!validName || !validEmail || !validPwd || !validMatch ? 'disabled-sign-up-btn' : 'sign-up-btn'}
                    disabled={!validName || !validEmail || !validPwd || !validMatch ? true : false}>
                    Sign Up
                </button>

            </form>
            <p>
                Already signed up?<br />
                <span className="line">
                    <a href="/login">Sign In</a>
                </span>
            </p>
        </section>
    )
}

export default Register