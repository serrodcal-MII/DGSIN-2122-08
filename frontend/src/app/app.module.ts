import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApartmentsComponent } from './apartments/apartments.component';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';
import { WikiComponent } from './wiki/wiki.component';
import { TaxesComponent } from './taxes/taxes.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';

//Follow README.md: https://github.com/highcharts/highcharts-angular
import { HighchartsChartModule } from 'highcharts-angular';
import { ApartmentsChartBasicLineComponent } from './apartments-chart-basic-line/apartments-chart-basic-line.component';
import { ApartmentsChartBasicPieComponent } from './apartments-chart-basic-pie/apartments-chart-basic-pie.component';
import { TaxDetailComponent } from './tax-detail/tax-detail.component';
import { TaxesDashboardComponent } from './taxes-dashboard/taxes-dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { GoogleChartsModule } from 'angular-google-charts';
import { IntegrationsComponent } from './integrations/integrations.component';
import { IntegrationApartmentsNoProxyComponent } from './integration-apartments-no-proxy/integration-apartments-no-proxy.component';
import { IntegrationsTaxesEnergyComponent } from './integrations-taxes-energy/integrations-taxes-energy.component';
import { IntegrationApartmentsProxyComponent } from './integration-apartments-proxy/integration-apartments-proxy.component';
import { IntegrationsTaxesProxyComponent } from './integrations-taxes-proxy/integrations-taxes-proxy.component';
@NgModule({
  declarations: [
    AppComponent,
    ApartmentsComponent,
    ApartmentDetailComponent,
    WikiComponent,
    TaxesComponent,
    TaxDetailComponent,
    TaxesDashboardComponent,
    AnalyticsComponent,
    NavbarComponent,
    AboutComponent,
    ApartmentsChartBasicLineComponent,
    ApartmentsChartBasicPieComponent,
    PageNotFoundComponent,
    IntegrationsComponent,
    IntegrationApartmentsNoProxyComponent,
    IntegrationsTaxesEnergyComponent,
    IntegrationApartmentsProxyComponent,
    IntegrationsTaxesProxyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    HighchartsChartModule,
    GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
