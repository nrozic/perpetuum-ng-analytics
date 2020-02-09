import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { AboutComponent } from './about/about.component'
import { ContactComponent } from './contact/contact.component'
import { AnalyticsModule } from 'analytics'
import { environment } from '../environments/environment'
import { ITrackingType } from 'analytics/lib/models/Analytics-config.model'

@NgModule({
    declarations: [AppComponent, HomeComponent, AboutComponent, ContactComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AnalyticsModule.forRoot({
            trackingId: environment.trackingId,
            trackingType: environment.trackingType as ITrackingType,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
