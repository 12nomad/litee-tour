import Image from "next/image";
import getDictionary from "../../utils/dictionary.util";

interface ICta {
  lang: string;
}

const Cta = async ({ lang }: ICta) => {
  const dictionary = await getDictionary(lang);

  return (
    <div className="relative px-6 py-8 overflow-hidden rounded-md bg-slate-100">
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />
      <Image
        fill
        alt="CTA Card Image"
        className="object-cover object-center"
        src="https://images.unsplash.com/photo-1672600830594-ae4ccc159578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1263&q=80"
      />
      <div className="relative z-20 text-center">
        <h3 className="mt-3 text-4xl font-semibold">{dictionary.cta.title}</h3>
        <p className="max-w-lg mt-2 text-lg mx-auto">
          {dictionary.cta.description}
        </p>
      </div>
    </div>
  );
};

export default Cta;
