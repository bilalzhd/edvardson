import ProductCard from '../components/ProductCard';
import { getProducts } from '../lib/store'

const DEFAULT_NUMBER_OF_PRODUCTS_TO_FETCH = 6;

export default async function Home() {
  const data = await getProducts(DEFAULT_NUMBER_OF_PRODUCTS_TO_FETCH);
  const products = data.products as Product[];
  return (
    <>
      <div className='relative py-4'>
        {/* <img className='w-full' src='/images/edvardson_products.jpg' /> */}
        <div className='bg-black/70 relative flex justify-center flex-col text-white p-4 bg-[url("/images/edvardson_products.jpg")] min-h-[35rem]'>
          <div className='absolute inset-0 bg-black/40 flex justify-center items-center'>
            <div className='pl-[5.875rem]'>
              <h3 className='text-[48px] font-bold'>DEERHUNTER HUNTING AND OUTDOOR CLOTHING</h3>
              <p className='text-[#bdbdbd] text-sm font-open letter-spacing-0'>Swedish craftsmanship of the highest quality</p>
              <button className='bg-white text-black uppercase px-4 py-3 rounded-[2rem] font-bold mt-4'>Buy Now</button>
            </div>
          </div>
        </div>


      </div>
      <div className='px-[1.25rem] xl:max-w-[80%] 2xl:max-w-[70%] lg:w-full mx-auto py-4 min-h-screen'>
        <div className='px-[10px]'>
          <h2 className='uppercase font-bold text-[2.125rem]'>Veckans erbjudande</h2>
          <p className='mb-10'>The changing seasons place new demands on hunting clothing. Here’s our recommendations for the new season.</p>
        </div>
        <div className='flex flex-wrap mx-4 gap-[10px]'>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className='flex px-[1.25rem] xl:max-w-[80%] 2xl:max-w-[70%] mx-auto'>
        <div className='w-1/2 py-[2.5rem] pr-[2.5rem] pl-[3rem] flex justify-center flex-col gap-5 letter-spacing-0 '>
          <h2 className='text-[2.125rem] font-bold'>
            THE EXCAPE-SERIES
          </h2>
          <p>
            Lightweight, breathable and comfortable. The layered series, in the revolutionary Realtree Excape camouflage, keeps you warm and dry on the hunt. The series is available for both men and women.
          </p>
          <button className='bg-white text-black uppercase px-4 py-3 rounded-[2rem] font-bold mt-4 border-black border w-fit'>Buy Now</button>
        </div>
        <div className='w-1/2 p-[30px]'>
          <img className='max-h-[450px] w-full object-cover' src="https://fengel-b2b-apigateway-prod.azurewebsites.net/cms-api/media/1223542f-6f63-4eb3-a8a7-e11e1e9c6847?key=block-square-large" alt="Edvardson About" />
        </div>

      </div>
      <div className='xl:max-w-[80%] 2xl:max-w-[70%] mx-auto letter-spacing-0 mt-20 mb-10 px-[2.5rem]'>
        <div className='mb-[2rem]'>
          <h2 className='text-[1.6rem] font-bold mb-[1rem]'>Edvardson Sweden: A Legacy of Craftsmanship</h2>
          <p className='text-[#313131]'>Edvardson Sweden, formerly Malungsfors Läderprodukter, dates back to the 1860s, rooted in the shoemaking craft of great-grandfather Edvard Torstensson. The business has evolved to encompass high-quality hunting and outdoor accessories, embodying values of knowledge, quality, and robust craftsmanship.</p>
        </div>
        <h2 className='text-[1.6rem] font-bold mb-[1rem]'>Quality and Functionality at Edvardson Sweden AB</h2>
        <p className='text-[#313131]'>Edvardson Sweden AB prioritizes producing products of exceptional quality and functionality. From chamois jackets to custom-made items, the emphasis is on durability, comfort, and environmental responsibility. The extensive shoemaking tradition informs the manufacturing of leather goods, creating enduring products that stand the test of time.</p>
      </div>

      <div className='xl:max-w-[80%] 2xl:max-w-[70%] mx-auto flex flex-col items-center justify-center gap-5 border-t py-10'>
        <p>Join our newsletter and get offers and information before everyone else.</p>
        <div className='flex gap-2'>
          <input type="email" name='email' id='email' placeholder='Din epostadress' className='border px-2 border-black' />
          <button type='submit' className='border border-black px-4 py-3 hover:bg-black hover:text-white transition-all duration-300'>Anmälan</button>
        </div>
      </div>
    </>
  )
}
