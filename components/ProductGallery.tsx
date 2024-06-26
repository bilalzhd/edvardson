'use client'
import ImageGallery from "react-image-gallery";


export default function ProductGallery({ items }: any) {
    const images = items?.map((item: any) => {
        return {
            original: item.src,
            thumbnail: item.src,
        }
    })
    return (
        <ImageGallery showPlayButton={false} additionalClass="w-full space-x-3 bg-[#F6F6F6]" items={images} />
    )
}
