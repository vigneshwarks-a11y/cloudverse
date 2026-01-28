import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";

import Home from "@/pages/Home";
import Platform from "@/pages/Platform";
import Solutions from "@/pages/Solutions";
import Integrations from "@/pages/Integrations";
import Pricing from "@/pages/Pricing";
import Security from "@/pages/Security";
import Company from "@/pages/Company";
import AboutUs from "@/pages/AboutUs";
import Resources from "@/pages/Resources";
import ResourcesGuides from "@/pages/ResourcesGuides";
import ResourcesGuideDetail from "@/pages/ResourcesGuideDetail";
import ResourcesDocs from "@/pages/ResourcesDocs";
import Contact from "@/pages/Contact";
import Partners from "@/pages/Partners";
import Help from "@/pages/Help";
import Tour from "@/pages/Tour";
import BookDemo from "@/pages/BookDemo";
import ConnectWithUs from "@/pages/ConnectWithUs";
import Legal from "@/pages/Legal";
import Compare from "@/pages/Compare";
import CloudverseLanding from "@/pages/CloudverseLanding";
import NotFound from "@/pages/not-found";
import { SIGNIN_URL, DEMO_URL } from "@/lib/links";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/platform" component={Platform} />
      <Route path="/solutions" component={Solutions} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/security" component={Security} />
      <Route path="/company" component={Company} />
      <Route path="/about" component={AboutUs} />
      <Route path="/resources" component={Resources} />
      <Route path="/resources/guides" component={ResourcesGuides} />
      <Route path="/resources/guides/:slug" component={ResourcesGuideDetail} />
      <Route path="/resources/docs" component={ResourcesDocs} />
      <Route path="/contact" component={Contact} />
      <Route path="/partners" component={Partners} />
      <Route path="/help" component={Help} />
      <Route path="/tour" component={Tour} />
      <Route path="/book-demo" component={BookDemo} />
      <Route path="/connect" component={ConnectWithUs} />
      <Route path="/compare" component={Compare} />
      <Route path="/cloudverse-landing" component={CloudverseLanding} />
      <Route path="/legal/terms" component={Legal} />
      <Route path="/legal/privacy" component={Legal} />

      {/* External redirects */}
      <Route path="/signin">{() => { window.location.href = SIGNIN_URL; return null; }}</Route>
      <Route path="/demo">{() => { window.location.href = DEMO_URL; return null; }}</Route>

      {/* Redirects */}
      <Route path="/about-us"><Redirect to="/about" /></Route>
      <Route path="/blog"><Redirect to="/resources" /></Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" storageKey="vite-ui-theme" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
