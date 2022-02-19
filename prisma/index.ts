import * as fs from 'fs'
import * as path from 'path'
import * as YAML from 'yaml'
;(() => {
  const { db } = YAML.parse(
    fs.readFileSync(path.resolve('config', 'index.yaml')).toString(),
  )

  fs.writeFileSync('.env', `DATABASE_URL="${db.url}"`)
})()
