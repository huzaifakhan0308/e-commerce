export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center border-b-1 border-gray-200 bg-white p-2 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <h2 className="font-bold">Exclusive</h2>
      <div className="">
        <button className="m-2 sm:m-3 md:m-4 lg:m-5 cursor-pointer border-b-2 border-transparent hover:border-b-black">
          Home
        </button>
        <button className="m-2 sm:m-3 md:m-4 lg:m-5 cursor-pointer border-b-2 border-transparent hover:border-b-black">
          Contact
        </button>
        <button className="m-2 sm:m-3 md:m-4 lg:m-5 cursor-pointer border-b-2 border-transparent hover:border-b-black">
          About
        </button>
        <button className="m-2 sm:m-3 md:m-4 lg:m-5 cursor-pointer border-b-2 border-transparent hover:border-b-black">
          Sign Up
        </button>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-center bg-black/8 rounded-[3px]">
          <input
            className="border-none outline-none p-1 pl-4"
            type="text"
            placeholder="What are you looking for?"
          />
          <button className="pr-2 cursor-pointer">
            <img src="/icons/search.svg" alt="" />
          </button>
        </div>
        <div className="flex justify-center items-center gap-3 ml-3">
          <button className="cursor-pointer">
            <img className="size-6" src="/icons/heart.svg" alt="" />
          </button>
          <button className="cursor-pointer">
            <img className="size-6" src="/icons/cart.svg" alt="" />
          </button>
        </div>
      </div>
    </nav>
  );
}
