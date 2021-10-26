import { danger, fail, warn, message, markdown, schedule, Scheduleable } from 'danger'

// Note: You need to use schedule()

const routeFile = danger.git.fileMatch('src/routes.ts')
const PATTERN = /console\.(log|error|warn|info)/
const GLOBAL_PATTERN = new RegExp(PATTERN.source, 'g')
const findConsole = (content, whitelist) => {
  let matches = content.match(GLOBAL_PATTERN)
  if (!matches) return []

  matches = matches.filter(match => {
    const singleMatch = PATTERN.exec(match)
    if (!singleMatch || singleMatch.length === 0) return false
    return !whitelist.includes(singleMatch[1])
  })
  console.log('>>matches', matches)

  return matches
}

if (findConsole) {
  warn('Você abandonou um console.log! :( ')
}

if (routeFile.edited) {
  warn('Você alterou o arquivo de rotas')
}

danger.git.JSONDiffForFile('package.json').then((diff) => {
  console.log('Diff:', diff)
  if (diff.dependencies?.added.length > 0) {
    const depName = diff.dependencies?.added.map(item => item)
    warn(`Opaa!!! Você adicionou os seguintes pacotes:\n ${depName} \nCuidado com o tamanho do bundle! :)`)
  }
})
