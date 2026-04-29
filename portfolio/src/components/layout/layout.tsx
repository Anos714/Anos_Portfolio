const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto min-h-screen max-w-[760px] px-4">
      <div className="grid min-h-screen grid-cols-1 sm:grid-cols-[40px_1fr_40px] sm:gap-5">
        {/* LEFT RAIL */}
        <div className="hidden border border-t-0 border-b-0 border-neutral-700 bg-[repeating-linear-gradient(315deg,#a3a3a3_0px,#a3a3a3_2px,transparent_2px,transparent_8px)] sm:block dark:bg-[repeating-linear-gradient(315deg,#404040_0px,#404040_2px,transparent_2px,transparent_8px)]" />

        {/* CONTENT */}
        <main className="min-w-0 py-6">{children}</main>

        {/* RIGHT RAIL */}
        <div className="hidden border border-t-0 border-b-0 border-neutral-700 bg-[repeating-linear-gradient(315deg,#a3a3a3_0px,#a3a3a3_2px,transparent_2px,transparent_8px)] sm:block dark:bg-[repeating-linear-gradient(315deg,#404040_0px,#404040_2px,transparent_2px,transparent_8px)]" />
      </div>
    </div>
  );
};

export default Layout;
