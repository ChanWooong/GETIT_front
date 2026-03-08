import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { ROLES } from '../../constants';
import { PUBLIC_LINKS, MY_PROFILE_LINK, MEMBER_LINKS, ADMIN_LINK } from './navLinks';

const NavDesktop = ({ auth, onLogout }) => {
  const { userRole, isLoggedIn, isMember } = auth ?? {};

  return (
    <div className="hidden md:flex items-center space-x-8 font-medium text-gray-300">
      {PUBLIC_LINKS.map(({ to, label }) => (
        <Link key={to} to={to} className="hover:text-cyan-400 transition-colors">
          {label}
        </Link>
      ))}

      {isLoggedIn ? (
        <>
          <Link
            to={MY_PROFILE_LINK.to}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
          >
            <MY_PROFILE_LINK.Icon size={18} /> {MY_PROFILE_LINK.label}
          </Link>
          {(isMember || userRole === ROLES.ADMIN) && (
            <>
              <div className="h-4 w-px bg-gray-700 mx-2" aria-hidden="true" />
              {MEMBER_LINKS.map(({ to, label, Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <Icon size={18} /> {label}
                </Link>
              ))}
            </>
          )}
          {userRole === ROLES.ADMIN && (
            <Link to={ADMIN_LINK.to} className="hover:text-cyan-400 transition-colors">
              {ADMIN_LINK.label}
            </Link>
          )}
          <button
            type="button"
            onClick={onLogout}
            className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors pl-4"
          >
            <LogOut size={18} /> Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="bg-cyan-500 text-[#110b29] px-5 py-2 rounded-full font-bold hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)]"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default NavDesktop;
