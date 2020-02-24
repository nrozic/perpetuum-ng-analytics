import { NgModule, ModuleWithProviders } from '@angular/core'
import { IAnalyticsConfig } from './models/Analytics-config.model'
import { AnalyticsDirective } from './analytics.directive'

@NgModule({
    declarations: [AnalyticsDirective, AnalyticsDirective],
    imports: [],
    exports: [AnalyticsDirective],
})
export class AnalyticsModule {
    static forRoot(config: IAnalyticsConfig): ModuleWithProviders {
        return {
            ngModule: AnalyticsModule,
            providers: [{ provide: 'gaConfig', useValue: config }, AnalyticsDirective],
        }
    }
}
