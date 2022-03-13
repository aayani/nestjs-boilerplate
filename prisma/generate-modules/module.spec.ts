import { Module } from './module'

describe('prisma', () => {
  describe('generate-modules', () => {
    describe('module', () => {
      describe('for normal text', () => {
        let module: Module

        beforeAll(() => {
          module = new Module('user')
        })

        it('generates correct folder name', () => {
          expect(module.folderName).toBe('users')
        })

        it('generates correct module name', () => {
          expect(module.moduleName).toBe('UsersModule')
        })

        it('generates correct service name', () => {
          expect(module.serviceName).toBe('UsersService')
        })

        it('generates correct module path', () => {
          expect(module.modulePath).toMatch('/src/users/users.module.ts')
        })

        it('generates correct service path', () => {
          expect(module.servicePath).toMatch('/src/users/users.service.ts')
        })
      })

      describe('for underscored text', () => {
        let module: Module

        beforeAll(() => {
          module = new Module('user_account')
        })

        it('generates correct folder name', () => {
          expect(module.folderName).toBe('user-accounts')
        })

        it('generates correct module name', () => {
          expect(module.moduleName).toBe('UserAccountsModule')
        })

        it('generates correct service name', () => {
          expect(module.serviceName).toBe('UserAccountsService')
        })
      })

      describe('for title text', () => {
        let module: Module

        beforeAll(() => {
          module = new Module('UserAccount')
        })

        it('generates correct folder name', () => {
          expect(module.folderName).toBe('user-accounts')
        })

        it('generates correct module name', () => {
          expect(module.moduleName).toBe('UserAccountsModule')
        })

        it('generates correct service name', () => {
          expect(module.serviceName).toBe('UserAccountsService')
        })
      })

      describe('for camel case text', () => {
        let module: Module

        beforeAll(() => {
          module = new Module('userAccount')
        })

        it('generates correct folder name', () => {
          expect(module.folderName).toBe('user-accounts')
        })

        it('generates correct module name', () => {
          expect(module.moduleName).toBe('UserAccountsModule')
        })

        it('generates correct service name', () => {
          expect(module.serviceName).toBe('UserAccountsService')
        })
      })

      describe('for kebab case text', () => {
        let module: Module

        beforeAll(() => {
          module = new Module('user-account')
        })

        it('generates correct folder name', () => {
          expect(module.folderName).toBe('user-accounts')
        })

        it('generates correct module name', () => {
          expect(module.moduleName).toBe('UserAccountsModule')
        })

        it('generates correct service name', () => {
          expect(module.serviceName).toBe('UserAccountsService')
        })
      })
    })
  })
})
