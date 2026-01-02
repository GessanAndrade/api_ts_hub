import { createClient } from "redis";

class RedisClient {
  private client;

  constructor() {
    if (!process.env.REDIS_URL) {
      console.warn("REDIS_URL não definida");
    }

    this.client = createClient({
      url: process.env.REDIS_URL
    });

    this.client.on("error", (err) => {
      console.error("Redis error:", err);
    });
  }

  async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
      console.log("Redis conectado");
    }
  }

  async get(key: string) {
    await this.connect();
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds: number) {
    await this.connect();
    await this.client.set(key, value, { EX: ttlSeconds });
  }
}

export default new RedisClient();
