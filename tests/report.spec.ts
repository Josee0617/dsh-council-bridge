import { mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { saveCouncilReport } from '../src/report.js'

const directories: string[] = []
async function workspace() {
  const directory = await mkdtemp(join(tmpdir(), 'council-report-'))
  directories.push(directory)
  return directory
}

describe('workspace Markdown reports', () => {
  afterEach(async () => {
    await Promise.all(directories.splice(0).map(directory => rm(directory, { recursive: true, force: true })))
  })

  it('saves complete Markdown in the workspace and keeps consecutive reports', async () => {
    const cwd = await workspace()
    const signal = new AbortController().signal
    const first = await saveCouncilReport(cwd, '# Decision\n\n**Recommendation**\n', signal)
    const second = await saveCouncilReport(cwd, '# Next decision', signal)
    expect(first).toMatch(/council-reports[/\\]council-.*\.md$/)
    expect(first).not.toBe(second)
    expect(await readFile(first, 'utf8')).toBe('# Decision\n\n**Recommendation**\n')
    expect(await readFile(second, 'utf8')).toBe('# Next decision\n')
    expect(await readdir(join(cwd, 'council-reports'))).toHaveLength(2)
  })

  it.each([undefined, 'relative/workspace'])('refuses an unavailable absolute workspace: %s', async cwd => {
    await expect(saveCouncilReport(cwd, '# Report', new AbortController().signal)).rejects.toThrow('absolute workspace')
  })

  it('does not follow a report-directory link outside the workspace', async () => {
    const cwd = await workspace()
    const outside = await workspace()
    await symlink(outside, join(cwd, 'council-reports'), 'dir')
    await expect(saveCouncilReport(cwd, '# Report', new AbortController().signal)).rejects.toThrow('symbolic link')
    expect(await readdir(outside)).toEqual([])
  })

  it('preserves a conflicting existing file', async () => {
    const cwd = await workspace()
    const file = join(cwd, 'council-reports')
    await writeFile(file, 'Existing content')
    await expect(saveCouncilReport(cwd, '# Report', new AbortController().signal)).rejects.toThrow()
    expect(await readFile(file, 'utf8')).toBe('Existing content')
  })

  it('does not create files after cancellation', async () => {
    const cwd = await workspace()
    const controller = new AbortController()
    controller.abort(new Error('Canceled'))
    await expect(saveCouncilReport(cwd, '# Report', controller.signal)).rejects.toThrow('Canceled')
    expect(await readdir(cwd)).toEqual([])
  })
})
