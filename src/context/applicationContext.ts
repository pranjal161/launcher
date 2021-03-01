import React, { useEffect, useState } from 'react';

export interface SettingInterface {
    language: string,
    appTheme: string
}

export const ApplicationContext = React.createContext<SettingInterface | null>(null);
export const AppContextProvider = ApplicationContext.Provider;
  
export const AppContextConsumer = ApplicationContext.Consumer;