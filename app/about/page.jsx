import Link from "next/link";
import Trust from "../components/trust";

const about = [
  {
    id: 1,
    img: "/icons/Services3.svg",
    title: "Sallers active our sites",
    numbers: "10.5k",
  },
  {
    id: 2,
    img: "/icons/Services2.svg",
    title: "Monthly products sale",
    numbers: "3.3k",
  },
  {
    id: 3,
    img: "/icons/Services1.svg",
    title: "Sellers active our sites",
    numbers: "45k",
  },
  {
    id: 4,
    img: "/icons/Services2.svg",
    title: "Annual gross sale on our sites",
    numbers: "25k",
  },
];

const managments = [
  {
    id: 1,
    img: "/images/frame1.png",
    title: "Tom cruise",
    numbers: "Founder and chairman",
  },
  {
    id: 2,
    img: "/images/frame2.png",
    title: "Ema Watson",
    numbers: "Managing Director",
  },
  {
    id: 3,
    img: "/images/frame3.png",
    title: "Will Smith",
    numbers: "Product Manager",
  },
];

export default function About() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center">
        <div className="w-[50%] flex flex-col">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="w-[500px] mt-8">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p className="w-[500px] mt-6">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer
          </p>
        </div>
        <div className="w-[50%]">
          <img src="/images/signin.png" alt="" />
        </div>
      </div>
      <div className="w-6xl flex items-center justify-between featuer-icons mt-15">
        {about.map((e) => (
          <div
            key={e.id}
            className="border border-gray-400 rounded-[5px] flex flex-col items-center justify-center gap-2 w-[220px] h-[150px]"
          >
            <img className="h-12" src={e.img} alt="" />
            <h3 className="font-bold text-2xl">{e.numbers}</h3>
            <span className="text-sm">{e.title}</span>
          </div>
        ))}
      </div>
      <div className="w-6xl flex items-center justify-between featuer-icons mt-15">
        {managments.map((e) => (
          <div key={e.id} className="flex flex-col items-start w-[220px]">
            <img className="w-full h-full object-cover" src={e.img} alt="" />
            <h3 className="text-2xl mt-2">{e.title}</h3>
            <span className="text-sm">{e.numbers}</span>
            <div className="flex gap-2 mt-4">
              <img src="/icons/instagram-bk.svg" alt="" />
              <img src="/icons/twitter-bk.svg" alt="" />
              <img src="/icons/linkedin-bk.svg" alt="" />
            </div>
          </div>
        ))}
      </div>
      <Trust />
    </div>
  );
}
