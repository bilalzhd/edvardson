import ProductCard from './components/ProductCard';
import { getProducts } from './lib/store'


export default async function Home() {
  const data = await getProducts();
  const products = data.products as Product[];
  return (
    <>
      <div className='relative py-4 mx-12'>
        <img className='w-full' src='https://shop.textalk.se/shop/21855/files/skyltfonster_desktop_ny_20190314.jpg.png?max-width=1110&max-height=185&quality=85&resize=crop&fmt=avif' />
        <div className='absolute bg-black/70 bottom-4 text-white p-4'>
          <h3 className='text-2xl letter-spacing-0'>HUNTING BELT EDVARDSON</h3>
          <p className='text-[#bdbdbd] text-sm font-open letter-spacing-0'>Swedish craftsmanship of the highest quality</p>
        </div>
      </div>
      <div className='p-2 min-h-screen mx-12 bg-black/30'>
        <div className='flex flex-wrap mx-4 gap-[10px]'>
          {products.map(product => {
            return (
              <ProductCard key={product.id} product={product} />
            )
          })}
        </div>
      </div>
    </>
  )
}
