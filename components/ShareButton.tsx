"use client"
import Image from "next/image";
import { useState } from "react";

export default function ShareButton({ productName, productImage }: { productName: string, productImage: any }) {
    const [showSocialButtons, setShowSocialButtons] = useState(false);

    return (
        <>
            <button onClick={() => setShowSocialButtons((prev) => !prev)} className="text-md bg-black hover:bg-black/50 duration-300 transition-all rounded text-white py-2 px-4 mt-2">
                Dela
            </button>
            {showSocialButtons && <div className="flex mt-2">
                <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}>
                    <button className="p-2 flex items-center jsutify-center bg-[#039BE5]">
                        <Image width={32} height={32} src="/images/icons8-facebook.svg" alt="Facebook" />
                    </button>
                </a>
                <a target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(productName)}&url=${window.location.href}`}>
                    <button className="p-2 flex items-center jsutify-center bg-[#03A9F4]">
                        <Image width={32} height={32} src="/images/icons8-twitter.svg" alt="Twitter" />
                    </button>
                </a>
                <a target="_blank" href={`https://www.pinterest.com/pin-builder/?description=${encodeURIComponent(productName)}&media=${productImage}&method=button&url=${window.location.href}`}>
                    <button className="p-2 flex items-center jsutify-center bg-[#CA2028]">
                        <Image width={32} height={32} src="/images/pinterest-icon.svg" alt="Pinterest" />
                    </button>
                </a>
                <a target="_blank" href={`mailto:?subject=${encodeURIComponent(productName)}&body=${encodeURIComponent("Hej! Jag rekommenderar ${productName} från www.edvardson.se Läs mer här: ${window.location.href}")}`}>
                    <button className="p-2 flex items-center justify-center bg-[#42C5B0]">
                        <Image width={32} height={32} src="/images/mail-icon.svg" alt="Pinterest" />
                    </button>
                </a>
            </div>}
        </>
    )
}



