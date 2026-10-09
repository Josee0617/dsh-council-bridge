import { randomUUID } from 'node:crypto'
import { lstat, mkdir, realpath, writeFile } from 'node:fs/promises'
import { isAbsolute, join } from 'node:path'

export async function saveCouncilReport(cwd: string | undefined, report: string, signal: AbortSignal): Promise<string> {
  signal.throwIfAborted()
  if (cwd === undefined || !isAbsolute(cwd)) throw new Error('The chat has no absolute workspace directory.')
  const directory = join(await realpath(cwd), 'council-reports')
  await mkdir(directory, { recursive: true })
  if ((await lstat(directory)).isSymbolicLink()) throw new Error('The report directory must not be a symbolic link.')
  signal.throwIfAborted()
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const path = join(directory, `council-${timestamp}-${randomUUID()}.md`)
  await writeFile(path, `${report.trimEnd()}\n`, { encoding: 'utf8', flag: 'wx', signal })
  return path
}
