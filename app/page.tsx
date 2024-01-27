import ProductCard from '../components/ProductCard';
import { getProducts } from '../lib/store'

const DEFAULT_NUMBER_OF_PRODUCTS_TO_FETCH = 4;

export default async function Home() {
  const data = await getProducts(DEFAULT_NUMBER_OF_PRODUCTS_TO_FETCH);
  const products = data.products as Product[];
  return (
    <>
      <div className='relative py-4'>
        <img className='w-full' src='https://shop.textalk.se/shop/21855/files/skyltfonster_desktop_ny_20190314.jpg.png?max-width=1110&max-height=185&quality=85&resize=crop&fmt=avif' />
        <div className='absolute bg-black/70 bottom-4 text-white p-4'>
          <h3 className='text-2xl letter-spacing-0'>HUNTING BELT EDVARDSON</h3>
          <p className='text-[#bdbdbd] text-sm font-open letter-spacing-0'>Swedish craftsmanship of the highest quality</p>
        </div>
      </div>
      <div className='px-2 py-4 min-h-screen bg-black/30'>
        <div className='flex flex-wrap mx-4 gap-[10px] -m-2'>
          {products.map(product => (
              <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}
