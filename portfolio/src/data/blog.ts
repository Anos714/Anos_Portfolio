import mongodbImage from "../assets/blogs/mongodb/mongodb.png";
import redisImage from "../assets/blogs/redis/redis.png";

export const blogs = [
  {
    slug: "redis-is-more-than-just-caching",
    title: "Redis Is More Than Just Caching",
    description:
      "A practical guide to Redis as backend infrastructure for caching, rate limiting, job queues, Pub/Sub, sessions, locks, leaderboards, analytics, and streams.",
    date: "May 18, 2026",
    readTime: "7 min read",
    tags: ["redis", "backend", "caching", "queues", "realtime"],
    href: "/blogs/redis-is-more-than-just-caching",
    image: redisImage,
    imageAlt: "Redis infrastructure cover art",
    accent: "red",
  },
  {
    slug: "how-mongodb-actually-stores-your-data",
    title: "How MongoDB Actually Stores Your Data",
    description:
      "A practical look at BSON, WiredTiger, indexes, aggregation pipelines, and schema design tradeoffs behind MongoDB performance.",
    date: "May 18, 2026",
    readTime: "7 min read",
    tags: ["mongodb", "database", "backend", "performance"],
    href: "/blogs/how-mongodb-actually-stores-your-data",
    image: mongodbImage,
    imageAlt: "MongoDB document storage illustration",
    accent: "emerald",
  },
];
