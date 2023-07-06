import CountryCard from "@/components/countryCard";
import Image from "next/image";
import Link from "next/link";

// async function getCountryByName(name: string): Promise<Country> {
//   const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
//   return (await response.json())[0];
// }

async function getCountryByName(name: string): Promise<Country> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  return countries.find((country: Country) => country.name.common === name)!;
}

async function getCountryBordersByName(name: string) {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();

  const country = countries.find(
    (country: Country) => country.name.common === name
  )!;

  return country.borders?.map((border) => {

    const borderCountry = countries.find((country) => country.cca3 === border)!;

    return {
      name: borderCountry.name.common,
      ptName: borderCountry.translations.por.common,
      flag: borderCountry.flags.svg,
      flagAlt: borderCountry.flags.alt,
    };
  });
}

export default async function CountryPage({ params: { name } }: { params: { name: string } }) {

  const country = await getCountryByName(decodeURI(name));
  const borderCountries = await getCountryBordersByName(decodeURI(name));
  const formatter = Intl.NumberFormat("en", { notation: "compact" });


  return (
    <section className="container">
      <h1 className="text-5xl font-bold text-gray-800 mt-16 text-center">{country.translations.por.common}</h1>
      <Link className="flex items-center py-2 gap-1" href="/">
        <Image src="/arrow-back.svg" alt="Ícone de seta de voltar" width={14} height={14} />
        Voltar
      </Link>
      <article className="flex flex-col md:flex-row justify-between min-w-full p-10 bg-white rounded-xl">
        <section>
          {country.capital?.length && (
            <h2 className="text-xl text-gray-800"><b>🏙 Capital:</b> {country.capital}</h2>
          )}
          <h2 className="text-xl text-gray-800 mt-3"><b>🗺 Continente:</b> {country.region} {country.subregion && `- ${country.subregion}`}</h2>
          <h2 className="text-xl text-gray-800 mt-3"><b>👥 População:</b> {formatter.format(country.population)}</h2>
          {country.languages && (
            <h2 className="text-xl text-gray-800 mt-3"><b>🗣 Línguas faladas:</b>
              <br />
              {Object.values(country.languages).map((language) => (
                <span key={language} className="inline-block px-2 bg-indigo-700 mr-2 text-white text-sm rounded-full">{language}</span>
              ))}
            </h2>)}
        </section>
        <div className="relative h-48 my-2 md:h-auto w-full sm:w-96 shadow-md md:order-last order-first mb-3 md:mb-0">
          <Image src={country.flags.svg} alt={country.flags.alt} fill className="object-cover" />
        </div>
      </article>
      <section>
        <h3 className="mt-12 text-2xl font-semibold text-gray-800">Países que fazem fronteira</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-full my-3">
          {/* {console.log(borderCountries)} */}
          {borderCountries?.map((border) => (
            <CountryCard {...border} />
          ))}
        </div>
      </section>
    </section>
  )
}