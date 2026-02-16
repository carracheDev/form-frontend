import Image from "next/image";

export default function Home() {
  return (
    <div className="text-center flex flex-row gap-6 mt-60 justify-center items-center px-5 ">
      <h1 className="text-2xl font-bold text-center text-red-600">Bienvennue sur le systheme d'authentification NestJS & Next </h1>

      <span><Image src={"/nest-js-icon.svg"} alt="l'image de nest " height={50} width={50} /></span> 
    </div>
  );
}
