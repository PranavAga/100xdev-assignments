import { Heading } from "@/components/Heading";

export default function Home() {
  const welcomeMessage = "Welcome to Home Page";
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col space-y-4 w-1/2">
        <Heading content={welcomeMessage}/>
        <div>
          🚀 Server Page: Optimized static for SEO
          <br/>
          🖱️ Client Page: Interactive client-sde rendering in action.
        </div>
      </div>
    </div>
  );
}
