import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const Blogs = () => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <main className="mx-auto flex min-h-[70vh] w-full max-w-5xl items-center px-4">
        <section className="w-full border-b border-neutral-200 pb-10 dark:border-neutral-800">
          <p className="text-sm font-semibold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
            Blogs
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
            Writing soon.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-600 dark:text-neutral-400">
            I’m working on technical writeups about building SmartBillr,
            real-time apps with Stream SDK, and lessons from shipping full-stack
            projects.
          </p>

          <div className="mt-8 rounded-md border border-neutral-200 px-4 py-3 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
            Blogs coming soon.
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blogs;
