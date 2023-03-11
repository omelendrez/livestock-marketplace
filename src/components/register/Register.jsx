import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { validateConfirmPassword, validateEmail, validateNotEmpty, validatePasswordLength } from "../../helpers/validations";

const initialValues = {
  firstName: {
    value: '',
    error: ''
  },
  lastName: {
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
};

export const Register = () => {
  const [values, setValues] = useState(initialValues);
  const errorsCount = useRef(0);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const data = {
      value,
      error: ''
    };
    setValues(values => ({ ...values, [id]: data }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    errorsCount.current = 0;
    validatePasswordLength(['password'], 5, setValues, values, errorsCount);
    validateEmail(['email'], setValues, values, errorsCount);
    validateConfirmPassword(['confirmPassword'], setValues, values, errorsCount);
    validateNotEmpty(['firstName', 'lastName', 'email', 'password', 'confirmPassword'], setValues, values, errorsCount);
    if (!errorsCount.current) {
      console.log(JSON.stringify(values, null, 2));
    }
  };

  const { firstName, lastName, email, password, confirmPassword } = values;
  return (
    <div className="container">
      <div>
        <form className="form" method="post">
          <h2>Register</h2>
          <div className={`form-control ${firstName.error ? 'error' : ''}`}>
            <label>First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={firstName.value}
              onChange={handleChange}
            />
            <small>{firstName.error}</small>
          </div>
          <div className={`form-control ${lastName.error ? 'error' : ''}`}>
            <label>Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={lastName.value}
              onChange={handleChange}
            />
            <small>{lastName.error}</small>
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
            Signup
          </button>
          <div>
            <p>Already registered? Click <Link to="/login">here</Link> to login</p>
          </div>
        </form>
      </div>
    </div>
  );
};
