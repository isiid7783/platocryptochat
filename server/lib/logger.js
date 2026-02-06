// server/lib/logger.js
import fs from "fs"
import config from "../config/config.js"

export function log(message) {
  const entry = `[${new Date().toISOString()}] ${message}\n`
  fs.appendFileSync(config.LOG_PATH, entry)
}
