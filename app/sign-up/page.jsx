import Link from "next/link";

export default function SignUp() {
  return (
    <div className="w-full">
      <div className="flex w-full h-[100vh]">
        <div className="w-[50%]">
          <img src="/images/signInPage.png" alt="" />
        </div>
        <div className="w-[50%] flex justify-center items-center">
          <div className="w-[50%]">
            <h3 className="font-bold text-3xl mb-2">Create an account</h3>
            <p className="mb-5">Enter your details below</p>
            <form className="flex flex-col gap-5">
              <input
                className="py-2 outline-none border-0 border-b-2 border-gray-400"
                type="text"
                placeholder="Name"
              />
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
              <input
                className="py-2  outline-none border-0 border-b-2 border-gray-400"
                type="password"
                placeholder="Confirm Password"
              />
              <button
                className="px-[40px] py-[12px] bg-[#db4444] mt-10 cursor-pointer text-white rounded-[4px]"
                type="submit"
              >
                Create Account
              </button>
              <button
                className="px-[40px] py-[12px] cursor-pointer text-black rounded-[4px] flex items-center border border-black justify-center"
                type="submit"
              >
                <img className="pr-5" src="/icons/google.svg" alt="" />
                Sign up with Google
              </button>
              <p className="text-center">
                Already have account? <Link href="/log-in">Log In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
