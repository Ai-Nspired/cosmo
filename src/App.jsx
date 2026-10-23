import { lazy } from "react";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";

const Explore = lazy(() => import("./pages/Explore"));
const Guides = lazy(() => import("./pages/Guides"));
const SunSignGuide = lazy(() => import("./pages/SunSignGuide"));
const ChineseZodiacGuide = lazy(() => import("./pages/ChineseZodiacGuide"));
const NumberGuide = lazy(() => import("./pages/NumberGuide"));
const CoreNumberGuide = lazy(() => import("./pages/CoreNumberGuide"));
const Method = lazy(() => import("./pages/Method"));
const Faq = lazy(() => import("./pages/Faq"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/guides/sun-signs/:sign" element={<SunSignGuide />} />
        <Route path="/guides/chinese-zodiac/:animal" element={<ChineseZodiacGuide />} />
        <Route path="/guides/numbers/:number" element={<NumberGuide />} />
        <Route path="/guides/core-numbers/:type" element={<CoreNumberGuide />} />
        <Route path="/method" element={<Method />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
