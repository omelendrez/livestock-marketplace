import { useRef, useState } from "react"
import "./styles.css"
import { isValidEmail, isValidateUserName } from "../../helpers/validations"

const initialValues = {
  userName: {
    value: '',
    error: ''
  },
  email: {
    value: '',
    error: ''
  },
  password: {
    value: '',
    error: ''
  },
  confirmPassword: {
    value: '',
    error: ''
  }
}

export const Register = () => {
  const [values, setValues] = useState(initialValues)
  const errorsCount = useRef(0)

  const validateNotEmpty = (ids) => {
    const errMessage = 'This fields cannot be empty'
    ids.forEach((id) => {
      const data = values[id]
      if (!data.value) {
        setValues(values => ({ ...values, [id]: { ...data, error: data.error || errMessage } }))
        errorsCount.current++
      }
    })
  }

  const validateUserName = (ids) => {
    const errMessage = 'Invalid Username'
    ids.forEach((id) => {
      const data = values[id]
      if (!isValidateUserName(data.value)) {
        setValues(values => ({ ...values, [id]: { ...data, error: data.error || errMessage } }))
        errorsCount.current++
      }
    })
  }

  const validateEmail = (ids) => {
    const errMessage = 'Invalid email address'
    ids.forEach((id) => {
      const data = values[id]
      if (!isValidEmail(data.value)) {
        setValues(values => ({ ...values, [id]: { ...data, error: data.error || errMessage } }))
        errorsCount.current++
      }
    })
  }

  const validatePasswordLength = (ids, minLength) => {
    const errMessage = `Password should be at least ${minLength} characters long`
    ids.forEach((id) => {
      const data = values[id]
      if (data.value.length < minLength) {
        setValues(values => ({ ...values, [id]: { ...data, error: data.error || errMessage } }))
        errorsCount.current++
      }
    })
  }

  const validateConfirmPassword = (ids) => {
    const errMessage = 'password do no match'
    ids.forEach((id) => {
      const data = values[id]
      if (password !== confirmPassword) {
        setValues(values => ({ ...values, [id]: { ...data, error: data.error || errMessage } }))
        errorsCount.current++
      }
    })
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    const data = {
      value,
      error: ''
    }
    setValues(values => ({ ...values, [id]: data }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    errorsCount.current = 0
    validatePasswordLength(['password'], 6)
    validateEmail(['email'])
    validateUserName(['userName'])
    validateConfirmPassword(['confirmPassword'])
    validateNotEmpty(['userName', 'email', 'password', 'confirmPassword'])
    if (!errorsCount.current) {
      console.log(JSON.stringify(values, null, 2))
    }
  }

  const { userName, email, password, confirmPassword } = values
  return (
    <div className="container">
      <div>
        <form className="form" method="post">
          <h2>Register</h2>
          <div className={`form-control ${userName.error ? 'error' : ''}`}>
            <label>Username</label>
            <input
              type="text"
              id="userName"
              placeholder="Enter Username"
              value={userName.value}
              onChange={handleChange}
            />
            <small>{userName.error}</small>
          </div>
          <div className={`form-control ${email.error ? 'error' : ''}`}>
            <label>Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email.value}
              onChange={handleChange}
            />
            <small>{email.error}</small>
          </div>
          <div className={`form-control ${password.error ? 'error' : ''}`}>
            <label>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password.value}
              onChange={handleChange}
            />
            <small>{password.error}</small>
          </div>
          <div className={`form-control ${confirmPassword.error ? 'error' : ''}`}>
            <label>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword.value}
              onChange={handleChange}
            />
            <small>{confirmPassword.error}</small>
          </div>
          <button type="button" className="submit" onClick={handleSubmit}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
