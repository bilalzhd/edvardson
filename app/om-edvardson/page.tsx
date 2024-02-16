import BreadCrumb from "@/components/BreadCrumb";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Om Edvardson",
}
export default function About() {
    return (
        <>
            <BreadCrumb />
            <div className="text-[#333] mx-auto px-20 2xl:max-w-[76%] py-12 text-[14px] font-open font-semibold letter-spacing-0">
                <div className="mb-5">
                    <h2 className="text-black text-[22px] mb-5">Välkommen till Edvardson Sweden</h2>
                    <p className="mb-2">Edvardson Sweden är ett anrikt familjeföretag, tidigare känt som Malungsfors Läderprodukter. Det började på 1860-talet då farfars farfar Edvard Torstensson började med skomakeri för att livnära sig. Sedan dess har tillverkningen utökats till att även innefatta jakttillbehör och friluftstillbehör i läder.</p>

                    <p>Hos oss sätter vi stort värde på kunskap, kvalitet och gediget hantverk.</p>
                </div>

                <div className="mb-5">
                    <h2 className="text-black text-[22px] mb-5">Om Edvardson Sweden AB</h2>
                    <p>God kvalité och bra funktion i allt vi gör, produkter som håller för strapatser och funktion som gör din upplevelse rikare. Vi har skapat de produkter vi själva vill använda och vi testar dem både på älgjakt och fjällvandring.</p>

                    <p>Bussarongen av vadmal ska hålla dig varm och torr på fågelskådning en tidig vårdag och det ska inte prassla när du smyger dig fram i terrängen.</p>

                    <p>Vi vill ha bästa tänkbara material för varje produkt och funktion. Materialen ska vara slitstarka, bekväma, tysta och lätta. Vi använder naturmaterial i första hand men ibland är det ett modernt syntetmaterial som har den specifika funktion som vi eftersträvar.</p>

                    <p>Dina synpunkter och erfarenheter är viktiga för oss och vi specialtillverkar gärna utifrån dina speciella önskemål.</p>

                    <p>Vi vill att våra produkter ska förhöja din upplevelse oavsett vad du har för hobby.</p>
                </div>
                <div className="mb-5">
                    <h2 className="text-black text-[22px] mb-5">Profilprodukter</h2>
                    <p>Ge dina kunder och anställda en unik och handgjord present.</p>
                    <p>Vi på Edvardson Sweden har en stor erfarenhet av profilprodukter och du är välkommen att bli vår nästa kund.</p>
                </div>
                <div className="mb-5">
                    <h2 className="text-black text-[22px] mb-5">Historik</h2>
                    <p>Vi i familjen Edvardsson har en lång tradition som skomakare. På 1860-talet kom farfars farfar vandrande från Norge och slog sig ner här i Malungsfors. Han försörjde sig som reparationsskomakare men lärde sig med tiden att göra slitstarka kängor och skor.</p>

                    <p>Under första hälften av 1900-talet utvecklades produkterna och yrkeskunnandet fördjupades. Tillverkningen flyttades till större lokaler och fler skinnkunniga bybor fick möjligheten att lära sig skomakeriets ädla konst. Malungsbygden har en lång skinntradition så känslan för skinnet och hur det ska hanteras var en nedärvd kunskap hos folket.</p>

                    <p>Numera tillverkar vi ytterplagg, jakttillbehör, vadmalskläder, vadmalsbyxor, vadmalsjackor, patronhållare, slutstyckshölster, bärsele för jaktradio och GPS, läderbälten, gevärsremmar och profilprodukter. Vi har numera ett så gediget kunnande så det är få saker vi inte vågar oss på. Vi kan med stolthet säga att våra läderprodukter är så slitstarka att de håller i åtskilliga år om du sköter dem väl.</p>

                    <p>Vi försöker i största möjliga mån att använda oss av vegetabiliskt garvat läder, med tanke på miljön.</p>
                </div>
                <div className="mb-5">
                    <h2 className="text-black text-[22px] mb-5">Här hittar du oss:</h2>
                    <ul className="mb-5">
                        <li>Skinnargränd 2</li>
                        <li className="mb-5">782 75  MALUNGSFORS</li>

                        <li className="mb-5">070-3158536</li>

                        <li className="mb-5">Org.nr: 556833-3834</li>

                        <li>E-post: <a rel="nofollow" className="text-blue-500 hover:underline" href="mailto:info@edvardson.se">info@edvardson.se</a></li>
                    </ul>

                    Koordinater
                    <p>WGS 84 (lat, lon):N 60° 44.005&apos;, E 13° 33.787&apos;</p>
                    <p>WGS 84 decimal (lat, lon):60.73341, 13.56312</p>
                    <p>RT90:6737249, 1377692</p>
                    <p className="mb-5">SWEREF99:6733951, 421639</p>


                    <p className="mb-5">Länk till <a className="text-blue-500 hover:underline" href="https://kartor.eniro.se/m/aCSZb" rel="nofollow">KARTA</a></p>

                    <p>Länk till försäljningsvillkor</p>
                </div>
                <div className="mb-5">
                    <h2 className="text-black text-[22px] mb-5">Öppettider butik:</h2>
                    <p className="font-bold">Varierande öppettider</p>
                    <p className="font-bold">Ring före besök. 070-3158536</p>
                </div>
            </div>
        </>
    )
}
