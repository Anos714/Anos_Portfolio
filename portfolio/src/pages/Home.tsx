import { FaXTwitter } from "react-icons/fa6";
import Navbar from "../components/navbar/Navbar";
import { CiLinkedin } from "react-icons/ci";
import { FaGithubSquare } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { Tooltip } from "react-tooltip";
import Projects from "./Projects";
import Experience from "./Experience";

const Home = () => {
  const social = [
    { label: "X", href: "#", icon: <FaXTwitter /> },
    { label: "LinkedIn", href: "#", icon: <CiLinkedin /> },
    { label: "Github", href: "#", icon: <FaGithubSquare /> },
    { label: "Email", href: "#", icon: <LuMail /> },
  ];
  return (
    <div className="size-full">
      <Navbar />
      <div className="mt-10">
        <div className="flex flex-col justify-center gap-4">
          <div className="flex items-center gap-4">
            <img
              className="size-24 rounded-full"
              src="rahul_pfp.avif"
              alt="profile_pic"
            />
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Rahul Sain
              </h1>
              <p className="text-base tracking-tight text-neutral-700">
                Engineer · MERN · Open to Work
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>
              I turn ideas into working products. Clean code, solid systems, no
              fluff.
            </p>
            <div className="flex gap-2">
              {social.map((item, _) => (
                <a
                  className="text-lg"
                  key={item.label}
                  href={item.href}
                  data-tooltip-id="social-tooltip"
                  data-tooltip-content={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Tooltip id="social-tooltip" />
      {/* <Projects /> */}
      {/* <Experience /> */}
    </div>
  );
};

export default Home;
