import './navbar.css';

export const Navbar = () => {
  return (
    <nav className="container-fluid">
      <ul></ul>
      <ul>
        <li>
          <details role="list" dir="rtl">
            <summary aria-haspopup="listbox" role="link" className="secondary">
            </summary>
            <ul>
              <li><a href="auto" data-theme-switcher="auto">Auto</a></li>
              <li><a href="light" data-theme-switcher="light">Light</a></li>
              <li><a href="dark" data-theme-switcher="dark">Dark</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  );
};
