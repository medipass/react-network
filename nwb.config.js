module.exports = {
  type: "react-component",
  npm: {
    esModules: true,
    umd: {
      global: "ReactNetwork",
      externals: {
        react: "React"
      }
    }
  }
}
