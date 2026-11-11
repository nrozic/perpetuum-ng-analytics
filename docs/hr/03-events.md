---
title: Vlastiti eventi
slug: dogadaji
order: 3
summary: Pošalji add_to_cart, sign_up i bilo koji drugi GA4 event iz predloška ili iz koda.
---

# Vlastiti eventi

Prikazi stranica ne traže kod. Za sve ostalo pošalji event s imenom i parametrima onako kako ih imenuje Google Analytics 4.

## Iz predloška

```ts
import { TrackEvent } from '@triliumhr/perpetuum-analytics'

@Component({
    imports: [TrackEvent],
    template: `
        <button type="button" perpetuumTrack="add_to_cart" [perpetuumTrackParams]="{ currency: 'EUR', value: product.price }">
            Dodaj u košaricu
        </button>
    `,
})
export class ProductCard {}
```

Event se šalje na klik. Svaki klik šalje jedan event, a dvoklik dva.

## Iz koda

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

## Webshop

GA4 eventi webshopa nose `currency`, `value` i `items`. Google `value` broji kao prihod uz `currency`, a izvještaji webshopa čitaju proizvode iz `items`:

```ts
this.analytics.event('purchase', {
    transaction_id: order.number,
    currency: 'EUR',
    value: order.total,
    items: order.lines.map((line) => ({ item_id: line.sku, item_name: line.name, price: line.price, quantity: line.quantity })),
})
```

Popis [preporučenih evenata](https://support.google.com/analytics/answer/9267735) i njihovih parametara vodi Google.

## Tipizirani preporučeni eventi

_Od verzije 3.2_

Za evente koje Google preporučuje (`purchase`, `add_to_cart`, `begin_checkout`, `view_item`, `search`, `sign_up` i ostale s popisa) editor nudi parametre i proizvode u `items`, a poznati parametar krivog tipa vidiš već dok pišeš:

```ts
// Ne kompajlira se: value je broj (Type 'string' is not assignable to type 'number').
this.analytics.event('add_to_cart', { currency: 'EUR', value: '12.50', items: [{ item_id: 'BURA-250' }] })
```

Proizvod se imenuje s `item_id`, `item_name` ili oboje, a `items` je uvijek popis. Vlastiti parametri postavljeni u Google Analyticsu idu uz standardne, i na eventu i na svakom proizvodu. Svako drugo ime eventa i dalje prima slobodne parametre. Tipovi ne dodaju ništa u izvođenju, a svaki poziv koji se kompajlirao u 3.0 kompajlira se i dalje. Za opis proizvoda u vlastitom kodu uvezi tip proizvoda:

```ts
import { EventItem } from '@triliumhr/perpetuum-analytics'

function itemOf(line: OrderLine): EventItem {
    return { item_id: line.sku, item_name: line.name, price: line.price, quantity: line.quantity }
}
```

## Što ostaje izvan evenata

Google Analytics ne prima osobne podatke: imena, e-mail adrese, brojeve telefona, adrese. Umjesto njih koristi ID-jeve, npr. broj narudžbe.
