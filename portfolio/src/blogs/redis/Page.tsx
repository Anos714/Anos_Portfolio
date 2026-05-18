import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import redisImage from "../../assets/blogs/redis/redis.png";

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

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="mt-4 space-y-2 text-base leading-7 text-neutral-700 dark:text-neutral-300">
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span className="mt-3 size-1.5 shrink-0 rounded-full bg-red-500" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const RedisPage = () => {
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
              {["redis", "backend", "caching", "queues", "realtime"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl dark:text-neutral-100">
              Redis Is More Than Just Caching
            </h1>

            <p className="mt-4 text-sm font-medium text-neutral-500 dark:text-neutral-500">
              May 18, 2026 / 7 min read
            </p>

            <img
              src={redisImage}
              alt="Redis infrastructure cover art"
              className="mt-8 aspect-video w-full rounded-lg border border-neutral-200 object-cover dark:border-neutral-800"
            />

            <blockquote className="mt-8 border-l-2 border-red-500 pl-5 text-lg leading-8 text-neutral-800 dark:text-neutral-200">
              Most developers learn Redis as a simple caching layer. But Redis
              is actually one of the most versatile backend infrastructure tools
              ever built.
            </blockquote>

            <Paragraph>
              Redis powers some of the most scalable systems on the internet.
              From queues and real-time messaging to distributed locks and live
              analytics, Redis has become a core building block of modern
              backend architecture.
            </Paragraph>

            <SectionHeading>Why Redis Is So Fast</SectionHeading>
            <Paragraph>
              Before understanding Redis use cases, you need to understand why
              Redis became popular in the first place. Redis is fast because it
              stores data in memory, uses optimized data structures, runs on a
              single-threaded event loop, avoids expensive disk lookups for most
              operations, and keeps latency extremely low.
            </Paragraph>
            <Paragraph>
              Unlike traditional databases that constantly access disk storage,
              Redis operates mostly in RAM. That is why Redis operations are
              often measured in microseconds. The tradeoff is that memory is
              expensive, so Redis is usually used for hot data, temporary data,
              coordination, and fast infrastructure workflows.
            </Paragraph>

            <SectionHeading>1. Caching</SectionHeading>
            <Paragraph>
              Caching is the most common Redis use case. Instead of hitting the
              database repeatedly for the same data, Redis stores frequently
              accessed responses temporarily.
            </Paragraph>
            <BulletList
              items={[
                "Database load",
                "API response time",
                "Server pressure",
                "Expensive repeated queries",
              ]}
            />
            <pre className="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-neutral-950 p-4 text-sm leading-6 text-neutral-100 dark:border-neutral-800">
              <code>{`await redis.set(
  "user:1",
  JSON.stringify(user),
  "EX",
  60
);`}</code>
            </pre>
            <Paragraph>
              This stores user data in Redis for 60 seconds. After that, Redis
              expires the key and your application can fetch fresh data from the
              database again. But caching is only the beginning.
            </Paragraph>

            <SectionHeading>2. Rate Limiting</SectionHeading>
            <Paragraph>
              Redis is widely used for API rate limiting because counters and
              expirations are cheap. Rate limiting helps prevent API abuse,
              brute-force attacks, spam requests, and server overload.
            </Paragraph>
            <pre className="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-neutral-950 p-4 text-sm leading-6 text-neutral-100 dark:border-neutral-800">
              <code>{`INCR api:user:123
EXPIRE api:user:123 60`}</code>
            </pre>
            <Paragraph>
              This increments a request count and expires it after 60 seconds.
              A fixed window implementation is simple, sliding window tracking
              is more precise, and token bucket algorithms are common in
              scalable APIs.
            </Paragraph>

            <SectionHeading>3. Job Queues & Background Processing</SectionHeading>
            <Paragraph>
              One of the most powerful Redis use cases is asynchronous job
              processing. Instead of performing heavy tasks inside the request
              lifecycle, Redis queues jobs for worker processes.
            </Paragraph>
            <BulletList
              items={[
                "Sending emails",
                "Image processing",
                "Notifications",
                "Video transcoding",
                "PDF generation",
                "Data exports",
              ]}
            />
            <pre className="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-neutral-950 p-4 text-sm leading-6 text-neutral-100 dark:border-neutral-800">
              <code>{`User Request
   ↓
Redis Queue
   ↓
Worker Process
   ↓
Send Email`}</code>
            </pre>
            <Paragraph>
              Libraries like BullMQ, Bull, Bee Queue, and Agenda use Redis to
              coordinate jobs, retries, delays, and workers. This is where Redis
              starts feeling less like a cache and more like backend
              infrastructure.
            </Paragraph>
            <pre className="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-neutral-950 p-4 text-sm leading-6 text-neutral-100 dark:border-neutral-800">
              <code>{`await emailQueue.add("send-welcome-email", {
  email: "rahul@example.com",
});`}</code>
            </pre>

            <SectionHeading>4. Real-Time Messaging & Pub/Sub</SectionHeading>
            <Paragraph>
              Redis provides Pub/Sub functionality for real-time communication.
              A publisher sends messages to a channel, and subscribers listening
              to that channel receive the message instantly.
            </Paragraph>
            <pre className="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-neutral-950 p-4 text-sm leading-6 text-neutral-100 dark:border-neutral-800">
              <code>{`Publisher → Redis Channel → Subscribers`}</code>
            </pre>
            <Paragraph>
              Redis Pub/Sub works well for chat applications, live
              notifications, multiplayer games, real-time dashboards, and
              WebSocket event broadcasting. It pairs naturally with Socket.io,
              WebSockets, and microservice architectures.
            </Paragraph>

            <div className="mt-10 flex justify-center">
              <img
                src={redisImage}
                alt="Redis in-memory data platform illustration"
                className="h-auto w-full max-w-xl rounded-lg border border-neutral-200 object-contain dark:border-neutral-800"
              />
            </div>

            <SectionHeading>5. Session Storage</SectionHeading>
            <Paragraph>
              Many developers store sessions directly in Express memory. That
              works until the application scales. When multiple servers are
              involved, session synchronization becomes difficult.
            </Paragraph>
            <Paragraph>
              Redis solves this by making session state shared across backend
              instances. Your application gets centralized authentication state,
              fast session lookup, and better horizontal scaling.
            </Paragraph>
            <pre className="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-neutral-950 p-4 text-sm leading-6 text-neutral-100 dark:border-neutral-800">
              <code>{`app.use(
  session({
    store: new RedisStore({ client: redisClient }),
  })
);`}</code>
            </pre>

            <SectionHeading>6. Distributed Locks</SectionHeading>
            <Paragraph>
              Distributed locking is one of Redis's most underrated features.
              Locks prevent multiple systems from modifying the same resource at
              the same time.
            </Paragraph>
            <BulletList
              items={[
                "Preventing duplicate payments",
                "Preventing race conditions",
                "Inventory locking",
                "Scheduled job coordination",
              ]}
            />
            <pre className="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-neutral-950 p-4 text-sm leading-6 text-neutral-100 dark:border-neutral-800">
              <code>{`SET payment_lock unique_value NX EX 10`}</code>
            </pre>
            <Paragraph>
              <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">
                NX
              </code>{" "}
              means only create the lock if it does not exist.
              <code className="mx-1 rounded bg-neutral-100 px-1.5 py-0.5 text-sm dark:bg-neutral-800">
                EX 10
              </code>
              means expire the lock after 10 seconds. This prevents concurrent
              execution and is very important in distributed systems.
            </Paragraph>

            <SectionHeading>7. Leaderboards & Counters</SectionHeading>
            <Paragraph>
              Redis Sorted Sets are perfect for ranking systems because Redis
              keeps members ordered by score. That makes gaming leaderboards,
              trending posts, analytics rankings, scoreboards, and live
              engagement tracking extremely fast.
            </Paragraph>
            <pre className="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-neutral-950 p-4 text-sm leading-6 text-neutral-100 dark:border-neutral-800">
              <code>{`ZADD leaderboard 100 "Rahul"`}</code>
            </pre>
            <Paragraph>
              This stores Rahul with a score of 100. Redis automatically keeps
              scores sorted, so leaderboard queries stay efficient even when the
              feature becomes busy.
            </Paragraph>

            <SectionHeading>8. Real-Time Analytics</SectionHeading>
            <Paragraph>
              Redis is heavily used for temporary analytics and live metrics:
              page views, live visitor counts, event tracking, API usage
              monitoring, and dashboard metrics.
            </Paragraph>
            <Paragraph>
              It works well because writes are extremely fast, temporary data
              fits memory storage, counters are efficient, and real-time updates
              are easy to build.
            </Paragraph>
            <pre className="mt-6 overflow-x-auto rounded-md border border-neutral-200 bg-neutral-950 p-4 text-sm leading-6 text-neutral-100 dark:border-neutral-800">
              <code>{`INCR page_views`}</code>
            </pre>
            <Paragraph>Simple, fast, and scalable.</Paragraph>

            <SectionHeading>9. Redis Streams</SectionHeading>
            <Paragraph>
              Redis Streams provide event-streaming capabilities. Streams are
              useful for event-driven systems, message processing, async
              workflows, and distributed communication.
            </Paragraph>
            <Paragraph>
              Unlike Pub/Sub, streams can persist messages. That makes them more
              reliable for backend workflows where consumers may need to process
              events later instead of only receiving messages live.
            </Paragraph>

            <SectionHeading>10. When Not To Use Redis</SectionHeading>
            <Paragraph>
              Redis is powerful, but it should not become your solution for
              everything. Memory is expensive, so large datasets can become
              costly. Redis supports persistence, but it is not designed to fully
              replace a traditional primary database.
            </Paragraph>
            <Paragraph>
              Redis is also not ideal for complex relational queries, and many
              Redis setups intentionally prioritize speed over durability. Use
              Redis where speed matters. Do not blindly replace your primary
              database.
            </Paragraph>

            <SectionHeading>Final Thoughts</SectionHeading>
            <Paragraph>
              Most developers think Redis is just a caching tool. That is a very
              limited understanding. Redis can act as a caching layer, queue
              system, real-time messaging system, rate limiter, distributed
              locking system, session store, leaderboard engine, and analytics
              engine.
            </Paragraph>
            <Paragraph>
              Understanding Redis properly changes how you design backend
              systems. Good backend developers do not just build APIs. They
              build infrastructure that scales under pressure.
            </Paragraph>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 border-l border-neutral-200 pl-5 dark:border-neutral-800">
              <p className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                In this post
              </p>
              <div className="mt-4 space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
                <p>Why Redis is fast</p>
                <p>Caching and sessions</p>
                <p>Queues and Pub/Sub</p>
                <p>Locks and counters</p>
                <p>When to avoid Redis</p>
              </div>
            </div>
          </aside>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default RedisPage;
