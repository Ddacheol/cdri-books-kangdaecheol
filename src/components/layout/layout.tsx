import Header from "@/components/layout/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="layout" className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 pt-20 px-6 mx-auto w-full max-w-252 xl:max-w-[53%]">
        {children}
      </div>
    </div>
  );
}
