import { Listener } from "xstream"
import BluebirdPromise from "bluebird-lst"
import iview from "iview"
import rxIpc from "../rx-ipc/renderer"
import { Lazy } from "../main/util"

export interface ProjectInfoPrerequisites {
  yarn: boolean
}

export interface ProjectInfo {
  prerequisites: ProjectInfoPrerequisites
}

class InfoListener implements Listener<ProjectInfo> {
  constructor(private resolve: Function | null, private reject: Function | null) {
    iview.LoadingBar.start()
  }

  next(data: ProjectInfo): void {
    const resolve = this.resolve
    if (resolve == null) {
      Object.assign(info, data)
    }
    else {
      iview.LoadingBar.finish()
      this.resolve = null
      resolve(data)
    }
  }

  error(error: ProjectInfo): void {
    const reject = this.reject
    if (reject == null) {
      console.error()
    }
    else {
      iview.LoadingBar.finish()
      this.reject = null
      reject(error)
    }
  }

  complete(): void {
  }
}

const info: ProjectInfo | null = null

const subscription = new Lazy<ProjectInfo>(() => new BluebirdPromise<ProjectInfo>(function (resolve, reject) {
  rxIpc.runCommand("toolStatus")
    .subscribe(new InfoListener(resolve, reject))
}))

export async function getInfo(): Promise<ProjectInfo> {
  if (info != null) {
    return info
  }
  return await subscription.value
}