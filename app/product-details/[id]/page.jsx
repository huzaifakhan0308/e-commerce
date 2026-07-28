"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import {
  isInWishlist,
  toggleWishlist,
} from "../../../components/lib/whishlist";
import Product from "../../../components/product";
import SectionHeader from "../../../components/ui/sectionHeader";
import Link from "next/link";

const stars = [1, 2, 3, 4, 5];

export default function BillingDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [colorsClickedId, setColorsClickedId] = useState(null);
  const [sizeClickedId, setSizeClickedId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [realtedLoading, setRealtedLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/products`)
      .then((res) => res.json())
      .then((data) => setRelatedProducts(data))
      .catch(() => setRelatedProducts([]))
      .finally(() => setRealtedLoading(false));
  }, []);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_ECOMMERCE_BE_API}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setColorsClickedId(data.colors?.[0] ?? null);
        setSizeClickedId(data.sizes?.[0] ?? null);
        setWishlisted(isInWishlist(data._id));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleWishlistClick = () => {
    const nowWishlisted = toggleWishlist(id);
    setWishlisted(nowWishlisted);
  };

  const handleBuyNow = () => {
    const params = new URLSearchParams();
    if (colorsClickedId) params.set("color", colorsClickedId);
    if (sizeClickedId) params.set("size", sizeClickedId);
    params.set("quantity", quantity);

    router.push(`/billing-details/${id}?${params.toString()}`);
  };

  if (loading) {
    return <p className="mt-10 text-center text-gray-400">Loading...</p>;
  }

  if (error || !product) {
    return <p className="mt-10 text-center text-gray-400">Product not found</p>;
  }

  const images = product.images?.length > 0 ? product.images : [];
  const mainImage = images[selectedImage]
    ? `data:${images[selectedImage].imageType};base64,${images[selectedImage].image}`
    : "/images/Side Image.png";

  const hasDiscount =
    product.discountPrice != null && product.discountPrice < product.price;

  return (
    <div className="">
      <div className="flex w-[1200px] justify-between gap-25 mt-10">
        <div className="flex w-[60%] h-[80vh] gap-10">
          <div className="grid grid-rows-4 grid-cols-1 w-[150px] gap-5">
            <div
              className={`flex justify-center items-center w-full h-full  bg-[#F5F5F5] p-4 ${
                selectedImage === 0 ? "ring-2 ring-[#db4444]" : ""
              }`}
            >
              <img
                onClick={() => images[0] && setSelectedImage(0)}
                className={` object-cover cursor-pointer`}
                src={
                  images[0]
                    ? `data:${images[0].imageType};base64,${images[0].image}`
                    : "/images/Side Image.png"
                }
                alt=""
              />
            </div>
            <div
              className={`flex justify-center items-center w-full h-full  bg-[#F5F5F5] p-4 ${
                selectedImage === 1 ? "ring-2 ring-[#db4444]" : ""
              }`}
            >
              <img
                onClick={() => images[1] && setSelectedImage(1)}
                className={` object-cover cursor-pointer`}
                src={
                  images[1]
                    ? `data:${images[1].imageType};base64,${images[1].image}`
                    : "/images/Side Image.png"
                }
                alt=""
              />
            </div>
            <div
              className={`flex justify-center items-center w-full h-full  bg-[#F5F5F5] p-4 ${
                selectedImage === 2 ? "ring-2 ring-[#db4444]" : ""
              }`}
            >
              {" "}
              <img
                onClick={() => images[2] && setSelectedImage(2)}
                className={` object-cover cursor-pointer`}
                src={
                  images[2]
                    ? `data:${images[2].imageType};base64,${images[2].image}`
                    : "/images/Side Image.png"
                }
                alt=""
              />
            </div>
            <div
              className={`flex justify-center items-center w-full h-full  bg-[#F5F5F5] p-4 ${
                selectedImage === 3 ? "ring-2 ring-[#db4444]" : ""
              }`}
            >
              <img
                onClick={() => images[3] && setSelectedImage(3)}
                className={` object-cover cursor-pointer`}
                src={
                  images[3]
                    ? `data:${images[3].imageType};base64,${images[3].image}`
                    : "/images/Side Image.png"
                }
                alt=""
              />
            </div>
          </div>
          <div className="w-full h-full bg-[#F5F5F5] flex justify-center items-center">
            <img
              src={mainImage}
              className="object-cover w-[60%]"
              alt={product.name}
            />
          </div>
        </div>
        <div className="flex flex-col w-[40%] gap-4">
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <div className="flex items-center gap-3">
            {stars.map((s) => (
              <img className="h-[15px]" key={s} src="/icons/star.svg" alt="" />
            ))}
            <span>(150 Reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              ${hasDiscount ? product.discountPrice : product.price}
            </span>
            {hasDiscount && (
              <span className="line-through text-[#00000099]">
                ${product.price}
              </span>
            )}
          </div>
          <p className="text-sm">
            PlayStation 5 Controller Skin High quality vinyl with air channel
            adhesive for easy bubble free install & mess free removal Pressure
            sensitive.
          </p>

          {product.colors?.length > 0 && (
            <div className="flex items-center gap-3">
              <span>Colours:</span>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <div
                    key={c}
                    onClick={() => setColorsClickedId(c)}
                    style={{ backgroundColor: c }}
                    className={`cursor-pointer w-7 h-7 rounded-full overflow-hidden ${
                      colorsClickedId === c ? "ring-2" : ""
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="flex items-center gap-3">
              <span>Size:</span>
              {product.sizes.map((s) => (
                <span
                  key={s}
                  onClick={() => setSizeClickedId(s)}
                  className={`border cursor-pointer flex justify-center items-center w-10 h-10 rounded-[5px] ${
                    sizeClickedId === s
                      ? "border-[#db4444] bg-[#db4444] text-white"
                      : "border-gray-400"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          <div className="borde flex -[50px] items-center gap-3">
            <div className=" w-[180px] h-full flex border border-gray-400 rounded-[4px] overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className=" w-[20%] bg-[#db4444] cursor-pointer text-white"
              >
                -
              </button>
              <div className="w-[62%] flex justify-center items-center">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className=" w-[20%] bg-[#db4444] cursor-pointer text-white"
              >
                +
              </button>
            </div>
            <Button
              title={"Buy Now"}
              className={"h-full"}
              onClick={handleBuyNow}
            />
            <button
              onClick={handleWishlistClick}
              className="flex border border-gray-400 h-full rounded-[4px] flex items-center justify-center w-[45px] cursor-pointer"
            >
              {wishlisted ? (
                <img src="/icons/Redheart.png" alt="" />
              ) : (
                <img src="/icons/heart.svg" alt="" />
              )}
            </button>
          </div>
          <div className="border flex items-center gap-5 py-5 px-2">
            <img className="h-[50px]" src="/icons/car.svg" alt="" />
            <div className="">
              <h3>Free Delivery</h3>
            </div>
          </div>
          <div className="border flex items-center gap-5 py-5 px-2">
            <img src="/icons/icon-return.svg" alt="" />
            <div className="">
              <h3>Return Delivery</h3>
              <span>Free 30 Days Delivery Returns</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col mt-[100px] w-[100%]">
        <div className="flex justify-between items-center w-[100%]">
          <SectionHeader label={"Related Items"} heading={""} />
          <Link href="/all-products">
            <button className="px-[40px] py-[12px] bg-[#db4444] mt-10 cursor-pointer text-white rounded-[4px]">
              View All
            </button>
          </Link>
        </div>

        {realtedLoading && <p className="mt-10 text-gray-400">Loading...</p>}

        {!realtedLoading && relatedProducts.length === 0 && (
          <p className="mt-10 text-gray-400">No products found</p>
        )}

        {!realtedLoading && relatedProducts.length > 0 && (
          <div className="w-[100%] mt-10">
            <div className="flex justify-between">
              {relatedProducts.slice(0, 4).map((p) => {
                const image = p.images?.[0]
                  ? `data:${p.images[0].imageType};base64,${p.images[0].image}`
                  : "/images/mainImage1.jpg";

                const offer =
                  p.discountPrice != null && p.discountPrice < p.price
                    ? Math.round(((p.price - p.discountPrice) / p.price) * 100)
                    : 0;

                return (
                  <div key={p._id}>
                    <Product
                      id={p._id}
                      image={image}
                      name={p.name}
                      price={p.price}
                      offer={offer}
                      offerTrue={false}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
