class EnvironmentVariables {
  env: any
  #cache: Map<string, string>
  #wranglerTomlContent: string


  constructor () {
    this.env = null
    this.#cache = new Map()
    this.#wranglerTomlContent = ''
  }


  set (env: any) {
    this.env = env // set in production from variables in wrangler.toml @ hooks.server.ts
  }


  async get (key: string) {
    let value: string = ''

    if (this.env && typeof this.env === 'object') { // we're in prod
      value = key === 'ENVIRONMENT' ? 'production' : this.env[key] // return common key (ENVIRONMENT) OR GET from wrangler.toml (production)
    } else { // we're in dev
      if (key === 'ENVIRONMENT') value = 'development' // if common key (ENVIRONMENT) requested -> say we're in development
      else if (this.#cache.has(key)) value = this.#cache.get(key) as string // if key in cache -> return value from cache
      else { 
        const regex = new RegExp(`(${ key })(.)+`) // form a regex with the requested key
        const fullLine = (await this.#getWranglerTomlContent()).match(regex)?.[0] // get all the info on the line with the key

        if (fullLine) {
          const fullLineMinusBeginning = fullLine.substring(fullLine.indexOf("'") + 1) // remove key from line and opening tick
          value = fullLineMinusBeginning.slice(0, -1) // remove closing tick
          this.#cache.set(key, value)
        }
      }
    }

    return value
  }


  async #getWranglerTomlContent() { // get from cache or get fresh
    return this.#wranglerTomlContent || await (await import('node:fs')).promises.readFile('wrangler.toml', 'utf-8')
  }
}

export default new EnvironmentVariables()
