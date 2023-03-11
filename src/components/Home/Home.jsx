import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context';
import { getProfiles } from '../../services/profile';
import { Loading } from '../loading/Loading';

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
    setUser(null);
  };

  return (
    loading ?
      <Loading />
      :
      <article>
        <h3>
          Farmer's Livesock Marketplace
        </h3>
        <figure>
          <img src='/assets/livestock.webp' alt="bg" />
        </figure>
        <h5>
          Welcome {user?.first_name} {user?.last_name}!
          ({profileName})
        </h5>
        <label>
        </label>
        <button
          type='button'
          onClick={handleLogout}
          className="secondary"
        >Logout</button>
      </article>
  );
};
