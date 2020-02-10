import { Directive, Input, HostListener } from '@angular/core'
import { IEventData } from './models/Analytics-config.model'
import { AnalyticsService } from './analytics.service'

@Directive({
    selector: '[perpetuumAnalytics]',
})
export class AnalyticsDirective {
    @Input() perpetuumAnalytics: IEventData

    @HostListener('click', ['$event']) onClick($event) {
        this.analyticsService.sendEvent(this.perpetuumAnalytics)
    }

    constructor(private analyticsService: AnalyticsService) {}
}
