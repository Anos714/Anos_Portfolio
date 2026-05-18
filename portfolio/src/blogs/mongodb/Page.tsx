import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import mongodbImage from "../../assets/blogs/mongodb/mongodb.png";

const SectionHeading = ({ children }: { children: string }) => (
  <h2 className="mt-12 scroll-mt-24 text-2xl font-bold tracking-tight text-neutral-950 dark:text-neutral-100">
    {children}
  </h2>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-4 text-base leading-8 text-neutral-700 dark:text-neutral-300">
    {children}
  </p>
);

const MongoDBPage = () => {
  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:py-14">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 transition hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          <ArrowLeft className="size-4" />
          Blogs
        </Link>

        <article className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div>
            <div className="flex flex-wrap gap-2">
              {["mongodb", "database", "backend", "performance"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl dark:text-neutral-100">
              How MongoDB Actually Stores Your Data
            </h1>

            <p className="mt-4 text-sm font-medium text-neutral-500 dark:text-neutral-500">
              May 18, 2026 / 7 min read
            </p>

            <img
              src={mongodbImage}
              alt="MongoDB document storage illustration"
              className="mt-8 aspect-video w-full rounded-lg border border-neutral-200 object-cover dark:border-neutral-800"
            />

            <blockquote className="mt-8 border-l-2 border-emerald-500 pl-5 text-lg leading-8 text-neutral-800 dark:text-neutral-200">
              Most developers use MongoDB only for CRUD operations. But if you
              want to build scalable backend systems, you need to understand
              what MongoDB is doing internally.
            </blockquote>

            <SectionHeading>MongoDB Is Easy Until Performance Starts Dying</SectionHeading>
            <Paragraph>
              MongoDB feels simple in the beginning. You create collections,
              insert documents, and query them using flexible JSON-like syntax.
              That developer experience is one of the reasons MongoDB became so
              popular for backend applications.
            </Paragraph>
            <Paragraph>
              The problem starts when the application grows. Queries that felt
              instant become slow. Aggregation pipelines become heavy. Indexes
              stop helping. API response times increase, and suddenly the
              database becomes the part of your stack everyone is afraid to
              touch.
            </Paragraph>
            <div className="mt-6 rounded-md border border-neutral-200 bg-neutral-50 p-4 text-sm leading-6 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
              Most MongoDB performance problems are caused by bad schema design,
              missing indexes, and poorly optimized queries.
            </div>

            <SectionHeading>MongoDB Does Not Store Plain JSON</SectionHeading>
            <Paragraph>
              MongoDB documents look like JSON, but MongoDB does not store plain
              JSON on disk. It stores data as BSON, which stands for Binary
              JSON. BSON keeps the document model developers like, but stores it
              in a machine-friendly format that is faster to parse and richer
              than normal JSON.
            </Paragraph>
            <Paragraph>
              BSON supports data types that JSON does not understand natively:
              <code className="mx-1 rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">
                ObjectId
              </code>
              ,
              <code className="mx-1 rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">
                Date
              </code>
              ,
              <code className="mx-1 rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">
                Decimal128
              </code>
              , and binary data. That is why MongoDB can work cleanly with
              nested objects, arrays, timestamps, and files without forcing
              everything into strings.
            </Paragraph>

            <pre className="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-neutral-950 p-4 text-sm leading-6 text-neutral-100 dark:border-neutral-800">
              <code>{`{
  "_id": ObjectId("664f2b1f8f1a"),
  "username": "rahul",
  "createdAt": ISODate("2026-05-09"),
  "balance": Decimal128("499.99")
}`}</code>
            </pre>

            <SectionHeading>How MongoDB Stores Documents Physically</SectionHeading>
            <Paragraph>
              MongoDB stores documents inside collections. A collection is not
              just a folder of JSON files. In modern MongoDB, storage is handled
              by the WiredTiger storage engine. WiredTiger manages compression,
              disk writes, caching, concurrency, and how data is organized for
              reads and writes.
            </Paragraph>
            <Paragraph>
              When your application asks for data, MongoDB does not always go to
              disk. Frequently accessed pages can live in memory through the
              WiredTiger cache and the operating system cache. This is why hot
              queries often feel fast and cold queries can be slower.
            </Paragraph>
            <Paragraph>
              Document size matters here. If your schema creates large documents
              with deeply nested arrays, MongoDB has more data to move through
              memory and across the network. Flexible schema does not mean free
              schema. Every field you store has a cost.
            </Paragraph>

            <SectionHeading>Indexes Are the Real Performance Engine</SectionHeading>
            <Paragraph>
              Without an index, MongoDB may perform a collection scan. That
              means it checks documents one by one until it finds what you asked
              for. A collection scan is fine for a few hundred documents. It
              becomes painful when the collection has millions of records.
            </Paragraph>
            <pre className="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-neutral-950 p-4 text-sm leading-6 text-neutral-100 dark:border-neutral-800">
              <code>{`db.users.createIndex({ email: 1 })`}</code>
            </pre>
            <Paragraph>
              Indexes are separate data structures that help MongoDB jump to the
              right documents faster. Single-field indexes help one field.
              Compound indexes help queries that filter or sort by multiple
              fields. Text indexes support text search. TTL indexes automatically
              remove expired documents, which is useful for sessions, OTPs, and
              temporary records.
            </Paragraph>

            <SectionHeading>More Indexes Does Not Mean Better Performance</SectionHeading>
            <Paragraph>
              A common mistake is adding indexes everywhere and hoping the
              database becomes faster. Indexes speed up some reads, but every
              index also increases write overhead, memory usage, and storage
              usage. When you insert or update a document, MongoDB may need to
              update multiple indexes too.
            </Paragraph>
            <Paragraph>
              Good indexing starts from access patterns. Ask what your API
              actually does: which fields does it filter by, which fields does
              it sort by, and which queries run most often? The right index is
              usually boring, specific, and based on real query behavior.
            </Paragraph>

            <SectionHeading>Aggregation Pipeline Is Data Processing Inside MongoDB</SectionHeading>
            <Paragraph>
              Aggregation pipelines let MongoDB transform and summarize data
              inside the database engine. Instead of fetching thousands of
              documents into Node.js and processing them in memory, you can ask
              MongoDB to filter, group, sort, and reshape the result.
            </Paragraph>
            <pre className="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-neutral-950 p-4 text-sm leading-6 text-neutral-100 dark:border-neutral-800">
              <code>{`db.orders.aggregate([
  { $match: { status: "completed" } },
  {
    $group: {
      _id: "$userId",
      totalSpent: { $sum: "$amount" }
    }
  }
])`}</code>
            </pre>
            <Paragraph>
              This pipeline filters completed orders, groups them by user, and
              calculates total spending. The idea is powerful, but pipeline
              order matters. If MongoDB has to process a huge amount of data
              before filtering, the pipeline becomes expensive.
            </Paragraph>

            <SectionHeading>Why Some Aggregation Pipelines Become Slow</SectionHeading>
            <Paragraph>
              Slow aggregations usually do too much work too early. Put
              <code className="mx-1 rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">
                $match
              </code>
              near the beginning when possible, use
              <code className="mx-1 rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">
                $project
              </code>
              to carry only the fields you need, and be careful with
              <code className="mx-1 rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">
                $lookup
              </code>
              and
              <code className="mx-1 rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">
                $unwind
              </code>
              . Those stages are useful, but they can multiply work quickly.
            </Paragraph>

            <SectionHeading>Document Design Tradeoffs</SectionHeading>
            <Paragraph>
              MongoDB schema design is based on application access patterns. The
              biggest design decision is whether to embed related data inside
              the same document or reference it from another collection.
            </Paragraph>
            <Paragraph>
              Embedding is great when data is read together and updated
              together. A user profile with a few preferences is a good example.
              Reads are fast because MongoDB can return one document without
              joining anything. But if embedded arrays grow without limit, the
              document can become large and harder to update.
            </Paragraph>
            <Paragraph>
              Referencing is better when data grows independently or is shared
              across many records. Orders and products, users and posts, teams
              and members often need this shape. The tradeoff is that reads may
              require multiple queries or a
              <code className="mx-1 rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">
                $lookup
              </code>
              .
            </Paragraph>

            <SectionHeading>Use explain() Before Guessing</SectionHeading>
            <Paragraph>
              Many developers blame Express, React, hosting, or the frontend
              when an API becomes slow. Sometimes they are right. Often the real
              bottleneck is the database query itself.
            </Paragraph>
            <pre className="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-neutral-950 p-4 text-sm leading-6 text-neutral-100 dark:border-neutral-800">
              <code>{`db.users.find({ email: "rahul@example.com" }).explain("executionStats")`}</code>
            </pre>
            <Paragraph>
              <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">
                explain()
              </code>{" "}
              shows whether MongoDB used an index, how many documents it
              examined, and how the query was executed. If your query returns
              one document but examines 500,000 documents, your API problem is
              not your controller. It is your query plan.
            </Paragraph>

            <SectionHeading>Final Thoughts</SectionHeading>
            <Paragraph>
              MongoDB is easy to start with but difficult to master. Once you
              understand BSON, WiredTiger, indexes, aggregation pipelines, query
              optimization, and schema design tradeoffs, you stop using MongoDB
              blindly.
            </Paragraph>
            <Paragraph>
              Good backend developers do not just write APIs. They understand
              how their database behaves under pressure. That is the difference
              between an app that works in development and a system that keeps
              working when real users arrive.
            </Paragraph>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 border-l border-neutral-200 pl-5 dark:border-neutral-800">
              <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                In this post
              </p>
              <div className="mt-4 space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
                <p>BSON, not JSON</p>
                <p>WiredTiger storage</p>
                <p>Indexes and scans</p>
                <p>Aggregation costs</p>
                <p>Schema tradeoffs</p>
              </div>
            </div>
          </aside>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default MongoDBPage;
