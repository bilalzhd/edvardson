import ProductCard from './components/ProductCard';
import { getProducts } from './lib/menu'


export default async function Home() {
  const data = await getProducts();
  const products = data.products as Product[];
  return (
    <div className='p-2 min-h-screen mx-12 bg-black/30'>
      <div>
        <picture>
          <source src='/images/veckans_02.avif' />
        </picture>
      </div>
      <div className='flex flex-wrap -mx-4'>
        {products.map(product => {
          return (
            <ProductCard key={product.id} product={product} />
          )
        })}
      </div>
    </div>
  )
}
