import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail, LS, KEYS } from "../../helpers";
import { login } from "../../services/user";
import { Modal } from "../modal/Modal";
import { UserContext } from "../../context";

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
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState(false);
  const errorsCount = useRef(0);
  const isMounted = useRef(true);

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
    validatePasswordLength(['password'], 5);
    validateEmail(['email']);
    validateNotEmpty(['email', 'password']);
    if (!errorsCount.current) {
      const payload = {
        email: values.email.value,
        password: values.password.value
      };

      const local = new LS();
      setIsSubmitting(true);
      login(payload)
        .then((res) => {
          const token = res.data.token;
          local.save(KEYS.token, token);
          isMounted.current = false;
          setUser(res.data);
          navigate('/');
        })
        .catch((e) => {
          setIsSubmitting(false);
          setErrorModalMessage(e.code === "ERR_BAD_REQUEST"
            ? 'You have entered an invalid username or password. Please double-check and try again.'
            : e.message);
          console.log(e);
        })
        .finally(() => {
          if (isMounted.current)
            setIsSubmitting(false);
        });
    }
  };

  const { email, password } = values;
  return (
    <article>
      <form>
        <h2>Login</h2>

        <label htmlFor="email">Email
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

        <label htmlFor="password">Password
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

        <button
          type="button"
          onClick={handleSubmit}
          aria-busy={isSubmitting}
        >
          Login
        </button>

        <div>
          <p>Don't have an account? Click <Link to="/register">here</Link> to signup</p>
        </div>
      </form>
      <Modal
        open={!!errorModalMessage}
        title="Wrong credentials!"
        type="error"
        message={errorModalMessage}
        toggle={setErrorModalMessage}
        label="Try again"
      />
    </article>
  );
};
