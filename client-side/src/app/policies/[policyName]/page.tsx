import Footer from "@/components/main-menu/Footer";
import NavBar from "@/components/main-menu/NavBar";

export default function Page({ params }: { params: { policyName: "terms-of-service" | "privacy-policy" | "cookies-policy" } }) {
  const policies = {
    "terms-of-service": "Terms of Service",
    "privacy-policy": "Privacy Policy",
    "cookies-policy": "Cookies Policy",
  };

  return (
    <div>
        <NavBar></NavBar>
        <div className="h-[100vh] flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">
                {policies[params.policyName]||"Policy Not Found"}
            </h1>
        </div>
        <Footer></Footer>
    </div>
  );
}
