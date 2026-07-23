import Link from "next/link";

export default function LogIn() {
  return (
    <div className="w-full">
      <div className="flex w-full h-[100vh]">
        <div className="w-[50%]">
          <img src="/images/signin.png" alt="" />
        </div>
        <div className="w-[50%] flex justify-center items-center">
          <div className="w-[50%]">
            <h3 className="font-bold text-3xl mb-2">Log in to Exclusive</h3>
            <p className="mb-5">Enter your details below</p>
            <form className="flex flex-col gap-5">
              <input
                className="py-2 outline-none border-0 border-b-2 border-gray-400"
                type="email"
                placeholder="Email or Phone Number"
              />
              <input
                className="py-2  outline-none border-0 border-b-2 border-gray-400"
                type="password"
                placeholder="Password"
              />
              <button
                className="px-[40px] py-[12px] bg-[#db4444] mt-10 cursor-pointer text-white rounded-[4px]"
                type="submit"
              >
                Log In
              </button>
              <button
                className="px-[40px] py-[12px] cursor-pointer text-black rounded-[4px] flex items-center border border-black justify-center"
                type="submit"
              >
                Forget Password ?
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
