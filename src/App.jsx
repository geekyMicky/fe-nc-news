import './styling/App.css';
import { UserProvider } from './contexts/User';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import Home from './components/Home';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
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
