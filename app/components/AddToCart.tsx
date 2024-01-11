export default function AddToCart() {
  return (
    <form className="w-full flex mt-5 gap-2">
      <input type="number" className="max-w-[52px] text-black p-2 text-center" min={1} defaultValue={1} name="quantity" id="quantity" />
      <button type="submit" className="font-bold w-full py-[13px] px-[28px] flex-1 transition-all duration-200 uppercase hover:bg-[#538e4c] bg-[#679761] border border-[#679761]">Add To Cart</button>
    </form>
  )
}
