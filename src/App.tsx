import { Routes, Route } from "react-router";
import { RoutesData } from "@/router/routes";
import Layout from "@/components/layout/layout";

function App() {
  return (
    <Layout>
      <Routes>
        {RoutesData.map(({ Component, path }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </Layout>
  );
}

export default App;
