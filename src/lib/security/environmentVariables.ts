class EnvironmentVariables {
  env: any
  #wranglerTomlContent: string


  constructor () {
    this.env = null
    this.#wranglerTomlContent = ''
  }


  set (env: any) {
    this.env = env // set in production from variables in wrangler.toml during server hook
  }


  async get (key: string) {
    let value = ''

    if (this.env && typeof this.env === 'object' && this.env[key]) value = key === 'ENVIRONMENT' ? 'production' : this.env[key] // we're in production, return common variable (ENVIRONMENT) OR GET from wrangler.toml (production)
    else if (key === 'ENVIRONMENT') value = 'development' // we're in dev, return common variable (ENVIRONMENT)
    else { // we're in dev
      const regex = new RegExp(`(${ key })(.)+`) // form a regex with the requested key
      const fullLine = (await this.#getWranglerTomlContent()).match(regex)?.[0] // get all the info on the line with the key

      if (fullLine) {
        const fullLineMinusBeginning = fullLine.substring(fullLine.indexOf("'") + 1) // remove key from line
        value = fullLineMinusBeginning.substring(0, fullLineMinusBeginning.length - 1) // remove trailing tick
      }
    }

    return value
  }


  async #getWranglerTomlContent() { // get from cache or get fresh
    return this.#wranglerTomlContent || await (await import('node:fs')).promises.readFile('wrangler.toml', 'utf-8')
  }
}

export default new EnvironmentVariables()
