import { TestBed } from '@angular/core/testing'

import { Analytics } from './analytics'
import { provideAnalytics } from './provide-analytics'
import { forgetGoogle, gtagCommands } from './testing/google-globals'

function startAnalytics(): Analytics {
    TestBed.configureTestingModule({ providers: [provideAnalytics({ tag: 'gtag', measurementId: 'G-TEST123' })] })
    return TestBed.inject(Analytics)
}

const bura = { item_id: 'BURA-250', item_name: 'Bura', price: 12.5, quantity: 2 }

describe('Typed GA4 recommended and ecommerce events', () => {
    afterEach(() => forgetGoogle())

    it('sends a typed purchase with its items, as written', () => {
        const analytics = startAnalytics()

        analytics.event('purchase', { transaction_id: 'HR-2026-0042', currency: 'EUR', value: 25, items: [bura] })

        expect(gtagCommands('event')).toEqual([
            ['event', 'purchase', { transaction_id: 'HR-2026-0042', currency: 'EUR', value: 25, items: [bura] }],
        ])
    })

    it('keeps any other event name free, with any parameters', () => {
        const analytics = startAnalytics()

        analytics.event('newsletter_opened', { issue: 42, source: 'footer' })

        expect(gtagCommands('event')).toEqual([['event', 'newsletter_opened', { issue: 42, source: 'footer' }]])
    })

    it('keeps every call that compiled in 3.0 compiling: custom parameters, no items, the 2.x names', () => {
        const analytics = startAnalytics()

        analytics.event('login')
        analytics.event('add_to_cart', { currency: 'EUR', value: 12.5 })
        analytics.event('purchase', { transaction_id: 'HR-2026-0042', currency: 'EUR', value: 25, gift_wrap: true })
        analytics.event('add_to_cart', { event_category: 'shop', event_label: 'Bura', value: 12.5 })

        expect(gtagCommands('event').map((command) => command[1])).toEqual(['login', 'add_to_cart', 'purchase', 'add_to_cart'])
    })

    it('rejects at compile time a known parameter of the wrong type', () => {
        const analytics = startAnalytics()

        // @ts-expect-error value is a number
        analytics.event('purchase', { transaction_id: 'HR-2026-0042', currency: 'EUR', value: '25' })
        // @ts-expect-error an item is named by item_id or item_name
        analytics.event('view_item', { currency: 'EUR', value: 12.5, items: [{ price: 12.5 }] })
        // @ts-expect-error items is a list, not a single item
        analytics.event('begin_checkout', { currency: 'EUR', value: 25, items: bura })
        // @ts-expect-error quantity is a number
        analytics.event('remove_from_cart', { currency: 'EUR', value: 25, items: [{ ...bura, quantity: '2' }] })
        // @ts-expect-error a search is described by its search_term, as text
        analytics.event('search', { search_term: 42 })

        expect(gtagCommands('event')).toHaveLength(5)
    })
})
