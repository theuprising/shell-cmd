# shell-cmd

just run a darn command

### as a promise

```javascript
import exec from 'shell-cmd'

const main = async () => {
  const {stdout, stderr, code} = await exec('ls')
}
main()
```

### with output callbacks

```javascript
import exec from 'shell-cmd'

exec('tail -f access.log', { onStdout: console.log, onStderr: console.error })
```

