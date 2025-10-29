import { Route, Switch } from "wouter";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { allRoutes } from "./constants/routes";
import CampaignList from "./pages/CampaignList";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      <Layout>
        {" "}
        <Switch>
          <Route path={allRoutes.overview} component={Overview} />
          <Route path={allRoutes.campaign} component={CampaignList} />
        </Switch>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
