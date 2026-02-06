// server/lib/persistence.js
import fs from "fs"
import path from "path"
import config from "../config/config.js"

function ensureFile(file) {
  const fullPath = path.join(config.DATA_PATH, file)
  if (!fs.existsSync(config.DATA_PATH)) {
    fs.mkdirSync(config.DATA_PATH)
  }
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, JSON.stringify({}))
  }
  return fullPath
}

export function loadJSON(file) {
  const fullPath = ensureFile(file)
  return JSON.parse(fs.readFileSync(fullPath))
}

export function saveJSON(file, data) {
  const fullPath = ensureFile(file)
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2))
}
