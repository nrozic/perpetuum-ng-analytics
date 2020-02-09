import { Component, OnInit, Renderer, Renderer2 } from '@angular/core'
import { AnalyticsService } from '@projects/analytics/src/public-api'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'demo-app'

    constructor(private analyticsService: AnalyticsService, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.analyticsService.setGoogleAnalyticsScripts(this.renderer)
    }
}
