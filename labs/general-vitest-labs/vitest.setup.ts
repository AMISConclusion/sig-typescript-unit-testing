import { afterEach, beforeEach, vi } from 'vitest'

beforeEach (() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

vi.setSystemTime(new Date(2021, 1, 1))
vi.advanceTimersByTime(1000) // Sometimes fails with asynchronous code
vi.advanceTimersByTimeAsync(1000) // Always works