export const buttonSX = {
  primary: {
    backgroundColor: 'theme.primary',
    color: 'white',
    '& .MuiCircularProgress-root': { color: 'theme.primary', width: `24px!important`, height: `24px!important` },
  },
  secondary: {
    backgroundColor: 'theme.secondary',
    color: 'theme.text.inverse',
    '& .MuiCircularProgress-root': { color: 'theme.secondary', width: `24px!important`, height: `24px!important` },
  },
  success: {
    backgroundColor: 'theme.success',
    color: 'white',
    '& .MuiCircularProgress-root': { color: 'theme.success', width: `24px!important`, height: `24px!important` },
  },
  warning: {
    backgroundColor: 'theme.warning',
    color: 'theme.text.inverse',
    '& .MuiCircularProgress-root': { color: 'theme.warning', width: `24px!important`, height: `24px!important` },
  },
  danger: {
    backgroundColor: 'theme.danger',
    color: 'white',
    '& .MuiCircularProgress-root': { color: 'theme.danger', width: `24px!important`, height: `24px!important` },
  },
}

export const buttonTextSX = {
  primary: {
    color: 'theme.primary',
    '& .MuiCircularProgress-root': { color: 'theme.primary', width: `24px!important`, height: `24px!important` },
  },
  secondary: {
    color: 'theme.secondary',
    '& .MuiCircularProgress-root': { color: 'theme.secondary', width: `24px!important`, height: `24px!important` },
  },
  warning: {
    color: 'theme.warning',
    '& .MuiCircularProgress-root': { color: 'theme.warning', width: `24px!important`, height: `24px!important` },
  },
  danger: {
    color: 'theme.danger',
    '& .MuiCircularProgress-root': { color: 'theme.danger', width: `24px!important`, height: `24px!important` },
  },
}

export const iconButtonSX = {
  primary: {
    color: 'theme.text.primary',
    '& .MuiCircularProgress-root:not(.Mui-disabled)': { color: 'theme.primary', width: `24px!important`, height: `24px!important` },
    '&.Mui-disabled': {
      color: 'theme.text.disabled!important',
    },
  },
  secondary: {
    color: 'theme.text.inverse',
    '& .MuiCircularProgress-root': { color: 'theme.secondary', width: `24px!important`, height: `24px!important` },
    '&.Mui-disabled': {
      color: 'theme.text.disabled',
    },
  },
  danger: {
    color: 'theme.text.primary',
    '& .MuiCircularProgress-root': { color: 'theme.danger', width: `24px!important`, height: `24px!important` },
    '&.Mui-disabled': {
      color: 'theme.text.disabled',
    },
  },
}
