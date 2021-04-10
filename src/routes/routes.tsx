/* eslint-disable react/display-name */

import React, {lazy} from "react";

import AllBaskets from 'components/Baskets/components/AllBaskets/AllBaskets';
import AppLayout from "layouts/AppLayout/AppLayout";
import AuthLayout from "layouts/AuthLayout/AuthLayout";
import ClientView from "views/clientView/clientView";
import ContractSearch from "views/contractSearch/contractSearch";
import ContractSummary from "views/contractSummary/contractSummary";
import ErrorLayout from "layouts/ErrorLayout/ErrorLayout";
import ExempleDesktopView from "views/training/TrainingNorbert/components/ExempleDesktopView/ExempleDesktopView";
import Help from 'views/help/help';
import HomePage from "views/HomePage/HomePage";
import MyTickets from "components/Tickets/MyTickets/MyTickets";
import NewTicket from 'views/tickets/newTicket';
import {Redirect} from "react-router-dom";
import Trainers from "views/training";

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
                component: lazy(() => import('views/errors/Error404/Error404'))
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
                path: '/contractSearch',
                name: 'contractSearch',
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
                path: '/clientView/person/:personId',
                name: 'personView',
                exact: true,
                component: ClientView
            },
            {
                path: '/clientView/organization/:organizationId',
                name: 'organizationView',
                exact: true,
                component: ClientView
            },

            {
                path: '/exemple/desktop',
                name: 'exempleDesktop',
                exact: true,
                component: ExempleDesktopView
            },
            {
                path: '/baskets/all',
                name: 'viewBaskets',
                exact: true,
                component: AllBaskets
            },
            {
                path: '/tickets/myTickets',
                name: 'myTickets',
                exact: true,
                component: MyTickets
            },
            {
                path: '/tickets/create',
                name: 'newTicket',
                exact: true,
                component: NewTicket
            },
            {
                path: '/help',
                name: 'help',
                exact: true,
                component: Help
            },
            {
                path: '/training',
                name: 'training',
                component: Trainers.Training,
                routes: [
                    {
                        path: '/training/akruti',
                        name: 'trainingAkruti',
                        exact: true,
                        component: Trainers.TrainingAkruti
                    },
                    {
                        path: '/training/jeenal',
                        name: 'trainingJeenal',
                        exact: true,
                        component: Trainers.TrainingJeenal
                    },
                    {
                        path: '/training/maxime',
                        name: 'trainingMaxime',
                        exact: true,
                        component: Trainers.TrainingMaxime
                    },
                    {
                        path: '/training/nikolay',
                        name: 'trainingNikolay',
                        exact: true,
                        component: Trainers.TrainingNikolay
                    },
                    {
                        path: '/training/norbert',
                        name: 'trainingNorbert',
                        exact: true,
                        component: Trainers.TrainingNorbert
                    },
                    {
                        path: '/training/pranjal',
                        name: 'trainingPranjal',
                        exact: true,
                        component: Trainers.TrainingPranjal
                    },
                    {
                        path: '/training/quentin',
                        name: 'trainingQuentin',
                        exact: true,
                        component: Trainers.TrainingQuentin
                    },
                    {
                        path: '/training/shivani',
                        name: 'trainingShivani',
                        exact: true,
                        component: Trainers.TrainingShivani
                    },
                    {
                        path: '/training/suhani',
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
