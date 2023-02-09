# Shellyboi

A simple script for integrating shell scripts into deno

## Examples

shells include: `bash`, `fish`, `sh`, `zsh`

```ts
import { bash } from 'shellyboi'

const x = 'X'

const stdout = await bash`
  echo ${x}
`

console.log(stdout) // Hello World
```

```ts
import exec from 'shellyboi'

const stdout = await exec('nu')`
  ls | sort-by size | reverse
`
```

```ts
import exec from 'shellyboi'

const stdout = await exec('python3.11')`
print("Hello ${world}")
`

console.log(stdout) // Hello World
```
