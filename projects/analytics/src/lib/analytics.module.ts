import { NgModule, ModuleWithProviders } from '@angular/core'
import { AnalyticsComponent } from './analytics.component'
import { IAnalyticsConfig } from '@analytics/models/Analytics-config.model'

@NgModule({
    declarations: [AnalyticsComponent],
    imports: [],
    exports: [AnalyticsComponent],
})
export class AnalyticsModule {
    static forRoot(config: IAnalyticsConfig): ModuleWithProviders {
        return {
            ngModule: AnalyticsModule,
            providers: [{ provide: 'gaConfig', useValue: config }],
        }
    }
}
