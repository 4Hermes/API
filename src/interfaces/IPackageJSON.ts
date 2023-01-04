/**
 * This interface defines the object that's stored in the `package.json` file
 * for the `hermes` project.
 */
export interface IPackageJSON {
  name: string
  displayName: string
  version: string
  description: string
  main: string
  exports: string
  types: string
  type: string
  license: string
  homepage: string
  scripts: { [key: string]: string }
  engines: IPackageJSONEngines
  keywords: string[]
  repository: IPackageJSONRepository
  author: IPackageJSONAuthor
  bugs: IPackageJSONBugs
  dependencies: { [key: string]: string }
  devDependencies: { [key: string]: string }
}

export interface IPackageJSONAuthor {
  name: string
  email: string
  url: string
}

export interface IPackageJSONBugs {
  email: string
  url: string
}

export interface IPackageJSONEngines {
  node: string
}

export interface IPackageJSONRepository {
  type: string
  url: string
}
