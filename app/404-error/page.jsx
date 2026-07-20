import Link from "next/link";
import { Button } from "../components/ui/button";

export default function LogIn() {
  return (
    <div className="flex justify-center items-center flex-col min-h-[60vh] mt-10">
      <h1 className="text-8xl text-center">404 Error</h1>
      <h3 className="text-center mt-10">
        Opps sommething went wrong! Go to homepage
      </h3>
      <Link href="/">
        <Button title="Back to homepage" className="text-center mt-10" />
      </Link>
    </div>
  );
}
