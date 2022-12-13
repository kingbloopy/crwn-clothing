import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.scss';
import { UserContext } from '../../contexts/user';
import { signOutUser } from '../../utils/firebase.utils';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  }

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to="/">
          <CrwnLogo/>
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to="/shop">
            Shop
          </Link>
          {
            currentUser ? (
              <span className='nav-link' onClick={signOutHandler}>Sign Out</span>
            ) : (
              <Link className='nav-link' to="/auth">
                Sign In
              </Link>
            )
          }
        </div>
      </div>
      <Outlet/>
    </Fragment>
  );
}

export default Navigation;