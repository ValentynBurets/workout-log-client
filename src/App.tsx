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
          </Router>
        </AuthorizationProvider>
      </Layout>
    </div>
  );
}

export default App;