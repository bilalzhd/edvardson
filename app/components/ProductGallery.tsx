'use client'
import ImageGallery from "react-image-gallery";


export default function ProductGallery({ items }: any) {
    const images = items.map((item: any) => {
        return {
            original: item.src,
            thumbnail: item.src,
        }
    })
    return (
        <ImageGallery showPlayButton={false} additionalClass="w-full bg-[#D0BCB0]" items={images}/>
    )
}
