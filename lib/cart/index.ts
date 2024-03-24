import { Dispatch, SetStateAction } from "react";
// import { CART_ENDPOINT } from "../constants/endpoints";
import { CART_ENDPOINT } from "../constants";
import { getApiCartConfig } from "./api";
import { getSession, storeSession } from "./session";
import { isEmpty } from "..";

type BooleanState = Dispatch<SetStateAction<boolean>>;
export function addToCars( productId: number, quantity: number, setCart: any, setIsAddedToCart: BooleanState, setLoading: BooleanState )
{
    const storedSession = getSession();
    const addOrViewCartConfig = getApiCartConfig();

    setLoading(true);

    fetch(CART_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
            product_id: productId,
            quantity
        },
            addOrViewCartConfig
        )
    }).then((res: any) => {
        if (isEmpty(storedSession)) {
            storeSession(res?.headers?.['x-wc-session']);
        }
        setIsAddedToCart(true);
        setLoading(false);
        viewCart(setCart, () => {});

    })
} 

export const viewCart = ( setCart: any, setProcessing: any ) => {
	
	const addOrViewCartConfig = getApiCartConfig();
	
	fetch( CART_ENDPOINT, addOrViewCartConfig )
		.then( ( res: any ) => {
			const formattedCartData = getFormattedCartData( res?.data ?? [] )
			setCart( formattedCartData );
			setProcessing(false);
		} )
		.catch(err => {
			console.error( 'err', err );
			setProcessing(false);
		});
};


const getFormattedCartData = ( cartData: any ) => {
	if ( ! cartData.length ) {
		return null;
	}
	const cartTotal = calculateCartQtyAndPrice( cartData || [] );
	return {
		cartItems: cartData || [],
		...cartTotal,
	};
};


const calculateCartQtyAndPrice = ( cartItems: any ) => {
	const qtyAndPrice = {
		totalQty: 0,
		totalPrice: 0,
	}
	
	if (!cartItems?.length ) {
		return qtyAndPrice;
	}
	
	cartItems.forEach( (item: any, index: number) => {
		qtyAndPrice.totalQty += item?.quantity ?? 0;
		qtyAndPrice.totalPrice += item?.line_total ?? 0;
	} )
	
	return qtyAndPrice;
}