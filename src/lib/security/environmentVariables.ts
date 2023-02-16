class EnvironmentVariables {
  env: any;

  constructor () {
    this.env = null
  }

  set (env: any) {
    this.env = env // set in production from variables in wrangler.toml during server hook
  }

  async get (prop: string) {
    let value

    if (this.env && typeof this.env === 'object' && this.env[prop]) {
      value = this.env[prop] // gotten from wrangler.toml (production)
    } else {
      const location = `$env/static/${ prop.startsWith('PUBLIC_') ? 'public' : 'private' }`
      value = (await import(location))[prop] // gotten from .env (development)
    }

    return value
  }
}

export default new EnvironmentVariables()
