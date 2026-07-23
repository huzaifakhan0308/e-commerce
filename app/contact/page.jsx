import Link from "next/link";
import { Input, TextArea } from "../../components/ui/input";

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
    <div className="flex gap-10 mt-10 h-[60vh]">
      <div className="w-[30%] rounded-[5px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <img src="/icons/icons-phone.svg" alt="" />
            <h3 className="text-lg font-medium">Call To Us</h3>
          </div>
          <p>We are available 24/7, 7 days a week</p>
          <p>Phone: +1234 567 890</p>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <div className="flex items-center gap-2">
            <img src="/icons/icons-mail.svg" alt="" />
            <h3 className="text-lg font-medium">Write To Us</h3>
          </div>
          <p>Fill out our form and we will contact you within 24 hours.</p>
          <p>Emails: customer@exclusive.com.</p>
          <p>Emails: support@exclusive.com</p>
        </div>
      </div>
      <form
        action=""
        className="w-[70%] h-[100%] p-5 rounded-[5px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
      >
        <div className="flex gap-2 w-[100%]">
          <Input
            type={"text"}
            placeholder={"Your Name"}
            className={"w-[100%]"}
          />
          <Input
            type={"email"}
            placeholder={"Your Email"}
            className={"w-[100%]"}
          />
          <Input
            type={"number"}
            placeholder={"Your Phone"}
            className={"w-[100%]"}
          />
        </div>
        <div className="flex flex-col mt-3">
          <TextArea placeholder="Your Message" className="h-[30vh]" />
          <button className="self-end px-[40px] py-[12px] bg-[#db4444] mt-10 cursor-pointer text-white rounded-[4px]">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
