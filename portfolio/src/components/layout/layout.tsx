const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="m-auto h-screen max-w-[640px]">{children}</div>;
};

export default layout;
