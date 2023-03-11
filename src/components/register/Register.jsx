import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { isValidEmail, isValidUsername } from "../../helpers";

const initialValues = {
  username: {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const validateUserName = (ids) => {
    const errMessage = 'Invalid username';
    ids.forEach((id) => {
      const data = values[id];
      if (!isValidUsername(data.value)) {
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
    validateUserName(['username']);
    validateConfirmPassword(['confirmPassword']);
    validateNotEmpty(['username', 'email', 'password', 'confirmPassword']);
    if (!errorsCount.current) {
      setIsSubmitting(true);
      console.log(JSON.stringify(values, null, 2));
    }
  };

  const { username, email, password, confirmPassword } = values;
  return (
    <article>
      <form>
        <h2>Sign up</h2>

        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            value={username.value}
            onChange={handleChange}
            aria-invalid={!!username.error}
          />
          <small>{username.error}</small>
        </label>

        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email.value}
            onChange={handleChange}
            aria-invalid={!!email.error}
          />
          <small>{email.error}</small>
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={password.value}
            onChange={handleChange}
            aria-invalid={!!password.error}
          />
          <small>{password.error}</small>
        </label>

        <label htmlFor="confirmPassword">
          Confirm Password
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword.value}
            onChange={handleChange}
            aria-invalid={!!confirmPassword.error}
          />
          <small>{confirmPassword.error}</small>
        </label>

        <button
          type="button"
          onClick={handleSubmit}
          aria-busy={isSubmitting}
        >
          Signup
        </button>
        <div>
          <p>Already registered? Click <Link to="/login">here</Link> to login</p>
        </div>
      </form>
    </article>
  );
};
