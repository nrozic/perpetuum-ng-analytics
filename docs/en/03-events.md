---
title: Custom events
slug: events
order: 3
summary: Send add_to_cart, sign_up and any other GA4 event from a template or from code.
---

# Custom events

Page views need no code. For everything else, send an event with a name and parameters as Google Analytics 4 names them.

## From a template

```ts
import { TrackEvent } from '@triliumhr/perpetuum-analytics'

@Component({
    imports: [TrackEvent],
    template: `
        <button type="button" perpetuumTrack="add_to_cart" [perpetuumTrackParams]="{ currency: 'EUR', value: product.price }">
            Add to cart
        </button>
    `,
})
export class ProductCard {}
```

The event is sent when the element is clicked. Every click sends one event, a double click sends two.

## From code

```ts
import { Analytics } from '@triliumhr/perpetuum-analytics'

export class SignUpForm {
    private readonly analytics = inject(Analytics)

    protected async signUp(): Promise<void> {
        await this.account.create()
        this.analytics.event('sign_up', { method: 'email' })
    }
}
```

## Ecommerce

GA4 ecommerce events carry `currency`, `value` and `items`. Google counts `value` as revenue only together with `currency`, and its ecommerce reports read the products from `items`:

```ts
this.analytics.event('purchase', {
    transaction_id: order.number,
    currency: 'EUR',
    value: order.total,
    items: order.lines.map((line) => ({ item_id: line.sku, item_name: line.name, price: line.price, quantity: line.quantity })),
})
```

Google keeps the list of [recommended events](https://support.google.com/analytics/answer/9267735) and their parameters.

## Typed recommended events

_Since 3.2_

For the events Google recommends (`purchase`, `add_to_cart`, `begin_checkout`, `view_item`, `search`, `sign_up` and the rest of the list), the editor suggests the parameters and the products in `items`, and a known parameter of the wrong type is caught while you write:

```ts
// Does not compile: value is a number (Type 'string' is not assignable to type 'number').
this.analytics.event('add_to_cart', { currency: 'EUR', value: '12.50', items: [{ item_id: 'BURA-250' }] })
```

An item is named by `item_id`, `item_name` or both, and `items` is always a list. Custom parameters set up in Google Analytics go next to the standard ones, on the event and on each item. Any other event name keeps free parameters. The types cost nothing at runtime, and every call that compiled in 3.0 still compiles. To describe products in your own code, import the item type:

```ts
import { EventItem } from '@triliumhr/perpetuum-analytics'

function itemOf(line: OrderLine): EventItem {
    return { item_id: line.sku, item_name: line.name, price: line.price, quantity: line.quantity }
}
```

## What not to send

Google Analytics does not accept personal data: names, e-mail addresses, phone numbers, addresses. Use ids such as an order number instead.
