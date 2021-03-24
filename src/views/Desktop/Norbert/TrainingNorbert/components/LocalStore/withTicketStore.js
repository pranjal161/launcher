import React from "react";
import Context from "./Context";
import {withStoreInProps} from "./withStoreInProps";

export const withTicketStore = withStoreInProps(Context)
