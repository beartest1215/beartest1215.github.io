import { lazy } from "react";
import { Routes, Route } from "react-router";
import { Layout } from "@/components/layout";

const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const Toys = lazy(() => import("@/pages/toys"));
const Notes = lazy(() => import("@/pages/notes"));

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/toys" element={<Toys />} />
        <Route path="/notes" element={<Notes />} />
      </Route>
    </Routes>
  );
}

export default App;
