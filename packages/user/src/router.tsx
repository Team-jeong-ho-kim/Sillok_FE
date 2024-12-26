import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from '@/components';
import { FeedUploadPage, Home, NotFound } from '@/pages';
import { FeedDetailPage } from "./pages/FeedDetailPage";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="durls-dkansk-emfdjdhwlahtgo" element={<FeedUploadPage />} />
        <Route path="feed/:id" element={<FeedDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;