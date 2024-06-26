'use client'
import { useState } from "react";
import CartItem from "./CartItem";
import LoadingSpinner from "./LoadingSpinner";
import Link from "next/link";

export default function MiniCart({ cart, showMiniCart, onClick }: any) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div onClick={onClick} className={`${showMiniCart ? 'opacity-1 block' : 'opacity-0 hidden'} 2xl:right-[15%] z-[1000000] absolute top-8 right-10 mt-2 text-black max-w-xs bg-white p-4 shadow-md mincart`}>
        <div className="max-h-[300px] overflow-y-auto">
          {loading && <div className="bg-white/80 h-full w-full absolute max-w-[15rem] top-0 z-10 flex items-center justify-center"><LoadingSpinner text="Uppdaterar kundvagn..." /></div>}
          {cart?.items && cart?.items.length > 0 ? (
            cart.items.map((item: any) => (
              <CartItem key={item.id} item={item} setLoading={setLoading} />
            ))
          ) : (
            <span className="letter-spacing-0">No items in the cart</span>
          )}
        </div>

        {cart?.items && cart?.items.length > 0 && (
          <div className="flex flex-col items-end mt-4 border-t">
            <div className="text-md py-2 flex justify-between w-full">
              <p>Totalt: </p>
              <p>{cart.totals.total}</p>
            </div>
            <Link className="w-full border-[#000] transition-all duration-300 text-white border hover:border bg-black hover:text-black px-4 py-2 mt-2 uppercase text-center hover:bg-white" href="/kassa">GÅ Till Varukorgen</Link>
          </div>
        )}
      </div>
    </>
  );
}

