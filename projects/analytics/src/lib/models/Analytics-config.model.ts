export type ITrackingType = 'analytics' | 'gtag' | 'gtm'

export interface IAnalyticsConfig {
    trackingId: string
    trackingType: ITrackingType
}

export class AnalyticsConfig {}
