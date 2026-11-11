/**
 * GA4 recommended events and their parameters, as Google names them
 * (https://developers.google.com/analytics/devguides/collection/ga4/reference/events).
 * Types only: they cost nothing at runtime. A known parameter must have the right type;
 * custom parameters set up in Google Analytics go next to them. Nothing a 3.0 app sends becomes required.
 */
export type RecommendedEvents = {
    readonly [Name in keyof OwnParameters]: OwnParameters[Name] & SharedParameters
}

export type RecommendedEventName = keyof RecommendedEvents

/** Any event name Google does not recommend, so a recommended name always gets its typed parameters. */
export type CustomEventName<Name extends string> = Name extends RecommendedEventName ? never : Name

type OwnParameters = {
    add_payment_info: Money & Coupon & { readonly payment_type?: string }
    add_shipping_info: Money & Coupon & { readonly shipping_tier?: string }
    add_to_cart: Money
    add_to_wishlist: Money
    begin_checkout: Money & Coupon
    generate_lead: Money & { readonly lead_source?: string }
    login: { readonly method?: string }
    purchase: Money & Coupon & Order
    refund: Money & Coupon & Order
    remove_from_cart: Money
    search: { readonly search_term?: string }
    select_content: { readonly content_type?: string; readonly content_id?: string }
    select_item: ItemList
    select_promotion: Promotion
    share: { readonly method?: string; readonly content_type?: string; readonly item_id?: string }
    sign_up: { readonly method?: string }
    view_cart: Money
    view_item: Money
    view_item_list: ItemList
    view_promotion: Promotion
}

/**
 * A product in `items`. It is named by `item_id`, `item_name` or both;
 * custom item parameters set up in Google Analytics go next to the standard ones.
 */
export type EventItem = ItemName & {
    readonly affiliation?: string
    readonly coupon?: string
    readonly discount?: number
    readonly index?: number
    readonly item_brand?: string
    readonly item_category?: string
    readonly item_category2?: string
    readonly item_category3?: string
    readonly item_category4?: string
    readonly item_category5?: string
    readonly item_list_id?: string
    readonly item_list_name?: string
    readonly item_variant?: string
    readonly location_id?: string
    readonly price?: number
    readonly quantity?: number
    readonly [customParameter: string]: unknown
}

type ItemName = { readonly item_id: string; readonly item_name?: string } | { readonly item_id?: string; readonly item_name: string }

type Items = readonly EventItem[]

/** Every recommended event may list its products and carry custom parameters set up in Google Analytics. */
type SharedParameters = { readonly items?: Items; readonly [customParameter: string]: unknown }

/** Google counts `value` as revenue only with its `currency` (ISO 4217, e.g. `EUR`). */
type Money = { readonly value?: number; readonly currency?: string }

type Coupon = { readonly coupon?: string }

type Order = { readonly transaction_id?: string; readonly shipping?: number; readonly tax?: number }

type ItemList = { readonly item_list_id?: string; readonly item_list_name?: string }

type Promotion = {
    readonly creative_name?: string
    readonly creative_slot?: string
    readonly promotion_id?: string
    readonly promotion_name?: string
}
