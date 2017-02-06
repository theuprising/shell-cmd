import { spawn } from 'child_process'

const id = x => x

/**
 * @name exec
 * @sig `string -> Promise<{ stdout: string, stderr: string, code: number }>`
 * @desc
 * promisified child_process
 * @example
 * const {stdout, stderr, code} = await exec('ls -a')
 */

const exec = (cmd, _opts) =>
  new Promise((resolve, reject) => {
    const opts = {shell: '/bin/bash', ...opts, onStdout: id, onErr: id}
    const p = spawn(cmd, opts)

    let output = {
      stdout: '',
      stderr: '',
      code: ''
    }

    p.stdout.on('data', data => { opts.onStdout(data); output.stdout += data })
    p.stderr.on('data', data => { opts.onStderr(data); output.stderr += data })

    p.on('close', code => {
      output.code = code
      if (code === 0) {
        resolve(output)
      } else {
        reject(output)
      }
    })
  })

export default exec

