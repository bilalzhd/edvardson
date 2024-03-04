"use client"

import { AppContext } from "@/context";
import { useContext, useState } from "react";
import Address from "./Address";

// Use this for testing purposes, so you dont have to fill the checkout form over an over again.
const defaultCustomerInfo = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  country: '',
  state: '',
  postcode: '',
  email: '',
  phone: '',
  company: '',
  errors: null,
};

export default function CheckoutForm({ countriesData }: any) {
  const { billingCountries, shippingCountries } = countriesData || {};
  const initialState = {
    billing: {
      ...defaultCustomerInfo
    },
    shipping: {
      ...defaultCustomerInfo
    },
    createAccount: false,
    orderNotes: '',
    billingDifferentThanShipping: false,
    paymentMethod: 'cod',
  }
  const [cart, setCart] = useContext(AppContext);
  const [input, setInput] = useState(initialState);
  const [requestError, setRequestError] = useState(null)
  const [theShippingStates, setTheShippingStates] = useState([]);
  const [theBillingStates, setTheBillingStates] = useState([]);
  const [isFetchingShippingStates, setIsFetchingShippingStates] = useState(false);
  const [isFetchingBillingStates, setIsFetchingBillingStates] = useState(false);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [createdOrderDate, setCreatedOrderDate] = useState({});

  function handleOnChange (event: any, isShipping = false, isBilling = false ) {

  }

  function handleFormSubmit() {

  }

  return (
    <>
      {(cart as Cart)?.items?.length > 0 ? (

        <form className="checkout-form" onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div>
              {/* Shipping Details */}
              <div className="shipping-details">
                <h2 className="text-xl font-medium mb-4">Shipping Details</h2>
                <Address
                  states={theShippingStates}
                  countries={shippingCountries}
                  input={input?.shipping}
                  handleOnChange={( event: any ) => handleOnChange(event, true, true)}
                  isFetchingStates={isFetchingShippingStates}
                  isShipping
                  containerClassNames="w-full overflow-hidden sm:my-2 sm:px-2 md:w-1/2"
                />
              </div>
            </div>
          </div>
        </form>

      ) : null}
    </>
  )
}
