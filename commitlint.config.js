module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [ commit => /(^Deploying)/.test(commit)]
}