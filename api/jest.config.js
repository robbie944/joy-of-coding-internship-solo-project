// More info at https://redwoodjs.com/docs/project-configuration-dev-test-build

const config = {
  rootDir: '../',
  preset: '@redwoodjs/testing/config/jest/api',
}

module.exports = config

// api/jest.config.js
// const config = {
//   rootDir: '../',
//   preset: '@redwoodjs/testing/config/jest/api',
//   setupFilesAfterEnv: ['<rootDir>/src/lib/jest.setup.js'], // Add this line
// }

// module.exports = config

