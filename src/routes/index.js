import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import { WrapperRoute } from "./WrapperRoute";
import { PrivateLayout } from "../layout/PrivateLayout";

import { Dashboard } from "../pages/Dashboard";
import { Arquivos } from "../pages/Arquivos";


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <WrapperRoute exact path="/" layout={PrivateLayout} component={Dashboard} />
                <WrapperRoute exact path="/arquivos" layout={PrivateLayout} component={Arquivos} />
            </Switch>
        </BrowserRouter>
    );
}
