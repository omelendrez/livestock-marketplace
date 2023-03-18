import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context';
import { getProfiles } from '../../services';
import { Loading, Logo } from '../shared';
import { SP } from "../../services";
import './home.css'

export const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [profileName, setProfileName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id)
      getProfiles()
        .then((profiles) => {
          const profile = profiles.data.find((p) =>
            p.id === user?.profile_id);

          if (profile) {
            setProfileName(profile?.name);
          }
        })
        .finally(() => {
          setLoading(false);
        });
  }, []);

  if (!user?.id) {
    return <Navigate to="/login" />;
  }

  const handleLogout = (e) => {
    e.preventDefault();
    const session = new SP();
    session.clear();
    setUser(null);
  };

  return (
    loading ?
      <Loading />
      :
      <article className='home'>
        <figure>
          <Logo />
        </figure>

        <p className='welcome'>
          Welcome {user?.first_name} {user?.last_name}!
          ({profileName})
        </p>

        <button
          type='button'
          onClick={handleLogout}
          className="secondary"
        >Logout</button>
      </article>
  );
};
