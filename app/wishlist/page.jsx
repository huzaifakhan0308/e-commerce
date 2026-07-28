"use client";
import { useEffect, useState } from "react";
import Product from "../../components/product";
import { getWishlist } from "../../components/lib/whishlist";

export default function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const loadWishlist = () => {
      const ids = getWishlist();

      if (ids.length === 0) {
        setWishlistProducts([]);
        setLoading(false);
        return;
      }

      fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/products`)
        .then((res) => res.json())
        .then((data) => {
          // only keep products whose id is saved in the wishlist
          const filtered = data.filter((p) => ids.includes(p._id));
          setWishlistProducts(filtered);
        })
        .catch(() => setWishlistProducts([]))
        .finally(() => setLoading(false));
    };

    loadWishlist();

    // re-load if the wishlist changes elsewhere (e.g. removed via heart icon on this same page)
    window.addEventListener("wishlistChange", loadWishlist);
    return () => window.removeEventListener("wishlistChange", loadWishlist);
  }, []);

  const handleItemsPerView = () => {
    setItemsPerView(itemsPerView + 4);
  };

  return (
    <div className="flex items-center flex-col mt-[100px] w-[100%] max-w-7xl">
      <div className="overflow-hidden w-[100%] mt-10 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>

        {loading && <p className="text-gray-400">Loading...</p>}

        {!loading && wishlistProducts.length === 0 && (
          <p className="text-gray-400">Your wishlist is empty</p>
        )}

        {!loading && wishlistProducts.length > 0 && (
          <div className="grid grid-cols-4 gap-5">
            {wishlistProducts.slice(0, itemsPerView).map((p) => {
              const offer =
                p.discountPrice != null && p.discountPrice < p.price
                  ? Math.round(((p.price - p.discountPrice) / p.price) * 100)
                  : 0;
              const image = p.images?.[0]
                ? `data:${p.images[0].imageType};base64,${p.images[0].image}`
                : "/images/mainImage1.jpg";

              return (
                <div key={p._id}>
                  <Product
                    id={p._id}
                    image={image}
                    name={p.name}
                    price={p.price}
                    offer={offer}
                    offerTrue={offer > 0}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!loading && wishlistProducts.length > 0 && (
        <button
          disabled={itemsPerView >= wishlistProducts.length}
          onClick={handleItemsPerView}
          style={{ opacity: itemsPerView >= wishlistProducts.length ? 0.5 : 1 }}
          className="px-[40px] py-[12px] bg-[#db4444] mt-10 cursor-pointer text-white rounded-[4px]"
        >
          View More
        </button>
      )}
    </div>
  );
}
