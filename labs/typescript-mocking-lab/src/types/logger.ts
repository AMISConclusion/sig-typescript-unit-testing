export interface Logger {
    level: string
    log(message: string): void
    error(message: string): void
    warn(message: string): void
    info(message: string): void
    debug(message: string): void
}