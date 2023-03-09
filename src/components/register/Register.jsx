import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { isValidEmail } from "../../helpers/validations";

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

  const validateNotEmpty = (ids) => {
    const errMessage = 'This fields cannot be empty';
    ids.forEach((id) => {
      const data = values[id];
      if (!data.value) {
        setValues(values => ({ ...values, [id]: { ...data, error: data.error || errMessage } }));
        errorsCount.current++;
      }
    });
  };

  const validateEmail = (ids) => {
    const errMessage = 'Invalid email address';
    ids.forEach((id) => {
      const data = values[id];
      if (!isValidEmail(data.value)) {
        setValues(values => ({ ...values, [id]: { ...data, error: data.error || errMessage } }));
        errorsCount.current++;
      }
    });
  };

  const validatePasswordLength = (ids, minLength) => {
    const errMessage = `Password should be at least ${minLength} characters long`;
    ids.forEach((id) => {
      const data = values[id];
      if (data.value.length < minLength) {
        setValues(values => ({ ...values, [id]: { ...data, error: data.error || errMessage } }));
        errorsCount.current++;
      }
    });
  };

  const validateConfirmPassword = (ids) => {
    const errMessage = 'Passwords do not match';
    ids.forEach((id) => {
      const data = values[id];
      console.log(data);
      if (data.value !== values['password'].value) {
        setValues(values => ({ ...values, [id]: { ...data, error: data.error || errMessage } }));
        errorsCount.current++;
      }
    });
  };

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
    validatePasswordLength(['password'], 6);
    validateEmail(['email']);
    validateConfirmPassword(['confirmPassword']);
    validateNotEmpty(['firstName', 'lastName', 'email', 'password', 'confirmPassword']);
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
