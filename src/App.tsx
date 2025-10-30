import { Route, Switch } from "wouter";
import Layout from "./components/Layout";
import Overview from "./pages/Overview";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { allRoutes } from "./constants/routes";
import CampaignList from "./pages/CampaignList";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignInformation from "./pages/CampaignInfo";

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
          <Route path={allRoutes.create} component={CreateCampaign} />{" "}
          <Route path={allRoutes.info} component={CampaignInformation} />
        </Switch>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
