import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { Link } from "react-router";

const Footer = () => {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Work", href: "/work" },
    { label: "Resume", href: "/resume" },
  ];

  const socialLinks = [
    {
      label: "X",
      href: "https://x.com/RahulSain714",
      icon: <FaXTwitter />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rahulxcode/",
      icon: <FaLinkedin />,
    },
    {
      label: "GitHub",
      href: "https://github.com/Anos714",
      icon: <FaGithub />,
    },
    {
      label: "Email",
      href: "mailto:sainrahul374@gmail.com",
      icon: <LuMail />,
    },
  ];

  return (
    <footer className="mt-24 w-full">
      <div className="mx-auto max-w-5xl px-4">
        {/* TOP */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* NAV LINKS (internal) */}
          <div className="flex gap-6 text-sm text-neutral-600 dark:text-neutral-400">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="transition hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* SOCIAL LINKS (external) */}
          <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-lg transition hover:text-neutral-900 dark:hover:text-neutral-100"
                aria-label={item.label}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-8 border-t border-neutral-200 dark:border-neutral-800" />

        {/* BOTTOM */}
        <div className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
          © {new Date().getFullYear()} Rahul Sain. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
