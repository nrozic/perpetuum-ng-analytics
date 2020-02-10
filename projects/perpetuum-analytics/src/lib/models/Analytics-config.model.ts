export type ITrackingType = 'analytics' | 'gtag' | 'gtm'

export interface IAnalyticsConfig {
    trackingId: string
    trackingType: ITrackingType
}

export interface IEventData {
    eventCategory: string
    eventAction: string
    eventLabel: string
    eventValue: number
}

export class AnalyticsConfig {}
