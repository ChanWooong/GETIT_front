import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { ROLES } from '../../constants';
import { PUBLIC_LINKS, MY_PROFILE_LINK, MEMBER_LINKS, ADMIN_LINK } from './navLinks';

const NavDesktop = ({ auth, onLogout }) => {
  const { userRole, isLoggedIn, isMember, userName } = auth ?? {};
  const displayName = userName?.trim() || '회원';

  const linkCommon = 'whitespace-nowrap text-sm md:text-base font-medium transition-colors rounded-lg px-2 py-1';
  const linkPublic = 'text-gray-300 hover:text-cyan-400 hover:bg-white/5';
  const linkProfile = 'text-emerald-400 hover:bg-emerald-500/10 flex items-center gap-1';
  const linkMember = 'text-cyan-400 hover:bg-cyan-500/10 flex items-center gap-1';
  const linkAdmin = 'text-violet-400 hover:bg-violet-500/10';
  const linkLogout = 'text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-1';
  const divider = <div className="h-4 w-px bg-white/20 flex-shrink-0" aria-hidden="true" />;

  return (
    <div className="hidden md:flex items-center min-w-0 gap-1 md:gap-2 lg:gap-3 flex-shrink">
      {PUBLIC_LINKS.map(({ to, label }) => (
        <Link key={to} to={to} className={`${linkCommon} ${linkPublic}`}>
          {label}
        </Link>
      ))}

      {isLoggedIn ? (
        <>
          {(isMember || userRole === ROLES.ADMIN) && (
            <>
              {divider}
              {MEMBER_LINKS.map(({ to, label, Icon }) => (
                <Link key={to} to={to} className={`${linkCommon} ${linkMember}`}>
                  <Icon size={16} className="flex-shrink-0" /> <span className="truncate">{label}</span>
                </Link>
              ))}
            </>
          )}
          {userRole === ROLES.ADMIN && (
            <>
              {divider}
              <Link to={ADMIN_LINK.to} className={`${linkCommon} ${linkAdmin}`}>
                {ADMIN_LINK.label}
              </Link>
            </>
          )}
          {divider}
          <Link to={MY_PROFILE_LINK.to} className={`${linkCommon} ${linkProfile}`}>
            <MY_PROFILE_LINK.Icon size={16} className="flex-shrink-0" /> <span className="truncate">{displayName}</span>
          </Link>
          {divider}
          <button
            type="button"
            onClick={onLogout}
            className={`${linkCommon} ${linkLogout}`}
          >
            <LogOut size={16} className="flex-shrink-0" /> <span className="truncate">Logout</span>
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="whitespace-nowrap bg-cyan-500 text-[#110b29] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm md:text-base font-bold hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.3)] flex-shrink-0"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default NavDesktop;
