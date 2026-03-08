import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { ROLES } from '../../constants';
import { PUBLIC_LINKS, MY_PROFILE_LINK, MEMBER_LINKS, ADMIN_LINK } from './navLinks';

const linkBase = 'py-3 px-4 rounded-xl text-base font-medium';
/* A. 카드형 + B. 왼쪽 강조선 + C. 간격·섹션 + D. 아이콘 배경 */
const linkPublic = 'text-gray-300 bg-white/5 border border-white/10 border-l-4 border-l-cyan-500/50 hover:text-cyan-400 hover:bg-white/10 transition-colors text-center';
const linkMember = 'text-cyan-400 bg-white/5 border border-white/10 border-l-4 border-l-cyan-500/50 hover:bg-cyan-500/10 transition-colors flex items-center justify-center gap-2';
const linkAdmin = 'text-violet-400 bg-violet-900/20 border border-violet-500/40 border-l-4 border-l-violet-500/70 hover:bg-violet-900/30 transition-colors flex items-center justify-center gap-2';

const NavMobile = ({ auth, onLogout, onClose }) => {
  const { userRole, isLoggedIn, isMember, userName } = auth ?? {};
  const displayName = userName?.trim() || '회원';

  return (
    <nav className="flex-shrink-0 flex flex-col justify-start pt-6 pb-4 px-4 overflow-y-auto">
      <div className="flex flex-col gap-2 flex-shrink-0">
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
          {(isMember || userRole === ROLES.ADMIN) && (
            <div className="border-t border-white/10 my-4" aria-hidden="true" />
          )}
          {(isMember || userRole === ROLES.ADMIN) && (
            <div className="flex flex-col gap-2">
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
          {userRole === ROLES.ADMIN && (
            <>
              <div className="border-t border-white/10 my-4" aria-hidden="true" />
              <Link
                to={ADMIN_LINK.to}
                onClick={onClose}
                className={`${linkBase} ${linkAdmin}`}
              >
                <ADMIN_LINK.Icon size={18} /> {ADMIN_LINK.label}
              </Link>
            </>
          )}
          {(isMember || userRole === ROLES.ADMIN) && (
            <div className="border-t border-white/10 my-4" aria-hidden="true" />
          )}
          <div className="flex flex-row items-stretch gap-0 mt-4">
            <Link
              to={MY_PROFILE_LINK.to}
              onClick={onClose}
              className={`${linkBase} flex-1 flex items-center justify-center gap-2 rounded-r-none border-r-0 text-emerald-400 bg-emerald-900/20 border border-emerald-500/40 border-l-4 border-l-emerald-500/70 hover:text-emerald-300 hover:bg-emerald-900/30 transition-colors`}
            >
              <MY_PROFILE_LINK.Icon size={18} /> {displayName}
            </Link>
            <div className="w-px bg-white/10 self-stretch shrink-0" aria-hidden="true" />
            <button
              type="button"
              onClick={onLogout}
              className={`${linkBase} flex-1 flex items-center justify-center gap-2 rounded-l-none text-red-400 bg-red-900/20 border border-red-500/40 border-l-4 border-l-red-500/70 hover:text-red-300 hover:bg-red-900/30 transition-colors`}
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="border-t border-white/10 my-4" aria-hidden="true" />
          <Link
            to="/login"
            onClick={onClose}
            className="py-3 px-6 rounded-full bg-cyan-500 text-[#110b29] font-bold hover:bg-cyan-400 transition-colors text-base text-center border-2 border-cyan-400/50 border-l-4 border-l-cyan-400"
          >
            Login
          </Link>
        </>
      )}
    </nav>
  );
};

export default NavMobile;
