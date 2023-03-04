import { exec } from 'node:child_process'


exec('git branch', (error, stdout, stderr) => {
  if (error) throw error
  if (stderr) throw stderr
  if(!stdout.includes(`* ${ process.argv[2] }`)) {
    const wrongBranchError = new Error(`In bash run "git checkout ${ process.argv[2] }" please`)
    throw wrongBranchError
  }

  console.log(`🌟 Successfully validated git branch is ${ process.argv[2] }`)
})
