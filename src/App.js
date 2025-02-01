import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import useInitApollo from 'hooks/useInitApollo';
import Mainpage from 'pages/Mainpage';
import { QueryParamProvider } from 'use-query-params';
import { observer } from 'mobx-react';

function App() {
  const client = useInitApollo({
  });



  return (
    <ApolloProvider client={client}>
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Switch>
            <Route name="Mainpage" path="/" component={Mainpage} />
          </Switch>
        </QueryParamProvider>
      </Router>
    </ApolloProvider>
  );
}

export default observer(App);
