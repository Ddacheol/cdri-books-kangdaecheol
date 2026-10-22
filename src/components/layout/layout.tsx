import Header from "@/components/layout/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="layout" className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 pt-40 pb-20 px-6 mx-auto w-full max-w-252 xl:max-w-[53%] max-md:max-w-full max-sm:pt-20 max-sm:pb-10">
        {children}
      </div>
    </div>
  );
}
