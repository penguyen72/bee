type ErrorName = "INTERNAL_SERVER_ERROR" | "UNAUTHORIZED"

export class ProjectError extends Error {
  name: ErrorName
  message: string
  cause: any
  constructor({
    name,
    message,
    cause
  }: {
    name: ErrorName
    message: string
    cause?: any
  }) {
    super()
    this.name = name
    this.message = message
    this.cause = cause
  }
}
