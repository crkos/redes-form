export class RateLimitingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'Limiting Error'
  }
}
