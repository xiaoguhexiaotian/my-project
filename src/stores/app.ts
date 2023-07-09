import { defineStore } from 'pinia'
import { ProjectConfig } from '/@/settings/projectConfig'
import setting from '/@/settings/projectConfig'

interface AppState {
  projectConfig: ProjectConfig | null
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    projectConfig: setting
  }),
  getters: {
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    }
  },
  actions: {
    setProjectConfig(config): void {
      this.projectConfig = Object.assign(this.projectConfig || {}, config)
    }
  }
})
