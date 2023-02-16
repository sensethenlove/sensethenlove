import { browser } from '$app/environment'


class EnvironmentVariables {
  serverVars: any
  #wranglerTomlContent: string
  #developmentCacheVars: Map<string, string>


  constructor () {
    this.serverVars = null
    this.#wranglerTomlContent = ''
    this.#developmentCacheVars = new Map()
  }


  setEnvironmentVariablesByPlatform (platform: Readonly<App.Platform> | undefined): void {
    if (platform?.env) this.serverVars = platform.env // set in production from variables in wrangler.toml @ hooks.server.ts
  }


  async get (key: string): Promise<string> {
    let value: string = ''

    if (this.#isInProd()) { // in prod
      value = (key === 'ENVIRONMENT') ? 'production' : this.serverVars[key] // return common key (ENVIRONMENT) OR GET from wrangler.toml (production)
    } else { // in dev
      if (key === 'ENVIRONMENT') value = 'development' // if common key (ENVIRONMENT) requested -> say we're in development
      else if (this.#developmentCacheVars.has(key)) value = this.#developmentCacheVars.get(key) as string // if key in cache -> return value from cache
      else { // key is not ENVIRONMENT and value is not in cache
        const regex = new RegExp(`(${ key })(.)+`) // form a regex with the requested key
        const fullLine = (await this.#getWranglerTomlContent())?.match(regex)?.[0] // get all the info on the line with the key

        if (fullLine) {
          const fullLineMinusBeginning = fullLine.substring(fullLine.indexOf("'") + 1) // remove key from line and opening tick
          value = fullLineMinusBeginning.slice(0, -1) // remove closing tick
          this.#developmentCacheVars.set(key, value)
        } else {
          throw new Error(`${ key } not found in wrangler.toml`)
        }
      }
    }

    return value
  }


  #isInProd(): boolean {
    if (this.serverVars && typeof this.serverVars === 'object') return true // server prod
    if (browser && window.location.host === 'sensethenlove.com') return true // client prod
    return false // dev
  }


  async #getWranglerTomlContent(): Promise<string> { // get from cache (#wranglerTomlContent) or get fresh
    let content: string = ''

    if (!browser && !this.#isInProd()) { // IF not in browser AND in dev aka not in production aka not in cloudflare worker
      if (this.#wranglerTomlContent) content = this.#wranglerTomlContent
      else {
        try { // wrapping this import in a try catch suppresses the esbuild, build error that node:fs is not allowed in a cloudflare worker
          content = await (await import('node:fs')).promises.readFile('wrangler.toml', 'utf-8')
        } catch (e) {
          console.log(e)
        }
      }
    }

    return content
  }
}

export default new EnvironmentVariables()
