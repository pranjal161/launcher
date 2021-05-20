import Quote from "views/Trainers/TrainingPranjal/Quote/Quote";
import React from "react";
import withActivity from "hoc/withActivity";

const TrainingPranjal = () => {
    let url = 'http://20.33.40.95:13211/csc/insurance/quotes/ID-mrMxYScs';
    const QuoteViewActivity:any = withActivity(Quote, url)
    return (<>{QuoteViewActivity}</>)
};
export default TrainingPranjal;