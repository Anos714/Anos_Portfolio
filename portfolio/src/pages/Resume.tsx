import Navbar from "../components/navbar/Navbar";

const Resume = () => {
  const resumeUrl = "/resume/rahul_resume.pdf";

  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <section className="mx-auto mt-10 max-w-5xl px-4">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
              Resume
            </h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              View or download my latest resume.
            </p>
          </div>

          <a
            href={resumeUrl}
            download="Rahul-Sain-Resume.pdf"
            className="w-fit rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            Download Resume
          </a>
        </div>

        {/* PDF VIEWER */}
        <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
          <iframe
            src={resumeUrl}
            title="Rahul Sain Resume"
            className="h-[85vh] w-full bg-white"
          />
        </div>
      </section>
    </div>
  );
};

export default Resume;
