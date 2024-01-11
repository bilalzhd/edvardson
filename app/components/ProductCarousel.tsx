'use client';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
    }
};
export default function ProductCarousel({ products }: any) {

    return (
        <div className="px-10">
            <Carousel infinite responsive={responsive}>
                {products?.map((product: any) => <ProductCard key={product.id} product={product} />)}
            </Carousel>
        </div>
    )
}
