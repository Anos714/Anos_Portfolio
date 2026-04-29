import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-24 w-full">
      <div className="mx-auto max-w-5xl px-4">
        {/* TOP LINKS */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* NAV LINKS */}
          <div className="flex gap-6 text-sm text-neutral-600 dark:text-neutral-400">
            <a
              href="/"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Home
            </a>
            <a
              href="/projects"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Projects
            </a>
            <a
              href="/experience"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Work
            </a>
            <a
              href="/resume"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              Resume
            </a>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400">
            <a
              href="#"
              target="_blank"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <FaXTwitter />
            </a>
            <a
              href="#"
              target="_blank"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              target="_blank"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-8 border-t border-neutral-200 dark:border-neutral-800" />

        {/* BOTTOM TEXT */}
        <div className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
          {`© ${new Date().getFullYear()} Rahul Sain. All rights reserved.`}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
