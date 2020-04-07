import Vue from 'vue'

const requireComponent = require.context(
  './components',
  false,
  /[A-Z]\w+\.(vue)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const componentName = fileName.replace(/([a-z])([A-Z])/g, (match, a, b) => {
    return `${a}-${b}`
  })
    .toLowerCase()
    .replace(/\.\//, '')
    .replace(/\.vue/, '')

  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})
