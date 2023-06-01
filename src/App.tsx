import "./App.css";

import { BrowserRouter as Router, Link } from "react-router-dom";

import ExerciseDetail from "./pages/ExerciseDetail/ExerciseDetail";
import Home from "./pages/Home";
import AuthorizationProvider from "./components/authorization/AuthorizationProvider";
import LinkConfig from "./assets/jsonData/LinkConfig/LinkConfig.json";
import AuthorizedRoute from "./components/roleRoutes/AuthRoute";
import TrainingPlansPage from "./pages/TrainingPlanManagement/TrainingPlansPage/TrainingPlansPage/TrainingPlansPage";
import NewTrainingPlanPage from "./pages//TrainingPlanManagement/TrainingPlansPage/NewTrainingPlanPage/NewTrainingPlanPage";
import { Layout } from "./components/Layouts/Layout/Layout";
import About from "./pages/AboutPage/About";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import StatisticCharts from "./pages/StatisticCharts/StatisticCharts";
import UserListPage from "./pages/UserListPage/UserListPage";

function App() {
  return (
    <div className="backgroung_style">
      <Layout>
        <AuthorizationProvider>
          <Router>
            {/* to add a new page just add a route here */}
            <AuthorizedRoute
              exact
              path={LinkConfig.All.exercise_management.exercise + "/:id"}
              component={ExerciseDetail}
              role={"All"}
            />
            <AuthorizedRoute exact path="/" component={Home} role={"All"} />
            <AuthorizedRoute
              exact
              path={LinkConfig.All.TrainingPlans}
              component={TrainingPlansPage}
              role={"All"}
            />
            <AuthorizedRoute
              exact
              path={LinkConfig.All.NewTrainingPlan}
              component={NewTrainingPlanPage}
              role={"All"}
            />
            <AuthorizedRoute
              exact
              path={LinkConfig.All.about}
              component={About}
              role={"All"}
            />
            <AuthorizedRoute
              exact
              path={LinkConfig.All.user_management.profile}
              component={ProfilePage}
              role={"All"}
            />
            <AuthorizedRoute
              exact
              path={LinkConfig.All.statistics}
              component={StatisticCharts}
              role={"All"}
            />
            <AuthorizedRoute
              exact
              path={LinkConfig.All.user_management.user_list}
              component={UserListPage}
              role={"All"}
            />
          </Router>
        </AuthorizationProvider>
      </Layout>
    </div>
  );
}

export default App;