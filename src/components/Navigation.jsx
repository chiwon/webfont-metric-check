import { NavLink } from 'react-router-dom';

export default function Navigation() {
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-gray-200'
    }`;

  return (
    <nav className="flex space-x-4">
      <NavLink to="/" className={navLinkClass}>
        Alignment Check
      </NavLink>
      <NavLink to="/size-comparison" className={navLinkClass}>
        Size Comparison
      </NavLink>
    </nav>
  );
}
