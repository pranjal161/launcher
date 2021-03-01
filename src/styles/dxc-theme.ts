import React from 'react';

export const Themes = {
    dxc_theme: {
      foreground: '#ffffff',
      background: '#222222',
      headers: {
        backgroundColor: "black",
      }
    },
  };
  
  export const ThemeContext = React.createContext(
    Themes.dxc_theme // default value
  );