export default function MiniCart({ cart, showMiniCart }: any) {
  return (
    <>
    {showMiniCart && (<div className="z-10 absolute top-10 right-10 mt-2 text-black max-w-xs bg-white p-4 shadow-md mincart">
      {cart.items?.map((item: any) => (
        <div key={item.id} className="flex items-center mb-2">
          <img src={item.featured_image} alt={item.name} className="w-12 h-12 mr-2" />
          <div className="flex flex-col">
            <span>{item.name}</span>
            <span>{item.totals.total}</span>
          </div>
        </div>
      ))}
    </div>)}
    </>
  );
}
