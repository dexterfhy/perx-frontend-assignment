import React from 'react';
import { Router } from '@reach/router';

import LoadingIndicator from './components/LoadingIndicator';
import Nothing from './components/Nothing';
import Topbar from './components/Topbar';
import LandingPageView from './views/LandingPageView';
import TablePageView from './views/TablePageView';
import TextPageView from './views/TextPageView';

export default function Routes() {
  return (
    <>
      <Router primary={false}>
        <Nothing path="/" />
        <Topbar default />
      </Router>
      <Router className="div-body">
        <LandingPageView path="/" />
        <TablePageView path="/table" />
        <TextPageView path="/text" />
      </Router>
    </>
  );
}
