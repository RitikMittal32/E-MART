import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import './dashboard.css';
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="design p-3">
              <div className="uk-image">
                <img src="/images/uk.png" alt="UK" />
              </div>
              <div className="text-base">
                <h1>Name : {auth?.user?.name}</h1>
                <h1>Email : {auth?.user?.email}</h1>
                <h1>Address : {auth?.user?.address}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
