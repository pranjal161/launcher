/* eslint-disable react/display-name */

import React, {lazy} from "react";

import AllBaskets from 'views/MyBaskets/MyBaskets';
import AppLayout from "layouts/AppLayout/AppLayout";
import AuthLayout from "layouts/AuthLayout/AuthLayout";
import ClientView from "views/ClientView/ClientView";
import ContractSearch from "views/ContractSearch/ContractSearch";
import ContractSummary from "views/ContractSummary/ContractSummary";
import ErrorLayout from "layouts/ErrorLayout/ErrorLayout";
import Help from 'views/Help/Help';
import HomePage from "views/HomePage/HomePage";
import MyTickets from "views/MyTickets/MyTickets";
import NewTicket from 'views/NewTicket/NewTicket';
import {Redirect} from "react-router-dom";
import Trainers from "views/Trainers";

const routes = [
    {
        path: '/',
        name: 'default',
        exact: true,
        component: () => <Redirect to={'/auth/signin'}/>
    },
    {
        path: '/auth',
        name: 'auth',
        exact: false,
        component: AuthLayout,
        routes: [
            {
                path: '/auth/signin',
                name: 'signIn',
                exact: true,
                component: lazy(() => import( 'views/SignIn/SignIn'))
            },
            {
                path: '/auth/signup',
                name: 'signUp',
                exact: true,
                component: lazy(() => import( 'views/SignUp/SignUp'))
            },
            {
                component: () => <Redirect to="/errors/error-404"/>
            }
        ]
    },
    {
        path: '/errors',
        component: ErrorLayout,
        routes: [
            {
                path: '/errors/error-404',
                exact: true,
                component: lazy(() => import('views/Errors/Error404/Error404'))
            },
            {
                component: () => <Redirect to="/errors/error-404"/>
            }
        ]
    },
    {
        route: '*',
        component: AppLayout,
        routes: [
            {
                path: '/home',
                name: 'home',
                exact: true,
                component: HomePage,
            },
            {
                path: '/ContractSearch',
                name: 'ContractSearch',
                exact: true,
                component: ContractSearch
            },
            {
                path: '/contracts/:contractId',
                name: 'contract',
                exact: true,
                component: ContractSummary
            },
            {
                path: '/ClientView/person/:personId',
                name: 'personView',
                exact: true,
                component: ClientView
            },
            {
                path: '/ClientView/organization/:organizationId',
                name: 'organizationView',
                exact: true,
                component: ClientView
            },
            {
                path: '/Baskets',
                name: 'viewBaskets',
                exact: true,
                component: AllBaskets
            },
            {
                path: '/Tickets',
                name: 'myTickets',
                exact: true,
                component: MyTickets
            },
            {
                path: '/NewTicket/create',
                name: 'newTicket',
                exact: true,
                component: NewTicket
            },
            {
                path: '/Help',
                name: 'help',
                exact: true,
                component: Help
            },
            {
                path: '/Training',
                name: 'Training',
                component: Trainers.Training,
                routes: [
                    {
                        path: '/Training/akruti',
                        name: 'trainingAkruti',
                        exact: true,
                        component: Trainers.TrainingAkruti
                    },
                    {
                        path: '/Training/jeenal',
                        name: 'trainingJeenal',
                        exact: true,
                        component: Trainers.TrainingJeenal
                    },
                    {
                        path: '/Training/maxime',
                        name: 'trainingMaxime',
                        exact: true,
                        component: Trainers.TrainingMaxime
                    },
                    {
                        path: '/Training/nikolay',
                        name: 'trainingNikolay',
                        exact: true,
                        component: Trainers.TrainingNikolay
                    },
                    {
                        path: '/Training/norbert',
                        name: 'trainingNorbert',
                        exact: true,
                        component: Trainers.TrainingNorbert
                    },
                    {
                        path: '/Training/pranjal',
                        name: 'trainingPranjal',
                        exact: true,
                        component: Trainers.TrainingPranjal
                    },
                    {
                        path: '/Training/quentin',
                        name: 'trainingQuentin',
                        exact: true,
                        component: Trainers.TrainingQuentin
                    },
                    {
                        path: '/Training/shivani',
                        name: 'trainingShivani',
                        exact: true,
                        component: Trainers.TrainingShivani
                    },
                    {
                        path: '/Training/suhani',
                        name: 'trainingSuhani',
                        exact: true,
                        component: Trainers.TrainingSuhani
                    }
                ]
            },
            {
                component: () => <Redirect to="/errors/error-404"/>
            }]
    }
];

export default routes;
