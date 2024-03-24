// "use client";

// import { useEffect, useState } from "react";

// export default function ShippingAddress({ shippingAddress }: { shippingAddress: string }) {
//     const isAlreadyFullAddress = shippingAddress.length < 31;
//     let shortShippingAddress = shippingAddress.substring(0, 30)
//     const [fullAddress, setFullAddress] = useState(false);

//     useEffect(() => {
//         if (fullAddress) {
//             shortShippingAddress = shippingAddress;
//         }
//     }, [fullAddress])

//     return (
//         <td className="pr-8">{shortShippingAddress}... {!isAlreadyFullAddress && <button onClick={() => setFullAddress(true)}>visa mer</button>}</td>
//     )

// }

"use client"
import { useState } from "react";

export default function ShippingAddress({ shippingAddress }: { shippingAddress: string }) {
    const [showFullAddress, setShowFullAddress] = useState(false);

    const shortShippingAddress = shippingAddress.substring(0, 30);

    return (
        <div className="pr-8">
            {showFullAddress ? shippingAddress : shortShippingAddress}
            {shippingAddress.length > 30 && !showFullAddress && (
                <button onClick={() => setShowFullAddress(true)}>Visa mer</button>
            )}
        </div>
    );
}

