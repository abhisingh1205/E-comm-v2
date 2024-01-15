import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CustomerHome from "./components/CustomerHome";
import ProductScreen from './components/ProductScreen'
import AdminHome from './components/AdminHome'
import CategoryForm from './components/CategoryForm'
import ProductForm from './components/ProductForm'
import Register from "./components/Register";
import Login from "./components/Login";


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" exact Component={Login} />
            <Route path="/admin-home" exact Component={AdminHome} />
            <Route path="/home" exact Component={CustomerHome} />
            <Route path="/register" Component={Register} />
            <Route path="/product/:id" Component={ProductScreen} />
            <Route path="/login" Component={Login} />
            <Route path="/logout" Component={Login} />
            <Route path="/create-category" Component={CategoryForm} />
            <Route path="/create-product" Component={ProductForm} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
