'use client'

import { ThemeProvider } from "@mui/material";
import theme from "@/theme";

const CustomThemeProvider= ({children} : {children: React.ReactNode}) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default CustomThemeProvider