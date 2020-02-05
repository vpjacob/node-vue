import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // useRouteMatch,
  // useParams
} from "react-router-dom";
import StockInfoPage from "./StockInfoPage/StockInfoPage";
// import TopicsPage from "./TopicsPage/TopicsPage";
import HomePage from "./HomePage/HomePage";
import { Layout, Menu, } from 'antd';

import 'antd/dist/antd.css';
const { Header, Footer, } = Layout;


export default function App() {

  return (
    <Router>
      <div>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/">疫情图</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/stock_info">融资金额和北上资金</Link></Menu.Item>
            {/* <Menu.Item key="3"><Link to="/topics">列表</Link></Menu.Item> */}
          </Menu>
        </Header>

        <Switch>
          <Route path="/stock_info">
            <StockInfoPage />
          </Route>
          {/* <Route path="/topics">
            <TopicsPage />
          </Route> */}
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Footer style={{ textAlign: 'center' }}>VPJacob Design ©2019 Created by VPJacob</Footer>

      </div>
    </Router>
  );
}


// function Topics() {
//   let match = useRouteMatch();

//   return (
//     <div>
//       <h2>Topics</h2>

//       <ul>
//         <li>
//           <Link to={`${match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>
//             Props v. State
//           </Link>
//         </li>
//       </ul>

//       {/* The Topics page has its own <Switch> with more routes
//           that build on the /topics URL path. You can think of the
//           2nd <Route> here as an "index" page for all topics, or
//           the page that is shown when no topic is selected */}
//       <Switch>
//         <Route path={`${match.path}/:topicId`}>
//           <Topic />
//         </Route>
//         <Route path={match.path}>
//           <h3>Please select a topic.</h3>
//         </Route>
//       </Switch>
//     </div>
//   );
// }

// function Topic() {
//   let { topicId } = useParams();
//   return <h3>Requested topic ID: {topicId}</h3>;
// }
