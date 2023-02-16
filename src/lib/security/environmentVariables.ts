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

    if (this.env && typeof this.env === 'object') { // we're in prod
      value = key === 'ENVIRONMENT' ? 'production' : this.env[key] // return common key (ENVIRONMENT) OR GET from wrangler.toml (production)
    } else { // we're in dev
      if (key === 'ENVIRONMENT') value = 'development' // return common key (ENVIRONMENT)
      else { 
        const regex = new RegExp(`(${ key })(.)+`) // form a regex with the requested key
        const fullLine = (await this.#getWranglerTomlContent()).match(regex)?.[0] // get all the info on the line with the key

        if (fullLine) {
          const fullLineMinusBeginning = fullLine.substring(fullLine.indexOf("'") + 1) // remove key from line and opening tick
          value = fullLineMinusBeginning.slice(0, -1) // remove closing tick
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
