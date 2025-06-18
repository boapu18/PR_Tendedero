import React from "react";
import { Outlet } from "react-router-dom";

function HeaderAndFooter() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="container-fluid top unedl t-2" id="header">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-12 col-lg-12">
                            <a href="https://www.uned.ac.cr/" className="title">
                                <span className="d-none d-md-inline">
                                    Universidad Estatal a Distancia, Costa Rica
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-grow-1">
                <Outlet />
            </div>

            <div className="container" id="footer">
                <div className="row">
                    <div className="col-md-12 offset-lg-6 col-lg-6 ">
                        <p className="footer">
                            UNED, Costa Rica. Teléfono:{" "}
                            <a href="tel:+50625272000">+506 2527-2000</a> |
                            <a
                                href="https://www.uned.ac.cr/aviso-legal"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Aviso legal
                            </a>{" "}
                            |
                            <a href="https://www.uned.ac.cr/dtic/" rel="noreferrer" target="_blank">
                                DTIC
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderAndFooter;
