import { useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router";
import { RoutesData } from "@/router/routes";
import Layout from "@/components/layout/layout";

function App() {
  useEffect(() => {
    axios.get("https://dapi.kakao.com/v3/search/book", {
      headers: {
        Authorization: "KakaoAK " + import.meta.env.VITE_API_KEY,
      },
    });
  }, []);

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
