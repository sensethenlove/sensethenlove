import { exec } from 'node:child_process'


export default (runThis: string) => {
  exec(runThis, (error, stdout, stderr) => {
    if (error) throw error
    if (stderr) throw stderr
  })
}
