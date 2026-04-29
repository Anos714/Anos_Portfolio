import { Moon, Sun } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const links = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/" },
    { label: "Work", href: "/" },
    { label: "Blogs", href: "/" },
    { label: "Resume", href: "/" },
  ];

  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className="flex items-center justify-between pt-4">
      <div className="flex items-center justify-center gap-4">
        {links.map((link, _) => (
          <li className="list-none" key={link.label}>
            <a className="text-neutral-700" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </div>
      <div className="flex items-center justify-center">
        {darkMode ? (
          <Sun className="h-5 w-5 text-gray-100" />
        ) : (
          <Moon className="h-5 w-5 text-neutral-900" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
