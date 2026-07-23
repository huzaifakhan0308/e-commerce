import Link from "next/link";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function MyAccount() {
  return (
    <div className="flex flex-col gap-10 my-15 h-[60vh] min-w-[1000px]">
      <h3 className="self-end">Welcome Muhammad Huzaifa !</h3>
      <div className="p-8 rounded-[5px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <h2 className="mb-5">Edit your Profile</h2>
        <form action="" className="w-[100%] h-[100%]">
          <div className="flex gap-5 grid grid-rows-2 grid-cols-2 w-[100%]">
            <Input
              type={"text"}
              placeholder={"First Name"}
              className={"w-[100%]"}
            />
            <Input
              type={"text"}
              placeholder={"Last Name"}
              className={"w-[100%]"}
            />
            <Input
              type={"email"}
              placeholder={"Your Email"}
              className={"w-[100%]"}
            />
            <Input
              type={"text"}
              placeholder={"Address"}
              className={"w-[100%]"}
            />
          </div>
          <div className="flex flex-col mt-5 gap-5">
            <Input
              type={"password"}
              placeholder={"Current Password"}
              className={"w-[100%]"}
            />
            <Input
              type={"password"}
              placeholder={"New Password"}
              className={"w-[100%]"}
            />
            <Input
              type={"password"}
              placeholder={"Confirm New Password"}
              className={"w-[100%]"}
            />
            <div className="flex gap-2 self-end mt-10">
              <button className="px-[40px] py-[12px] bg-[#0000] cursor-pointer text-black">
                Cancel
              </button>
              <Button title="Save changes" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
