import { Route, Routes } from "react-router";
import Experience from "./pages/Experience";
import Resume from "./pages/Resume";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import Home from "./pages/Home";
import Layout from "./components/layout/layout";

const App = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/work"
          element={
            <Layout>
              <Experience />
            </Layout>
          }
        />
        <Route
          path="/resume"
          element={
            <Layout>
              <Resume />
            </Layout>
          }
        />
        <Route
          path="/blog"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route
          path="/projects"
          element={
            <Layout>
              <Projects />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
