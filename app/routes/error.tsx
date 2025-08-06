import { href, Link } from "react-router";

export default function Error() {
  return (
    <div id="error" className="min-w-full">
      <div className="flex items-center justify-center w-full flex-col lg:max-w-310 mt-5 lg:mt-10 mb-5 lg:mb-10">
        <p className="text-red-400 font-bold text-[99px] lg:text-[288px] mt-15 lg:mt-5">
          404
        </p>
        <p className="block lg:hidden text-red-400 font-medium text-center text-lg mt-20 mb-10">
          Oups ! La page que <br /> vous demandez n'existe pas.
        </p>
        <p className="hidden lg:block text-red-400 font-medium text-center text-4xl mb-20 mt-10">
          Oups ! La page que vous demandez n'existe pas.
        </p>
        <Link
          to={href("/")}
          className="font-medium underline text-center text-sm lg:text-lg mt-20 mb-25"
        >
          Retourner sur la page d'accueil
        </Link>
      </div>
    </div>
  );
}
