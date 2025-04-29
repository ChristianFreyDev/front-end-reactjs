import { createTheme } from '@mui/material/styles';

const primaryColor = '#6d6bb0';
const secondaryColor = '#333333';
const tertiaryColor = '#1976d2'
const hoverPrimaryColor = '#b9b9df';
const hoverSecondaryColor = '#ffffffaa'
const textColor = '#fff';
const textColorRows = '#000000';
const fontFamily = '"Poppins", sans-serif';
const borderRadius = '10px'

const theme = createTheme({
  typography: {
    fontFamily: fontFamily,
  },

  components: {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius,
          border: `1px solid ${primaryColor}`,
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: secondaryColor,
          color: textColor,
          fontWeight: 'bold',
        },
        body: {
          color: textColorRows,   
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: hoverPrimaryColor,
          },
        },
      },
    },

    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: textColor, 
          '&:hover': {
            color: tertiaryColor, 
            fontWeight: 'bold',
          },
          '&:hover .MuiTableSortLabel-icon': {
            color: tertiaryColor,
          },
          '&.Mui-active': {
            color: tertiaryColor, 
          },
          '&.Mui-active .MuiTableSortLabel-icon': {
            color: tertiaryColor, 
          },
        },
        icon: {
          color: 'inherit',
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          '--IconButton-hoverBg': hoverSecondaryColor,
        },
      },
    },
    
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: textColor,
          borderColor: primaryColor,
          borderRadius: borderRadius,
          marginTop: 15,
          marginBottom: 30
        },
        outlined: {
          '&.Mui-selected': {
            backgroundColor: secondaryColor,
            color: textColor,
            border: `1px solid ${secondaryColor}`,
          },
          '&.Mui-selected:hover': {
            backgroundColor: secondaryColor,
          },
        },
        text: {
          '&.Mui-selected': {
            backgroundColor: secondaryColor,
            color: textColor,
          },
          '&.Mui-selected:hover': {
            backgroundColor: secondaryColor,
          },          
          '&:hover:not(.Mui-selected)': {
            backgroundColor: hoverPrimaryColor,
            color: textColorRows
          },
        },
      },
    },
    
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#9997c2',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: textColor,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: textColor,
          },
        },
        input: {
          color: '#f0f0f5',
        },
      },
    },
  
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#b0aee0',
          '&.Mui-focused': {
            color: textColor,
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        input: {
          '::placeholder': {
            color: '#ccccdd',
            opacity: 1,
          },
        },
      },
    },

    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       '&:hover': {
    //         backgroundColor: tertiaryColor, //'#e3f2fd', // hover global do botão
    //       },
    //     },
    //   },
    // },

    // MuiListItemButton: {
    //   styleOverrides: {
    //     root: {
    //       '&:hover': {
    //         backgroundColor: tertiaryColor,
    //       },
    //     },
    //   },
    // },
  },
});

export default theme;
