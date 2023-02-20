import { useRef, useState } from "react"
import "./styles.css"
import { isValidEmail } from "../../helpers/validations"
import { login, getUsers } from "../../services/user"
import LS, {KEYS} from "../../helpers/localStorage"

const initialValues = {
  email: {
    value: 'mike@gmail.com',
    error: ''
  },
  password: {
    value: '12345',
    error: ''
  },
}

export const Login = () => {
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
    validatePasswordLength(['password'], 5)
    validateEmail(['email'])
    validateNotEmpty(['email', 'password'])
    if (!errorsCount.current) {
      const payload = {
        email: values.email.value,
        password: values.password.value
      }
      console.clear()
      const local = new LS()

      login(payload)
        .then((res) => {
          console.info(JSON.stringify(res, null, 2))
          const token = res.data.token
          local.save(KEYS.token, token)
        })
        .catch((e) => {
          console.error(JSON.stringify(e, null, 2))
        })
    }
  }

  const handleGet = (e) => {
    console.clear()
    getUsers()
      .then((res) => {
        console.info(JSON.stringify(res, null, 2))
      })
      .catch((e) => {
        console.error(JSON.stringify(e, null, 2))
      })

  }

  const { email, password } = values
  return (
    <div className="container">
      <div>
        <form className="form" method="post">
          <h2>Login</h2>
          <div className={`form-control ${email.error ? 'error' : ''}`}>
            <label>Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email.value}
              onChange={handleChange}
              data-testid = "email"
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
              data-testid="password"
            />
            <small>{password.error}</small>
          </div>
          <button type="button" className="submit" data-testid="submit-button" onClick={handleSubmit}>
            Login
          </button>
          <button type="button" className="submit" onClick={handleGet}>
            Get users
          </button>
        </form>
      </div>
    </div>
  )
}
