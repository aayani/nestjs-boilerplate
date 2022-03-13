import * as path from 'path'
import * as pluralize from 'pluralize'

export class Module {
  constructor(private model: string) {
    this.model = pluralize(model)
  }

  private toKebebCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
  }

  private toTitleCase(str: string): string {
    return str
      .replace(/-/g, '_')
      .replace(/^_*(.)|_+(.)/g, (s, c, d) =>
        c ? c.toUpperCase() : d.toUpperCase(),
      )
  }

  get moduleName(): string {
    return `${this.toTitleCase(this.model)}Module`
  }

  get serviceName(): string {
    return `${this.toTitleCase(this.model)}Service`
  }

  get folderName(): string {
    return this.toKebebCase(this.model)
  }

  get modulePath(): string {
    return path.resolve('src', this.folderName, `${this.folderName}.module.ts`)
  }

  get servicePath(): string {
    return path.resolve('src', this.folderName, `${this.folderName}.service.ts`)
  }
}
