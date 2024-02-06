import ProductCard from "@/components/ProductCard"
import ProductCategory from "@/components/ProductCategory"
import Toolbar from "@/components/Toolbar"
import { getSearchedProducts } from "@/lib/store"

export default async function Search({ params }: { params: { term: string } }) {
    const data = await getSearchedProducts(params.term)
    return (
        // <div className="xl:max-w-[80%] 2xl:max-w-[70%] mx-auto my-5">
        //     <h1 className="text-[22px] font-bold text-center my-[20px]">Sökresultat</h1>
        //     <Toolbar setProductView={setProductView} />
        //     <div className="flex flex-wrap gap-[10px]">
        //         {data.products?.map(p => {
        //             return (<ProductCard product={p} />)
        //         })}
        //     </div>
        // </div>
        <ProductCategory products={data.products} currentCategory={{name: "Sökresultat"}} />
    )
}
