/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

import { app } from "electron"

// Set environment for development
process.env.NODE_ENV = "development"
process.env.DEBUG = "rx-ipc"

// Install `electron-debug` with `devtron`
require("electron-debug")({showDevTools: true})

// Install `vue-devtools`
app.on("ready", () => {
  const installExtension = require("electron-devtools-installer")
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {})
    .catch((error: any) => {
      console.log('Unable to install `vue-devtools`: \n', error)
    })
})

// Require `main` process to boot app
require("./index")
