import ClientView from "../views/clientView/clientView";
import ContractSearch from "../views/contractSearch/contractSearch";
import ContractSummary from "../views/contractSummary/contractSummary";
import ExempleDesktopView from "../views/training/TrainingNorbert/components/ExempleDesktopView/ExempleDesktopView";
import Help from '../views/help/help';
import HomePage from "../views/home/home";
import MyTickets from '../views/tickets/myTickets';
import NewTicket from '../views/tickets/newTicket';
import React from "react";
import {Redirect} from "react-router-dom";
import SignIn from "../views/SignIn/SignIn";
import SignUp from "../views/SignUp/SignUp";
import Training from "../views/training/training";
import TrainingAkruti from "../views/training/TrainingAkruti";
import TrainingJeenal from "../views/training/TrainingJeenal";
import TrainingMaxime from "../views/training/TrainingMaxime";
import TrainingNikolay from "../views/training/TrainingNikolay";
import TrainingNorbert from "../views/training/TrainingNorbert/TrainingNorbert";
import TrainingPranjal from "../views/training/TrainingPranjal";
import TrainingQuentin from "../views/training/TrainingQuentin";
import TrainingShivani from "../views/training/TrainingShivani";
import TrainingSuhani from "../views/training/TrainingSuhani";
import ViewBaskets from '../views/baskets/viewBaskets';

const routes = [
    {
        path: '/',
        name: 'default',
        exact: true,
        // eslint-disable-next-line react/display-name
        component: ({}) => <Redirect to={'signIn'}/>
    },
    {
        path: '/home',
        name: 'home',
        exact: true,
        component: HomePage,
        routes: []
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
        path: '/signin',
        name: 'signIn',
        exact: true,
        component: SignIn
    },
    {
        path: '/signup',
        name: 'signUp',
        exact: true,
        component: SignUp
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
    }
];

routes.displayName = 'MyComponent';

export default routes;
