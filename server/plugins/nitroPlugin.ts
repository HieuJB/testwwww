export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:response', (response, { event }) => {
        // Inspect or Modify the renderer response here
        delete response.headers['x-powered-by'];
        delete response.headers['x-robots-tag'];
      })
})
