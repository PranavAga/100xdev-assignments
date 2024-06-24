import { Heading } from "@/components/Heading";

export default function Static() {
  const welcomeMessage = "Welcome to Static Page";

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col w-1/2 space-y-4">
        <Heading content={welcomeMessage}/>
        <p>
          This paragraph right here is rendered statically using Next.js. By generating the content on the server at build time, Next.js ensures that search engines can easily crawl and index this page, boosting its SEO. Plus, serving static content leads to faster load times and a smooother user experience. And if I need interactivity, Next.js allows me to use the "use client" directive for specific compoenents.<br/>
        </p>
        <p>
          Pretty cool, right? Now navigate to the 'Client Page' to check how interactivity is added in Next.js!
        </p>
      </div>
    </div>
  );
}