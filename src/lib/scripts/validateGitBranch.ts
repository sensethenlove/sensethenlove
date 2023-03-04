import { exec } from 'node:child_process'


exec('git branch', (error, stdout, stderr) => {
  if (error) throw error
  if (stderr) throw stderr
  if(!stdout.includes(`* ${ process.argv[2] }`)) {
    const wrongBranchError = new Error(`Required branch "${ process.argv[2] }" is not the current branch`)
    throw wrongBranchError
  }

  console.log(`🌟 Successfully validated git branch is ${ process.argv[2] }`)
})
