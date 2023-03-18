import { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LS, KEYS, validateEmail, validateNotEmpty, validatePasswordLength } from "../../helpers";
import { InputField, Modal } from "../shared";
import { login } from "../../services";
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
          console.error(JSON.stringify(e, null, 2));
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
      <form className="form" method="post">
        <h2>Login</h2>

        <InputField
          type="email"
          id="email"
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
        />

        <InputField
          type="password"
          id="password"
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={handleChange}
        />

        <button
          type="button"
          aria-busy={isSubmitting}
          onClick={handleSubmit}
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
