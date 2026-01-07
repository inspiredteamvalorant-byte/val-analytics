import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const links = [
    { name: "Overview", path: "/" },
    { name: "Players", path: "/players" },
    { name: "Agents", path: "/agents" },
    { name: "Matches", path: "/matches" },
    { name: "Maps", path: "/maps" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Valorant Dashboard</h1>
      <nav className="flex flex-col gap-2">
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({isActive}) => 
              isActive ? "font-bold text-yellow-400" : "hover:text-yellow-300"
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
