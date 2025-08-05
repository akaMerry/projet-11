import logoRed from "~/assets/kasa_logo_red.svg";
import logoWhite from "~/assets/kasa_logo_white.svg";
import { Link, Outlet, href } from "react-router";

function Navbar() {
  const navbarlinks = [
    { value: "Accueil", path: href("/"), id: 1 },
    { value: "À propos", path: href("/about"), id: 2 },
  ];

  return (
    <nav className="flex justify-end">
      {navbarlinks.map((link) => (
        <Link
          key={link.id}
          to={link.path}
          className="text-xs lg:text-2xl font-medium uppercase lg:normal-case hover:underline underline-offset-3 pl-6 lg:pl-20"
        >
          {link.value}
        </Link>
      ))}
    </nav>
  );
}

function Header() {
  return (
    <header className="relative flex w-full xl:max-w-310 h-12 lg:h-17 lg:mt-12.5 mx-auto justify-center">
      <div className="grid grid-cols-2 w-full items-center">
        <Link to={href("/")} tabIndex={0}>
          <img src={logoRed} alt="logo" className="max-h-12 lg:max-h-17" />
        </Link>
        <Navbar />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center w-full h-52 bg-black">
      <img src={logoWhite} alt="logo" className="max-h-10 lg:max-h-17" />
      <p className="text-white text-center text-xs lg:text-2xl max-w-30.5 lg:max-w-full mt-4 lg:mt-10">
        © 2020 Kasa. All rights reserved
      </p>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col w-full lg:max-w-310 mx-auto">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
