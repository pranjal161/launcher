import React, {lazy} from "react";
import {Redirect} from "react-router-dom";
import ClientView from "../views/clientView/clientView";
import ContractSummary from "../views/contractSummary/contractSummary";
import ExempleDesktopView from "../views/training/TrainingNorbert/components/ExempleDesktopView/ExempleDesktopView";
import ContractSearch from "../views/contractSearch/contractSearch";

import ViewBaskets from '../views/baskets/viewBaskets';
import MyTickets from '../views/tickets/myTickets';
import NewTicket from '../views/tickets/newTicket';
import Help from '../views/help/help';
import {Training, TrainingAkruti, TrainingJeenal,
    TrainingMaxime, TrainingNikolay, TrainingNorbert,
    TrainingPranjal, TrainingQuentin, TrainingShivani,
    TrainingSuhani} from "../views/training";
import HomePage from "../views/home/home";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import ErrorLayout from "../layouts/ErrorLayout/ErrorLayout";
import AppLayout from "../layouts/AppLayout/AppLayout";

const routes = [
    {
        path: '/',
        name: 'default',
        exact: true,
        component: () => <Redirect to={'signIn'}/>
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
                component: lazy(() => import( '../views/SignIn/SignIn'))
            },
            {
                path: '/auth/signup',
                name: 'signUp',
                exact: true,
                component: lazy(() => import( '../views/SignUp/SignUp'))
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
                component: lazy(() => import('../views/errors/Error404/Error404'))
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
                component: ViewBaskets
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
                component: Training,
                routes: [
                    {
                        path: '/training/akruti',
                        name: 'trainingAkruti',
                        exact: true,
                        component: TrainingAkruti
                    },
                    {
                        path: '/training/jeenal',
                        name: 'trainingJeenal',
                        exact: true,
                        component: TrainingJeenal
                    },
                    {
                        path: '/training/maxime',
                        name: 'trainingMaxime',
                        exact: true,
                        component: TrainingMaxime
                    },
                    {
                        path: '/training/nikolay',
                        name: 'trainingNikolay',
                        exact: true,
                        component: TrainingNikolay
                    },
                    {
                        path: '/training/norbert',
                        name: 'trainingNorbert',
                        exact: true,
                        component: TrainingNorbert
                    },
                    {
                        path: '/training/pranjal',
                        name: 'trainingPranjal',
                        exact: true,
                        component: TrainingPranjal
                    },
                    {
                        path: '/training/quentin',
                        name: 'trainingQuentin',
                        exact: true,
                        component: TrainingQuentin
                    },
                    {
                        path: '/training/shivani',
                        name: 'trainingShivani',
                        exact: true,
                        component: TrainingShivani
                    },
                    {
                        path: '/training/suhani',
                        name: 'trainingSuhani',
                        exact: true,
                        component: TrainingSuhani
                    }
                ]
            }]
    }
];

export default routes;
