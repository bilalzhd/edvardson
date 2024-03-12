"use client"

import { useEffect } from 'react'

declare global {
    interface Window {
        klarnaAsyncCallback?: Function;
    }
}

export default async function KlarnaCheckout({ clientToken }: { clientToken: string }) {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://x.klarnacdn.net/kp/lib/v1/api.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => { // Execute Klarna initialization after script loads
            window.klarnaAsyncCallback = function () {
                Klarna?.Payments.init({
                    client_token: clientToken
                });
                Klarna?.Payments.load({
                    container: '#klarna-payovertime-container',
                    payment_method_category: "pay_now"
                }, function (res: any) {
                    console.debug(res);
                })
            };
        };


        // Cleanup function (optional)
        return () => {
            document.body.removeChild(script);
        };
    }, []);


    return (
        <div>
            <img src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg" alt="" />
            <div id="klarna-payovertime-container">
            </div>
        </div>

    )
}