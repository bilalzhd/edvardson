import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../lib/store'

const DEFAULT_NUMBER_OF_PRODUCTS_TO_FETCH = 6;

export default async function Home() {
  const data = await getProducts(DEFAULT_NUMBER_OF_PRODUCTS_TO_FETCH);
  const products = data.products as Product[];
  return (
    <>
      <div className='relative pb-4'>
        {/* <img className='w-full' src='/images/edvardson_products.jpg' /> */}
        <div className='bg-[#00030A] relative flex justify-center flex-col text-white p-4 2xl:bg-[url("/images/eddd-large.jpg")] bg-[url("/images/wood_bg.jpg")] min-h-[30rem] bg-repeat md:min-h-[35rem] bg-pos-x-xl'>
          <div className='absolute inset-0 bg-black/40 flex justify-center items-center'>
            <div className='md:max-w-4xl px-[1.5rem] md:px-0'>
              <h3 className='text-[46px] md:text-[48px] font-bold'>Välkommen till Edvardson Sweden</h3>
              <p className='text-[#bdbdbd] text-sm font-open letter-spacing-0 leading-6 md:block hidden'>Edvardson Sweden är ett anrikt familjeföretag, tidigare känt som Malungsfors Läderprodukter. Det började på 1860-talet då farfars farfar Edvard Torstensson började med skomakeri för att livnära sig. Sedan dess har tillverkningen utökats till att även innefatta jakttillbehör och friluftstillbehör i läder.</p>
              <button className='bg-white text-black uppercase px-5 py-3 rounded-[2rem] font-bold mt-4'>köp nu</button>
            </div>
          </div>
        </div>


      </div>
      <div className='xl:max-w-[80%] 2xl:max-w-[70%] lg:w-full mx-auto py-4 min-h-screen'>
        <div className='px-[10px]'>
          <h2 className='uppercase font-bold text-[2.125rem] leading-[1.1] mb-2'>Veckans erbjudande</h2>
          <p className='mb-10'>Årstidernas växlingar ställer nya krav på jaktkläder. Här är våra rekommendationer för den nya säsongen.</p>
        </div>
        <div className='flex flex-wrap md:gap-[10px] px-[6px] md:px-0'>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className='mb-12 flex flex-col items-center'>
        <h3 className='text-xl font-bold text-center'>Fynda gärna i vår OUTLET</h3>
        <Link href="/product-category/fore-och-efter-jakten/ovrigt/edvardson-outlet/" className='bg-white text-black uppercase hover:bg-black hover:text-white transition-all duration-200 px-6 py-3 rounded-[2rem] font-bold mt-4 border-black border w-fit'>
          Hitta
          </Link>
      </div>
      <div className='bg-[#E5FFEA] mb-12'>
        <div className='flex md:flex-row flex-col-reverse xl:max-w-[80%] 2xl:max-w-[70%] mx-auto'>
          <div className='md:w-1/2 py-[2.5rem] pr-[2.5rem] md:pl-0 pl-[1.5rem] flex justify-center flex-col gap-5 letter-spacing-0 '>
            <h2 className='text-[2.125rem] font-bold'>
              OM EDVARDSON
            </h2>
            <p>
              Edvardson Sweden AB prioriterar att producera produkter av exceptionell kvalitet och funktionalitet. Från sämskskinnsjackor till specialtillverkade föremål, betoningen ligger på hållbarhet, komfort och miljöansvar. Den omfattande skotillverkningstraditionen informerar tillverkningen av lädervaror och skapar hållbara produkter som står sig över tiden.
            </p>
            <button className='bg-black text-white uppercase hover:bg-white hover:text-black transition-all duration-200 px-5 py-3 rounded-[2rem] font-bold mt-4 border-black border w-fit'><Link href="/om-edvardson">Läs mer</Link></button>
          </div>
          <div className='md:w-1/2 py-[30px] px-3 md:px-0'>
            <img className='max-h-[450px] w-full object-cover' src="/images/product-bg-edvardson.jpg" alt="Edvardson About" />
          </div>

        </div>
      </div>
      {/* <div className='xl:max-w-[80%] 2xl:max-w-[70%] mx-auto letter-spacing-0 mt-20 mb-10'>
        <div className='mb-[2rem]'>
          <h2 className='text-[1.6rem] font-bold mb-[1rem]'>Edvardson Sweden: A Legacy of Craftsmanship</h2>
          <p className='text-[#313131]'>Edvardson Sweden, formerly Malungsfors Läderprodukter, dates back to the 1860s, rooted in the shoemaking craft of great-grandfather Edvard Torstensson. The business has evolved to encompass high-quality hunting and outdoor accessories, embodying values of knowledge, quality, and robust craftsmanship.</p>
        </div>
        <h2 className='text-[1.6rem] font-bold mb-[1rem]'>Quality and Functionality at Edvardson Sweden AB</h2>
        <p className='text-[#313131]'>Edvardson Sweden AB prioritizes producing products of exceptional quality and functionality. From chamois jackets to custom-made items, the emphasis is on durability, comfort, and environmental responsibility. The extensive shoemaking tradition informs the manufacturing of leather goods, creating enduring products that stand the test of time.</p>
      </div> */}

      <div className='mb-12 relative bg-[url("/images/edvardsonproducts.jpg")] bg-center text-white xl:max-w-[80%] 2xl:max-w-[70%] mx-auto flex flex-col items-center justify-center gap-5 border-t py-10'>
        <div className='bg-black/40 absolute inset-0 w-full z-10'></div>
        <div className='flex flex-col gap-4 z-20'>
          <p className='px-[1.5rem] md:px-0'>Gå med i vårt nyhetsbrev och få erbjudanden och information före alla andra.</p>
          <div className='flex gap-2 justify-center'>
            <input type="email" name='email' id='email' placeholder='Din epostadress' className='rounded border px-2 border-black' />
            <button type='submit' className='border border-black px-4 py-3 hover:border-white rounded bg-black hover:text-white transition-all duration-300'>Anmälan</button>
          </div>
        </div>
      </div>
    </>
  )
}