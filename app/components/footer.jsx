export default function Footer() {
  return (
    <footer className="w-full mt-15 flex flex-col items-center justify-center">
      <div className="w-[90%] flex items-center justify-between featuer-icons">
        <div className="flex flex-col items-center gap-2">
          <img className="h-12" src="icons/car.svg" alt="" />
          <h3 className="font-bold">FREE AND FAST DELIVERY</h3>
          <span>Free delivery for all orders over $140</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img className="h-12" src="icons/headphones.svg" alt="" />
          <h3 className="font-bold">24/7 CUSTOMER SERVICE</h3>
          <span>Friendly 24/7 customer support</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img className="h-12" src="icons/badge.svg" alt="" />
          <h3 className="font-bold">MONEY BACK GUARANTEE</h3>
          <span>We return money within 30 days</span>
        </div>
      </div>
      <div className="w-full mt-15 bg-black text-white flex justify-center">
        <div className="w-[90%] flex justify-between py-15">
          <div className="flex flex-start flex-col gap-3">
            <h3 className="font-bold text-2xl">Exclusive</h3>
            <span>Subscribe</span>
            <span>Get 10% off your first order</span>
            <div className="p-2 border border-white-600 flex items-center rounded-[5px]">
              <input
                className="border-none bg-black text-white outline-none"
                type="Enter your email"
                placeholder="Enter your email"
              />
              <button className="cursor-pointer">
                <img className="h-6" src="icons/send.svg" alt="" />
              </button>
            </div>
          </div>
          <div className="flex flex-start flex-col gap-3">
            <h3 className="font-bold text-2xl">Support</h3>
            <span>Pirpiai, Nowshera, Pakistan</span>
            <span>exclusive@gmail.com</span>
            <span>+923083972806</span>
          </div>
          <div className="flex flex-start flex-col gap-3">
            <h3 className="font-bold text-2xl">Account</h3>
            <span>login / Register</span>
            <span>Cart</span>
            <span>Wishlist</span>
            <span>Shop</span>
          </div>
          <div className="flex flex-start flex-col gap-3">
            <h3 className="font-bold text-2xl">Quick Link</h3>
            <span>Privacy Policy</span>
            <span>Terms Of Use</span>
            <span>FAQ</span>
            <span>Contact</span>
          </div>
          <div className="flex flex-start flex-col gap-3">
            <h3 className="font-bold text-2xl">Download</h3>
            <span>Save $5 with App New User Only</span>
            <div className="flex gap-4 mt-2">
              <img src="/icons/facebook.svg" alt="" />
              <img src="/icons/twitter.svg" alt="" />
              <img src="/icons/instagram.svg" alt="" />
              <img src="/icons/linkedin.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
