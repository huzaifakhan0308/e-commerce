export default function Trust() {
  return (
    <div className="w-[100%] flex items-center justify-between featuer-icons mt-15">
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
  );
}
