import { Box } from "@geist-ui/icons";
import Link from "next/link";

export default function Page() {
    return (
      <footer className="w-screen ">
        <div
          className="flex m-auto w-[80vw] flex-grow h-[1px] opacity-50 "
          style={{
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0), gray, rgba(0, 0, 0, 0))",
          }}
        ></div>


        <div className="h-auto p-10 flex"> 
          <section className="flex flex-col w-1/2 gap-6">
            <div className="flex items-center">
                <Box size={50}></Box>
                <p>NoRa</p>
            </div>
            <Link className="font-sans opacity-50 hover:opacity-100 hover:text-blue-600 duration-200" href="mailto:v4hdrak@gmail.com">v4hdrak@gmail.com</Link>

            <div>

                <p>Follow us</p>
                <p className="opacity-50 hover:opacity-100 hover:text-blue-600 duration-200" >Soon</p>
            </div>


          </section>

          <section className=" gap-10 px-[5%] w-1/2 justify-end hidden sm:flex whitespace-nowrap">

            <div className="flex flex-col">
                <h1>Resources</h1>
                <Link className="font-sans opacity-50 hover:opacity-100 hover:text-blue-600 duration-200" href="https://github.com/WhyItsSoHardToMakeAUserName/Productivity-App--NoRa-">Documentation</Link>
                <Link className="font-sans opacity-50 hover:opacity-100 hover:text-blue-600 duration-200" href="https://github.com/WhyItsSoHardToMakeAUserName/Productivity-App--NoRa-">Reference</Link>
            </div>
            
            <div className="flex flex-col">
                <h1>Company</h1>
                <Link className="font-sans opacity-50 hover:opacity-100 hover:text-blue-600 duration-200" href="">About</Link>
            </div>

            <div className="flex flex-col">
                <h1>Legal</h1>
                <Link className="font-sans opacity-50 hover:opacity-100 hover:text-blue-600 duration-200" href="/policies/terms-of-service">Terms of Services</Link>
                <Link className="font-sans opacity-50 hover:opacity-100 hover:text-blue-600 duration-200" href="/policies/privacy-policy">Privacy Policy</Link>
                <Link className="font-sans opacity-50 hover:opacity-100 hover:text-blue-600 duration-200" href="/policies/cookies-policy">Cookies Policy</Link>
            </div>

          </section>
        </div>

        <div
          className="flex m-auto w-[80vw] flex-grow h-[1px] opacity-50 "
          style={{
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0), gray, rgba(0, 0, 0, 0))",
          }}
        ></div>

        <div className="p-5 opacity-50">© 2024 Bubble Inc. or something</div>


      </footer>
    );
  }
  