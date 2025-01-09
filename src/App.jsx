import './styling/App.css';
import { UserProvider } from './contexts/userContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ArticleList from './components/articles/ArticleList';
import ArticleDetail from './components/articles/ArticleDetail';
import Login from './components/common/Login';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';

const App = () => {
  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route
          path="/articles/:articleId"
          element={
            <ProtectedRoute>
              <ArticleDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </UserProvider>
  );
}

export default App
