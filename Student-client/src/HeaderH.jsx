import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from './Auth/AuthContext';

const HeaderH = () => {
  const { signOutUser, user } = useContext(AuthContext);

  return (
    <aside className="w-64 bg-gray-800 h-screen fixed top-0 left-0 p-5">
      <h1 className="text-2xl font-bold text-white mb-8">Scholarly</h1>
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-gray-300 hover:text-white"
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/find-tutors"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-gray-300 hover:text-white"
            }
          >
            Manage Students
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/AddAssignmentPage"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-gray-300 hover:text-white"
            }
          >
             Add Assignments
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/students"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-gray-300 hover:text-white"
            }
          >
            My Students
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-gray-300 hover:text-white"
            }
          >
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/library"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-gray-300 hover:text-white"
            }
          >
            Library
          </NavLink>
        </li>
        <li>
          {user ? (
            <button onClick={signOutUser} className="btn-sm">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="text-gray-300 hover:text-white">
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default HeaderH;
