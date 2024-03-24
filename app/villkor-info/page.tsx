import BreadCrumb from "@/components/BreadCrumb";
import Image from "next/image";

export default function Terms() {
    return (
        <>
            <BreadCrumb />
            <div className="xl:max-w-[80%] 2xl:max-w-[80%] mx-auto my-5 text-[14px]">
                <h1 className="text-[27px] font-bold mb-5">Köpvillkor & Info</h1>
                <h2 className="text-[18px] mb-5 font-bold">Tillämplighet</h2>

                <p className="mb-5">Edvardson Sweden AB:s försäljningsvillkor och prislista gäller från och med på Edvardson Sweden AB:s hemsida angivet datum och ersätter tidigare av Edvardson Sweden AB publicerade försäljningsvillkor. Varorna som presenteras genom Edvardson Sweden AB:s hemsida utgör Edvardson Sweden AB:s ordinarie sortiment. Vid eventuell skillnad mellan villkor, produktinformation eller priser angivna på Edvardson Sweden AB:s hemsida och i övriga publikationer har hemsidan företräde.</p>

                <h2 className="text-[18px] mb-5 font-bold">Köpvillkor / Avtal</h2>

                <p className="mb-5">För konsument gäller reglerna i konsumentlagen och distansavtalslagen för köp på denna webbplats. Avtalet har ingåtts då Edvardson Sweden AB skickat en bekräftelse på att beställningen accepterats.
                    Bekräftelse på att avtal ingåtts skickas i separat e-post efter godkännande av order.</p>

                <h2 className="text-[18px] mb-5 font-bold">Betalningsalternativ</h2>

                <h3 className="text-[16px] mb-5">Klarna Checkout</h3>

                <Image src="https://cdn.klarna.com/1.0/shared/image/generic/logo/sv_se/basic/logo_black.png?width=200" alt="Klarna Logo" className="my-4" width={200} height={200} />

                <p className="mb-5">Klarna Checkout gör det enkelt, flexibelt och tryggt för dig att handla på nätet. Genom att besvara ett par frågor identifierar du dig enkelt och du kan välja den betalmetod som passar dig bäst.</p>

                <p className="mb-5">En finess med Klarna Checkout är att vi skiljer på köp och betalning. Först bekräftar du ditt köp och sedan väljer du hur du vill betala. Antingen med Klarna faktura eller Klarna konto &#8211; eller med kort eller banköverföring. Allt är lika säkert. Om du vill kan du koppla en PIN-kod till Klarna Checkout.</p>


                <p className="mb-5">Klicka här för Klarna Checkout Användarvillkor</p>

                <h2 className="mb-5 text-[18px]">Säker betalning via vår partner Worldline  (endast utvalda kundgrupper)</h2>

                <Image height={70} width={650} src="/images/visa_mastercard_maestro.svg" alt="Visa Mastercard" className="my-4" />

                <p className="mb-5">Vi erbjuder tillsammans med Worldline ett säkerhetssystem som kallas 3-D Secure. Detta kan ses som en säkerhetscertifiering av vårt betalningssystem.</p>

                <p className="mb-5">3-D Secure är en standard för säkra betalningar på Internet framtagen av VISA och Mastercard. VISA kallar standarden för Verified by Visa och Mastercard kallar den MasterCard SecureCode.</p>

                <p className="mb-5">Enkelt förklarat innebär det att du måste ange en extra kod när du handlar på Internet med ditt kort. Detta innebär att du som kund tryggt och säkert kan betala din beställning hos oss. De uppgifter som du behöver ange när du betalar hos oss är kortnummer, CVC2/CVV2 samt giltighetstid. Vid betalning med kort dras pengar direkt från ditt konto när transaktionen blir godkänd.</p>

                <h2 className="text-[18px] mb-5 font-bold">Förskottsbetalning</h2>

                <p className="mb-5">Vid förskottsbetalning skickar vi ett orderunderlag via e-post som betalningsunderlag, du betalar sedan via BankGiro 702-2072 och när vi ser betalningen på vårt konto skickas varorna omgående.</p>

                <h2 className="text-[18px] mb-5 font-bold">Betalningspåminnelse</h2>

                <p className="mb-5">Vid försenad betalning debiteras dröjsmålsränta med 2 % per månad från förfallodagen. Vid påminnelse debiteras lagstadgad påminnelseavgift på 50 kr.</p>

                <h2 className="text-[18px] mb-5 font-bold">Information om distansavtal och om personuppgiftslagen(Klarna)</h2>

                <p className="mb-5">För krediter som ingås på distans, till exempel via Internet eller svar på brevutskick där Du personligen inte träffar kreditgivaren gäller Distansavtalslagen. Klarna har därför skyldighet att lämna viss information. Sådan information finns tillgänglig i de allmänna villkoren till Kontoavtalet. De allmänna villkoren läser du genom att klicka på länken Klarna Checkout Användarvillkor.</p>

                <p className="mb-5">Klarna är även skyldig att lämna information enligt Personuppgiftslagen. Även sådan information finns i de allmänna villkoren.</p>

                <h2 className="text-[18px] mb-5 font-bold">Priser</h2>

                <p className="mb-5">Priserna som är angivna på hemsidan är inklusive moms. Leverans sker så snabbt som möjligt och preliminärt leveransdatum lämnas i samband med bekräftelsen. I det fall vara returneras med åberopande av ångerrätt förbehåller sig Edvardson Sweden AB rätten att göra avdrag för fraktkostnad.</p>

                <h2 className="text-[18px] mb-5 font-bold">Leveranstid</h2>

                <p className="mb-5">Leveranstiden varierar. Har vi produkten hemma försöker vi i mån av tid skicka ordern samma dag, eller dagen efter beställning. Men det kan ta upp till 1 vecka om vi har mycket att göra. Om det är bråttom skriv ett datum när du vill ha produkten så ska vi försöka snabba på ordern. Ibland så händer det att vi har slut på en vara och då måste vi producera den,då meddelar vi kunden det och att leveranstiden kan bli längre.</p>

                <h2 className="text-[18px] mb-5 font-bold">Frakt (inom Sverige)</h2>
                <p className="mb-5">Vi använder DHL som transportör. De tjänster som finns är DHL Service Point för konsumenter och DHL Paket för företag.
                    <br />
                    Vi tillämpar DHLs avgifter för DHL Servicepoint till privatpersoner/företag eller DHLs avgifter för Paket till företag inom Sverige.
                </p>
                <p className="mb-5"> För mindre leveranser via Postens 1:a klass Varubrev, tillämpas Postens ordinare portoprislista för Varubrev.
                    <br />
                    Försändelser via leveranssättet Varubrev som ev är förlorade eller skadade ersättes EJ. Vill kunden vara säker på ev. ersättning vid transportskador och förkommet gods skall alltid DHL Servicepoint eller DHL Paket väljas.
                    Fraktfritt endast efter enskild överenskommelse med Edvardson Sweden AB.
                    Till konsumenter levereras godset med DHL Service Point till närmaste utlämningsställe om kollit väger max 20Kg. Kollin med vikt mellan 20-35Kg lämnas på terminal eller åkeri. Pall eller gods med vikt över 35Kg lämnas på tunggodsterminal. Observera att utkörning inte ingår i fraktpriset till konsumenter. Leverans till konsumenter sker som regel tidigast 1-2 dagar efter beställning då DHL skall avisera paketet.
                    Avisering sker också i de fall då DHL ej lyckats lämna ut försändelse till företag och försändelsen hamnar på uthämtningsställe eller godsterminal.</p>

                <p className="mb-5">Transportskada skall på ankomstdagen av leveransen anmälas till DHL på telefon 0771-345 345 och till Edvardson Sweden AB på telefon 070-315 85 36.</p>


                <h2 className="text-[18px] mb-5 font-bold">Frakt (utvalda länder inom EU)</h2>
                <p className="mb-5">Vi använder DHL Parcel Connect. Fraktkostnaden beräknas automatiskt i varukorgen när mottagarland väljes.</p>

                <p className="mb-5">Länder dit leverans kan ske idag är: Danmark, Finland, Belgien, Frankrike, Holland, Storbritannien, Tyskland</p>

                <p className="mb-5">Leveranstid EU: 2-7 dagar i de flesta EU-länder</p>

                <p className="mb-5">En extra avgift kan tillkomma för Remote Area Surcharge= RAS läggs på betalningen ifall ort/region ligger lite avlägset till.</p>

                <h2 className="text-[18px] mb-5 font-bold">Frakt övriga världen (utvalda länder utanför EU)</h2>
                <p className="mb-5"> Vi använder DHL Parcel Connect och PostNord International Parcel. Fraktkostnaden beräknas automatiskt i varukorgen när mottagarland väljes.</p>

                <p className="mb-5">Länder dit leverans kan ske idag är: Japan, Kanada, Norge, Nya Zealand, USA</p>

                <p className="mb-5">Leveranstid: ca 2-14 dagar i de flesta länder</p>

                <h2 className="text-[18px] mb-5 font-bold">Omyndig</h2>

                <p className="mb-5">För försäljning till omyndig eller underårig krävs målsmans skriftliga godkännande.</p>

                <h2 className="text-[18px] mb-5 font-bold">Reklamation</h2>
                <p className="mb-5">Reklamation enligt konsumentköplagens regler ska ske inom tre år.</p>

                <h2 className="text-[18px] mb-5 font-bold">Garanti</h2>
                <p className="mb-5">Vid eventuella fel skall kund alltid vända sig till oss på Edvardson Sweden AB.</p>
                <Image src="/images/sigil_small.png" height={128} width={128} alt="Brand - Edvardson" />
                <p className="mb-5">5 års garanti</p>

                <h3 className="text-[20px] mb-5">5-års garanti på våra egentillverkade produkter!</h3>

                <p className="mb-5">Garantin gäller endast för produkter köpta efter 1 januari 2010.<br />
                    Garantin gäller endast för fel vid tillverkningen. (exempelvis nitar eller sömmar som går upp)<br />
                    Garantin innebär att Edvardson Sweden AB ersätter defekta produkter eller ger pengarna tillbaka enligt den defekta produktens marknadsvärde.<br />
                    Garantin gäller för den ursprungliga slutförbrukaren och är inte överförbar.<br />
                    Produktgarantin täcker inte andra kostnader som kan uppstå vid fel som täcks av garantin.(Ex.vis. ersätter vi inte ett gevär som skadats om en gevärsrem skulle lossna.)<br />
                    Produktgarantin täcker inte skador på produkten som har uppstått av oaktsamhet.<br />
                    Produktgarantin täcker inte skador som uppstått av yttre påverkan (ex.vis. onormalt slitage, hund eller annat husdjur som bitit i materialet)<br />
                    För att denna garanti ska gälla måste giltig dokumentation av köpet kunna presenteras.<br />
                    Giltigt inköpskvitto gäller som garantisedel.</p>

                <h2 className="text-[18px] mb-5 font-bold">Ångerrätt</h2>
                <p className="mb-5">Ångerrätt enligt distansavtalslagen kan medföra rätt att ångra köp inom 14 dagar eller senast 14 dagar efter mottagandet. Konsument har i vissa fall rätt att frånträda ett köp genom att till Edvardson Sweden AB lämna eller sända ett meddelande om detta inom 14 dagar från den dag konsument tagit emot varan eller en väsentlig del av denna.</p>
                <p className="mb-5">Ångerrätten gäller dock inte då förseglingen/plomberingen brutits. Ångerrätt gäller endast om varan är i väsentligen oförändrat skick. Ångerrätten är ej tillämplig för företag.</p>

                <p className="mb-5">Vill konsument utöva ångerrätt rekommenderas denne att kontakta Edvardson Sweden AB på telefon 070-315 85 36 och uppge order- eller fakturanummer för att få en förbetald fraktsedel med tilldelat returnummer för retur av varan. Syftet med returnumret är att underlätta identifiering och administrering av återköpet.</p>

                <h2 className="text-[18px] mb-5 font-bold">Återköp</h2>
                <p className="mb-5">För vara ur ordinarie sortimentet vars originalförpackning och i förekommande fall påsar, ej brutits eller på annat sätt skadats, accepterar Edvardson Sweden AB återköp under fjorton (14) dagar från fakturadatum.</p>
                <p className="mb-5">Varor där originalförpackningen förstörts/försvunnit, delar saknas och/eller när varan är använd återköpes ej.</p>
                <p className="mb-5">Återköp accepteras ej heller för maskiner vars plombering/försegling brutits eller för varor specialbeställda för kunds räkning.</p>

                <p className="mb-5">Vid återköp skall kund ersätta Edvardson Sweden AB:s fraktkostnader.
                    Överstiger återköpets värde 1250 kr inkl moms utgår en återköpsavgift på 250 kr inkl moms.
                    Fraktkostnad och återköpsavgift faktureras separat.</p>

                <p className="mb-5">Vid återköp skall kund kontakta Edvardson Sweden AB på telefon 070-315 85 36 och uppge order och fakturanummer för att få ett returnummer.</p>
                <p className="mb-5">Observera att erhållande av returnummer ej utgör ett godkänt återköp.
                    Returnumret är giltigt under 14 dagar under vilken tid varan skall ha kommit Edvardson Sweden AB till handa.
                    Vid återsändandet av varan skall returfrakten till Edvardson Sweden AB vara betald samt skall faktura och uppgift om giltigt returnummer medfölja. <br />
                    Varan skall vara väl förpackad i av Posten godkänt ytteremballage (t ex brun wellpappkartong). <br />
                    Returer som inkommer till Edvardson Sweden AB i kuvert eller utan godkänt ytteremballage returneras till kunden utan åtgärd då dessa ej kan godkännas för återköp. <br />
                    Är frakten ej betald eller om returnummer eller annan handling saknas återsänds varan till kunden utan åtgärd.
                </p>

                <p className="mb-5"> Återköpet är godkänt först när Edvardson Sweden AB mottagit och kontrollerat varan och funnit den vara av insänd i enlighet med ovanstående villkor.</p>

                <h2 className="text-[18px] mb-5 font-bold">Personuppgifter</h2>
                <p className="mb-5">Edvardson Sweden AB:s målsättning är att alla personuppgifter som lämnas i samband med din/er beställning av varor, anmälan till nyhetsbrev, registrering av konto samt annan form av kommunikation behandlas så att du alltid skall kunna känna dig säker på att den personliga integriteten respekteras och att din/era personuppgifter behandlas med försiktighet.</p>

                <p className="mb-5">Personuppgifter, inklusive information såsom ditt namn, e-postadress, telefonnummer och/eller postadress som du lämnar till Edvardson Sweden AB kan bearbetas och sparas av oss för att tillgodose ditt behov av vår service, varor eller tjänster.</p>

                <p className="mb-5">Lämnade personuppgifter används endast i syfte att kunna förse dig med den information och de tjänster som du begärt, samt i marknadsföringssyfte för Edvardson Sweden AB:s egna produkter.</p>

                <p className="mb-5">Edvardson Sweden AB kan lämna ditt namn, e-postadress, telefonnummer och/eller postadress till tredje part såsom fakturerings-, logistikpartners eller någon av våra distributörer för att du skall kunna få våra produkter eller erbjudande om våra produkter. Lämnade uppgifter går inte vidare utanför våra fakturerings-, logistikpartners och/eller distributörer och används bara i det syfte som angivits ovan.</p>

                <p className="mb-5">Enligt personuppgiftslagen har du rätt att få tillgång till, samt rätta till dina personuppgifter. Om du har några frågor gällande behandling av dina personuppgifter är du välkommen att kontakta oss.</p>

                <p className="mb-5">Denna sida innehåller även länkar till andra webbsidor. Vi ansvarar dock inte för innehållet i länkade webbsidor och inte heller för deras behandling av personuppgifter.</p>

                <h2 className="text-[18px] mb-5 font-bold">Integritetspolicy</h2>

                <p className="mb-5">Integritetspolicy hittar du här</p>

                <h2 className="text-[18px] mb-5 font-bold">Om cookies</h2>
                <p className="mb-5">Cookies kan liknas vid små avtryck. En speciell fil, en så kallad cookie-fil sparas ner på din dator när du går in på en viss webbplats. Cookie-filen består av en liten datamängd med information om vad du gör när du besöker sidan. <br />
                    Informationen om vad du gjorde vid tidigare besök skickas av webbservern till din webbläsare och kan sedan hämtas därifrån.<br />
                    Cookie-filerna är vanliga textfiler och kan inte innehålla virus. Filerna är små och både Firefox och Explorer tillåter bara att en viss mängd cookies sparas i minnet. Det är alltså ingen risk att minnet blir fullt bara för att du tillåter cookies.<br />
                    På denna webbplats används en kombination av sessions-cookies och lagrade cookies, för olika inställningar som användaren gör. Du måste alltså tillåta lagring av cookies, för att kunna t.ex. logga in och lägga order.
                </p>
                <h2 className="text-[18px] mb-5 font-bold">Tryckfel m.m.</h2>
                <p className="mb-5"> Edvardson Sweden AB reserverar sig för eventuella tryckfel, brister i information samt felaktika specifikationer på denna hemsida. <br />
                    Notera även att bilderna är att anse som vägledande information och att deras proportioner sinsemellan inte stämmer.
                </p>
                <h2 className="text-[18px] mb-5 font-bold">Förhinder av fullgörelse</h2>
                <p className="mb-5">Om Edvardson Sweden AB:s fullgörelse av avtalet hindras, försvåras eller väsentligen fördyras av någon omständighet - såsom t ex krig, myndighetsingripande, oroligheter, inskränkningar i energitillförseln, arbetsmarknadsstörningar, förbud, restriktioner, uteblivna import- eller exporttillstånd, olyckshändelser, ogynnsamma transport- eller väderleksförhållanden eller uteblivna leveranser från underleverantörer - som Edvardson Sweden AB inte skäligen kunnat förutse vid tidpunkten för avtalets slutande och vars följder Edvardson Sweden AB inte heller skäligen kunnat undvika eller övervinna, skall Edvardson Sweden AB i motsvarande grad befrias från sina förpliktelser att fullgöra detta avtal. Inträffar sådan omständighet som nämns i föregående mening, skall Edvardson Sweden AB utan uppskov skriftligen underrätta den kund som berörs därav.</p>

                <h2 className="text-[18px] mb-5 font-bold">Giltighet fr.o.m. 2023-11-30</h2>
                <p className="mb-5"> Edvardson Sweden AB förbehåller sig rätten att utan föregående avisering ändra innehållet i dessa villkor och det åligger kunden/besökaren av denna webbplats att hålla sig informerad och uppdaterad om innehållet i dessa villkor <br />
                    Edvardson Sweden AB innehar F-skattsedel. </p>

                <h2 className="text-[18px] mb-5 font-bold">Moms/VAT nummer</h2>
                <p className="mb-5">SE556833383401</p>

                <h2 className="text-[18px] mb-5 font-bold">Kontaktuppgifter</h2>
                <ul>
                    <li>Edvardson Sweden AB</li>
                    <li>Skinnargränd 2</li>
                    <li>782 75  Malungsfors</li>
                    <li>Tel 070-315 85 36 Vardagar varierade öppettider, ring före</li>
                    <li>Övrig tid mailsupport: <a className="underline hover:font-bold" href="mailto:info@edvardson.se">info@edvardson.se</a></li>
                </ul>
            </div>
        </>
    )
}
