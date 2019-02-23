import { readdirSync, statSync } from 'fs'
import { join } from 'path'

// ·············································································
// Get the content of the specification files

export function get (paths) {
  return paths.map(path => /.ts$/.test(path) ? require(path).default : require(path))
}

// ·············································································
// Find all the specification files in the directory

export function find (dir: string, matchPattern: RegExp, fileList: Array<string> = []): Array<string> {
  readdirSync(dir).forEach(file => {
    const filePath = join(dir, file) // Get the full path

    fileList = statSync(filePath).isDirectory() // Check if we are in a directory then
      ? find(filePath, matchPattern, fileList) // Continue the recursion
      : fileList.concat(matchPattern.test(filePath) ? filePath : '') // Otherwise check if matches the pattern
  })

  return fileList.filter(x => x) // Return the list of found files
}
