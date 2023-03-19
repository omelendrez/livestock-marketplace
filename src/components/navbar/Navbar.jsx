import { useContext } from "react";
import { SP } from '../../services';
import { UserContext } from "../../context";
import './navbar.css';

export const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  console.log(user);

  const handleLogout = (e) => {
    e.preventDefault();
    const session = new SP();
    session.clear();
    setUser(null);
  };

  return (
    <nav className="container-fluid">
      <ul>
        <li>
          <details role="list" dir="ltr">
            <summary aria-haspopup="listbox" role="link"></summary>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="dashboard">Dashboard</a></li>
              <li className="separator"></li>
            </ul>
          </details>
        </li>
      </ul>
      <ul>
        <li><strong>Page</strong></li>
      </ul>
      <ul>
        <li className="user-info">
          <div>{user.first_name}</div>
          <div className="logout-button" onClick={handleLogout}>
          </div>
        </li>
      </ul>
    </nav>
  );
};
