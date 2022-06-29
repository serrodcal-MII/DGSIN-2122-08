import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';
import { ApartmentsChartBasicLineComponent } from './apartments-chart-basic-line/apartments-chart-basic-line.component';
import { ApartmentsChartBasicPieComponent } from './apartments-chart-basic-pie/apartments-chart-basic-pie.component';
import { ApartmentsComponent } from './apartments/apartments.component';
import { IntegrationApartmentsNoProxyComponent } from './integration-apartments-no-proxy/integration-apartments-no-proxy.component';
import { IntegrationsTaxesEnergyComponent } from './integrations-taxes-energy/integrations-taxes-energy.component';
import { IntegrationApartmentsProxyComponent } from './integration-apartments-proxy/integration-apartments-proxy.component';
import { IntegrationsComponent } from './integrations/integrations.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TaxDetailComponent } from './tax-detail/tax-detail.component';
import { TaxesDashboardComponent } from './taxes-dashboard/taxes-dashboard.component';
import { TaxesComponent } from './taxes/taxes.component';
import { WikiComponent } from './wiki/wiki.component';
import { IntegrationsTaxesProxyComponent } from './integrations-taxes-proxy/integrations-taxes-proxy.component';

const routes: Routes = [
  { path: 'wiki', component: WikiComponent },
  { path: '', redirectTo: '/wiki', pathMatch: 'full' },
  { path: 'apartments/:country/:year', component: ApartmentDetailComponent },
  { path: 'apartments', component: ApartmentsComponent },
  { path: 'taxes/:country/:year', component: TaxDetailComponent },
  { path: 'taxes', component: TaxesComponent },
  { path: 'analytics/apartments/line', component: ApartmentsChartBasicLineComponent },
  { path: 'analytics/apartments/pie', component: ApartmentsChartBasicPieComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'integrations/apartments/noproxy', component: IntegrationApartmentsNoProxyComponent },
  { path: 'integrations/apartments/proxy', component: IntegrationApartmentsProxyComponent },
  { path: 'integrations', component: IntegrationsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'analytics/taxes', component: TaxesDashboardComponent },
  { path: 'integrations/taxes/energy', component: IntegrationsTaxesEnergyComponent },
  { path: 'integrations/taxes/countries', component: IntegrationsTaxesProxyComponent },
  { path : '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
