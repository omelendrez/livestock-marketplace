import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { validateEmail, validateNotEmpty, validatePasswordLength } from "../../helpers/validations";
import { login } from "../../services/user";
import LS, { KEYS } from "../../helpers/localStorage";

const initialValues = {
  email: {
    value: 'mike@gmail.com',
    error: ''
  },
  password: {
    value: '12345',
    error: ''
  },
};

export const Login = () => {
  const navigate = useNavigate();
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
    validateNotEmpty(['email', 'password'], setValues, values, errorsCount);
    if (!errorsCount.current) {
      const payload = {
        email: values.email.value,
        password: values.password.value
      };
      console.clear();
      const local = new LS();

      login(payload)
        .then((res) => {
          console.info(JSON.stringify(res, null, 2));
          const token = res.data.token;
          local.save(KEYS.token, token);
          navigate('/');
        })
        .catch((e) => {
          console.error(JSON.stringify(e, null, 2));
        });
    }
  };

  const { email, password } = values;
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
              data-testid="email"
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
          <div>
            <p>Don't have an account? Click <Link to="/register">here</Link> to signup</p>
          </div>
        </form>
      </div>
    </div>
  );
};
