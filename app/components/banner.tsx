export function Banner({ src, tagline }: { src: string; tagline?: string }) {
  return (
    <div className="relative max-w-310 h-27.5 lg:h-55.5 mt-5 lg:mt-10 rounded-xl bg-black shadow-md ">
      <img
        className="w-full h-full rounded-xl object-cover opacity-50"
        src={src}
      />
      <div className="absolute inset-0 flex items-center max-w-65 md:max-w-full md:justify-center">
        <p className="font-bold text-white text-shadow-lg text-2xl lg:text-5xl text-left md:text-center p-4">
          {tagline}
        </p>
      </div>
    </div>
  );
}
