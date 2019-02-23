#!/usr/bin/env node

import * as path from 'path'
import * as assertions from './functions/assertions'
import * as specifications from './functions/specifications'
import { f } from '@jameskolce/lambda.js'

f.pipeAsync([
  // ·············································································
  // Get all the specification file paths
  // If a specification file is provided then just test that file
  // Otherwise find all the specification files in the target directory

  state => {
    const specRegExp = /\.spec\.(ts|js)$/

    return {
      ...state,
      paths: specRegExp.test(state.target)
        ? [ state.target ]
        : specifications.find(state.target, specRegExp)
    }
  },

  // ·············································································
  // Get the content of each specification file

  state => ({
    ...state,
    specifications: specifications.get(state.paths)
  }),

  // ·············································································
  // Get the assertions of each specification file

  state => ({
    ...state,
    assertionGroups: assertions.get(state.specifications)
  }),

  // ·············································································
  // Log all the assertions

  assertions.log,

  // ·············································································
  // Check for any failed assertions and return an appropriate exit code

  assertions.check
])({
  target: path.join(process.cwd(), process.argv[2])
}).then(
  exitCode => process.exitCode = exitCode
)
