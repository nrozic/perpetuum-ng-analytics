import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        // The Angular unit-test builder runs spec files without isolation by default, so files in one worker share
        // modules across fresh jsdom windows. Angular's FakeNavigation then dispatches an Event from one window on an
        // element of another and a navigating spec fails at random. Each file gets its own environment instead.
        isolate: true,
    },
})
