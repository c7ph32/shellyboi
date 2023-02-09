export const exec =
  (cmd: string) =>
  async (scriptTemplate: TemplateStringsArray, ...args: string[]) => {
    const script = scriptTemplate.reduce(
      (acc, chunk, i) => acc + chunk + (args[i] ?? ''),
      '',
    )

    const process = Deno.run({
      cmd: [cmd],
      stdout: 'piped',
      stderr: 'piped',
      stdin: 'piped',
    })

    await process.stdin.write(new TextEncoder().encode(script))

    process.stdin.close()

    const { success } = await process.status()

    const output = await process.output()
    const error = await process.stderrOutput()

    process.close()

    if (!success) throw new Error(new TextDecoder().decode(error))

    return new TextDecoder().decode(output)
  }

export const sh = exec('sh')
export const bash = exec('bash')
export const zsh = exec('zsh')
export const fish = exec('fish')
export default exec
