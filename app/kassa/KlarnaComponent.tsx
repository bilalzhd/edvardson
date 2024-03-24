"use client";
import { useEffect } from "react";
declare var Klarna: any;
export const KlarnaComponent = ({
	klarnaSession,
	onComplete,
	customerData
}: {
	klarnaSession: {
		client_token: string; payment_method_categories?: | { asset_urls?: | { descriptive?: string | undefined; standard?: string | undefined } | undefined; identifier?: string | undefined; name?: string | undefined; }[] | undefined; session_id: string;
	}; onComplete: (responseData: any) => Promise<void>; customerData: any
}) => {
	const billingAddress = {
		given_name: customerData.firstName,
		family_name: customerData.lastName,
		title: "Mr",
		email: customerData.email,
		street_address: customerData.billingAddress1,
		postal_code: customerData.billingPostcode,
		city: customerData.billingCity,
		phone: customerData.billingPhone,
		country: "SE",

	};
	const shippingAddress = { ...billingAddress }

	useEffect(() => {
		if (typeof window === "undefined" || "Klarna" in window) {
			return;
		}
		// @ts-expect-error -- klarna callback
		window.klarnaAsyncCallback = () => {
			Klarna.Payments.init({
				client_token: klarnaSession.client_token,
			});
			Klarna.Payments.authorize({
				payment_method_categories: [{
					asset_urls: {},
					identifier: "klarna",
					name: "Pay with Klarna",
				}],
				customer: {
					date_of_birth: "1980-01-01",
				}
			},
				{
					billing_address: billingAddress,
					shipping_address: shippingAddress,
				},
				async function (...args: any) {
					const response = { ...args };
					if (response[0].approved) {
						await onComplete(response);
					} else {
						window.location.reload();
					}
				},
			);
		};

		const script = document.createElement("script");
		script.id = "klarna-payments-sdk";
		script.src = `https://x.klarnacdn.net/kp/lib/v1/api.js`;
		script.async = true;
		document.body.appendChild(script);
		// eslint-disable-next-line
	}, [klarnaSession.client_token, onComplete]);

	return <div id="klarna-payments-container" />;
};
