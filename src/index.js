import { spawn } from 'child_process'

/**
 * @name exec
 * @sig `string -> Promise<{ stdout: string, stderr: string, code: number }>`
 * @desc
 * promisified child_process
 * @example
 * const {stdout, stderr, code} = await exec('ls -a')
 */

const defaultOpts = {
  shell: '/bin/bash',
  onStdout: undefined,
  onErr: undefined
}

const exec = (cmd, _opts) =>
  new Promise((resolve, reject) => {
    const opts = _opts ? {...defaultOpts, ..._opts} : defaultOpts
    const p = spawn(cmd, opts)

    let output = {
      stdout: '',
      stderr: '',
      code: ''
    }

    p.stdout.on('data', data => {
      output.stdout += data
      if (typeof opts.onStdout === 'function') opts.onStdout(data)
    })
    p.stderr.on('data', data => {
      output.stderr += data
      if (typeof opts.onStderr === 'function') opts.onStderr(data)
    })

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

