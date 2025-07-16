import React from "react";
import Logo from "../../shared/Logo";
import { Link } from "react-router";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#8ecae6] flex-col py-14 md:py-20 flex items-center justify-center">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center  justify-center">
          <Logo />
        </div>
        <div>
          <p className="font-main pb-4 border-b mt-4 px-4 md:px-0 border-gray-800 font-medium text-center md:text-lg">
            Create, join, and discuss in IdeaSphere, a platform to share ideas,
            vote, and engage in meaningful conversations through a clean,
            scalable community space.
          </p>
        </div>
        <div className="flex flex-wrap mt-4 justify-center gap-7 pb-4 border-b border-gray-800 dark:border-gray-600 mb-6">
          <Link
            className="font-medium font-second hover:text-main duration-200 text-sm sm:text-base"
            to="/"
          >
            Home
          </Link>
          <Link
            className="font-medium font-second hover:text-main duration-200 text-sm sm:text-base"
            to="/membership"
          >
            Membership
          </Link>
          <Link
            className="font-medium font-second hover:text-main duration-200 text-sm sm:text-base"
            to="/dashboard"
          >
            Dashboard
          </Link>
        </div>
        <div className="flex justify-center gap-4">
          <a
            target="_blank"
            href="https://www.linkedin.com/in/ubaidur-rahman01/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5 hover:text-main  duration-300" />
          </a>
          <a
            target="_blank"
            href="https://x.com/UbaidurRah24983?t=dXrrCouR6TD9CaqpfD2DGQ&s=08"
            aria-label="Twitter"
          >
            <FaTwitter className="w-5 h-5 hover:text-main  duration-300" />
          </a>
          <a
            target="_blank"
            href="https://www.facebook.com/ubaidur.rahman.881781?rdid=Jod9W9noAyDDBpMT&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FXDbMmv5i%2F#"
            aria-label="Facebook"
          >
            <FaFacebook className="w-5 h-5 hover:text-main duration-300" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
