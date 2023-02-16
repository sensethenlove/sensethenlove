class EnvironmentVariables {
  env: any;

  constructor () {
    this.env = null
  }

  set (env: any) {
    this.env = env // set in production from variables in wrangler.toml during server hook
  }

  async get (prop: string) {
    return this.env && typeof this.env === 'object' && this.env[prop] ?
      this.env[prop] : // gotten from wrangler.toml (production)
      (await import(prop.startsWith('PUBLIC_') ? '$env/static/public' : '$env/static/private'))[prop] // gotten from .env (development)
  }
}

export default new EnvironmentVariables()
