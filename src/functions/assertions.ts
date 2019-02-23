// ·············································································
// Log the results of the test into the terminal

export function log(data) {
  const ansiColor = {
    blue: text => console.log(`\x1b[1m\x1b[34m${text}\x1b[39m\x1b[22m`),
    green: text => console.log(`\x1b[32m  ✔  ${text}\x1b[39m`),
    red: text => console.log(`\x1b[31m  ✖  ${text}\x1b[39m`)
  }

  data.assertionGroups.forEach(group => {
    ansiColor.blue(group.title)

    group.assertions.forEach(assertion => {
      assertion.value === 'true'
        ? ansiColor.green(assertion.description)
        : ansiColor.red(assertion.description)
    })
  })

  console.log('\n')

  return data
}

// ·············································································
// Get all the assertions from the specification files

export function get (specifications) {
  return specifications.map(specification => ({
    title: specification.split('\n\n', 1)[0].trim(),
    assertions: specification.match(/^( |\t)*(\|-)(.|\n)*?\./gm).map(assertion => {
      const assertionFragments = /(?:\|-) (\w*) ((?:.|\n)*)/.exec(assertion)

      return {
        value: assertionFragments[1],
        description: assertionFragments[2].replace(/\n /, '')
      }
    })
  }))
}

// ·············································································
// Check if all the assertions passed

export function check (data): 0|1 {
  return data.assertionGroups.some(x => x.assertions.some(y => y.value === 'false')) ? 1 : 0
}
