import { NgModule, ModuleWithProviders } from '@angular/core'
import { IAnalyticsConfig, AnalyticsDirective } from '../public-api'

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
