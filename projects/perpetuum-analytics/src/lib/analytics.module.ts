import { NgModule, ModuleWithProviders } from '@angular/core'
import { IAnalyticsConfig } from '@projects/perpetuum-analytics/src/lib/models/Analytics-config.model'

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
})
export class AnalyticsModule {
    static forRoot(config: IAnalyticsConfig): ModuleWithProviders {
        return {
            ngModule: AnalyticsModule,
            providers: [{ provide: 'gaConfig', useValue: config }],
        }
    }
}
