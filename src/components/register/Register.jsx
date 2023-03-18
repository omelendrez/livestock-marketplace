import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { InputField } from '../shared/InputField';
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

          <InputField
            type="text"
            id="firstName"
            label="FirstName"
            placeholder="First Name"
            value={firstName}
            onChange={handleChange}
          />
          <InputField
            type="text"
            id="lastName"
            label="LastName"
            placeholder="Last Name"
            value={lastName}
            onChange={handleChange}
          />
          <InputField
            type="email"
            id="email"
            label="email"
            placeholder="Enter Email"
            value={email}
            onChange={handleChange}
          />
          <InputField
            type="password"
            id="password"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <InputField
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
          />

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
