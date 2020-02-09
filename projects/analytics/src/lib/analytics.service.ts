import { Injectable, Inject, PLATFORM_ID, Renderer2 } from '@angular/core'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { DOCUMENT, isPlatformBrowser } from '@angular/common'
import { filter, map, mergeMap } from 'rxjs/operators'
import { Title } from '@angular/platform-browser'

import { IAnalyticsConfig } from './models/Analytics-config.model'

declare const gtag: any
declare const ga: any
declare const dataLayer: any

@Injectable({
    providedIn: 'root',
})
export class AnalyticsService {
    constructor(
        @Inject(PLATFORM_ID) protected platformId,
        @Inject(DOCUMENT) private document,
        @Inject('gaConfig') private config: IAnalyticsConfig,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title
    ) {}

    /**
     * @description It will initialize Google Analytics module and tracking. Call this method when application boots up.
     * Good place to call this method is in `app.component` on init
     *
     * @param renderer reference to `Renderer2` since renderer can't be used directly in services
     */
    setGoogleAnalyticsScripts(renderer: Renderer2): void {
        if (isPlatformBrowser(this.platformId)) {
            switch (this.config.trackingType) {
                case 'analytics':
                    this._gaSend()
                    break
                case 'gtm':
                    this._dataLayerSend()
                    break
                default:
                    this._setGtag(renderer)
                    break
            }
        }
    }

    sendEvent(eventCategory: string, eventAction: string, eventLabel: string, eventValue: number): void {
        switch (this.config.trackingType) {
            case 'analytics':
                this._gaSendEvent(eventCategory, eventAction, eventLabel, eventValue)
                break
            case 'gtm':
                this._dataLayerSendEvent(eventCategory, eventAction, eventLabel, eventValue)
                break
            default:
                this._gtagSendEvent(eventCategory, eventAction, eventLabel, eventValue)
                break
        }
    }

    private _gaSendEvent(eventCategory: string, eventAction: string, eventLabel: string, eventValue: number): void {
        // console.log('Sending custom event ga')
        ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue)
    }

    private _dataLayerSendEvent(eventCategory: string, eventAction: string, eventLabel: string, eventValue: number): void {
        // console.log('Sending custom event datalayer')
        dataLayer.push({
            event: 'GAEvent',
            eventCategory,
            eventAction,
            eventLabel,
            eventValue,
        })
    }

    private _gtagSendEvent(eventCategory: string, eventAction: string, eventLabel: string, eventValue: number): void {
        // console.log('Sending custom event gtag')
        gtag('event', eventAction, {
            event_category: eventCategory,
            event_label: eventLabel,
            value: eventValue,
        })
    }

    /**
     * @description It will create gtag script tag dynamically using tracking ID provided in configuration
     *
     * @param renderer reference to `Renderer2` since renderer can't be used directly in services
     */
    private _setGtag(renderer: Renderer2): void {
        if (this.config.trackingType === 'gtag') {
            const gatag: HTMLScriptElement = renderer.createElement('script')
            gatag.setAttribute('async', '')
            gatag.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.trackingId}`
            renderer.appendChild(this.document.body, gatag)
        }

        this._setGoogleAnalyticsScriptTag(renderer)
    }

    /**
     * @description It will create Google analytics script tag dynamically using tracking ID provided in configuration
     *
     * @param renderer reference to `Renderer2` since renderer can't be used directly in services
     */
    private _setGoogleAnalyticsScriptTag(renderer: Renderer2): void {
        const script: HTMLScriptElement = renderer.createElement('script')
        script.text = this._getScript()

        renderer.appendChild(this.document.body, script)

        this._startTracking()
        console.log('Google Analytics module initialized')
    }

    private _getScript(): string {
        switch (this.config.trackingType) {
            case 'analytics':
                return `
                    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
                    ga('create', ${this.config.trackingId}, 'auto');
                    ga('send', 'pageview');
                `
            case 'gtm':
                return `
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer', ${this.config.trackingId});
                `
            default:
                return `
                    window.dataLayer = window.dataLayer || [];function gtag() { dataLayer.push(arguments); }
                    gtag('js', new Date()); gtag('config', '${this.config.trackingId}');
                `
        }
    }

    /**
     * @description It initkializes tracking by subscribing to router event. This will ensure that every route change
     * triggers method to send new page view event to Google Analytics
     */
    private _startTracking(): void {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map(route => {
                    while (route.firstChild) {
                        route = route.firstChild
                    }

                    return route
                }),
                filter(route => route.outlet === 'primary'),
                mergeMap(route => route.data)
            )
            .subscribe(event => {
                this._sendPageViewEvent()
            })
    }

    /**
     * @description It will check configuration and send pagewiew event using appropriate syntax
     */
    private _sendPageViewEvent(): void {
        switch (this.config.trackingType) {
            case 'analytics':
                this._gaSend()
                break
            case 'gtm':
                this._dataLayerSend()
                break
            default:
                this._gtagSend()
                break
        }
    }

    /**
     * @description It will send pageview event using `gtag.js` syntax
     */
    private _gtagSend(): void {
        // console.log('Sending pageViewEvent GTAG')
        gtag('config', this.config.trackingId, {
            page_title: this.titleService.getTitle(),
            page_path: this.router.url,
        })
    }

    /**
     * @description It will send pageview event using `analytics.js` syntax
     */
    private _gaSend(): void {
        // console.log('Sending pageViewEvent GA')
        ga('set', 'page', this.router.url)
        ga('set', 'title', this.titleService.getTitle())
        ga('send', 'pageview')
    }

    /**
     * @description It will send pageview event using `gtm.js` syntax
     */
    private _dataLayerSend(): void {
        // console.log('Sending pageViewEvent dataLayer')
        dataLayer.push({
            event: 'pageview',
            page: {
                title: this.titleService.getTitle(),
                path: this.router.url,
            },
        })
    }
}
