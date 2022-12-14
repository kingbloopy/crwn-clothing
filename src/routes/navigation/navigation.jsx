import { Outlet, Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import './navigation.scss';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

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
              <span className='nav-link' onClick={signOutUser}>Sign Out</span>
            ) : (
              <Link className='nav-link' to="/auth">
                Sign In
              </Link>
            )
          }
          <CartIcon/>
        </div>
        <CartDropdown/>
      </div>
      <Outlet/>
    </Fragment>
  );
}

export default Navigation;