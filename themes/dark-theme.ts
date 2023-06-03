import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';



export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#ff9000",
        },
        secondary: {
            main: '#19857b'
        },
        error: {
            main: red.A400
        },
        },

        components: {
            MuiAppBar: {
                defaultProps: {
                    elevation: 0
                },
                styleOverrides: {
                    root: {
                        backgroundColor: '#ff9000'
                    }
                }
            }
        }
});