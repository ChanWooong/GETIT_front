import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { ROLES } from '../../constants';
import { PUBLIC_LINKS, MEMBER_LINKS, ADMIN_LINK } from './navLinks';

const linkBase = 'py-3 px-4 rounded-xl text-base font-medium';
const linkPublic = 'text-gray-300 hover:text-cyan-400 hover:bg-white/5 transition-colors text-center';
const linkMember = 'text-cyan-400 hover:bg-cyan-500/10 transition-colors flex items-center justify-center gap-2';
const linkAdmin = 'text-red-400 border border-red-500/50 bg-red-900/20 hover:bg-red-900/30 transition-colors flex items-center justify-center gap-2';

const NavMobile = ({ auth, onLogout, onClose }) => {
  const { userRole, isLoggedIn, isMember } = auth ?? {};

  return (
    <nav className="flex-1 min-h-0 flex flex-col justify-evenly px-4 py-4 overflow-y-auto">
      <div className="flex flex-col gap-1">
        {PUBLIC_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={onClose}
            className={`${linkBase} ${linkPublic}`}
          >
            {label}
          </Link>
        ))}
      </div>

      {isLoggedIn ? (
        <>
          <div className="border-t border-white/10 my-1" aria-hidden="true" />
          {(isMember || userRole === ROLES.ADMIN) && (
            <div className="flex flex-col gap-1">
              {MEMBER_LINKS.map(({ to, label, Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={onClose}
                  className={`${linkBase} ${linkMember}`}
                >
                  <Icon size={18} /> {label}
                </Link>
              ))}
            </div>
          )}
          {isMember && userRole === ROLES.ADMIN && (
            <div className="border-t border-white/10 my-1" aria-hidden="true" />
          )}
          {userRole === ROLES.ADMIN && (
            <Link
              to={ADMIN_LINK.to}
              onClick={onClose}
              className={`${linkBase} ${linkAdmin}`}
            >
              <ADMIN_LINK.Icon size={18} /> {ADMIN_LINK.label}
            </Link>
          )}
          <div className="border-t border-white/10 my-1" aria-hidden="true" />
          <button
            type="button"
            onClick={onLogout}
            className={`${linkBase} text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2`}
          >
            <LogOut size={18} /> Logout
          </button>
        </>
      ) : (
        <>
          <div className="border-t border-white/10 my-1" aria-hidden="true" />
          <Link
            to="/login"
            onClick={onClose}
            className="py-3 px-6 rounded-full bg-cyan-500 text-[#110b29] font-bold hover:bg-cyan-400 transition-colors text-base text-center"
          >
            Login
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavMobile;
