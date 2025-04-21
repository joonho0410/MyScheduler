// components/BasicButton.tsx
'use client';

import { Button, ButtonProps } from '@mui/material';
import { forwardRef } from 'react';

// components/BasicButton.tsx

// components/BasicButton.tsx

// components/BasicButton.tsx

// components/BasicButton.tsx

// components/BasicButton.tsx

// components/BasicButton.tsx

const BasicButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <Button
      ref={ref}
      {...props}
      sx={theme => ({
        backgroundColor: theme.palette.custom.button.primary,
        color: 'black',
        border: `1px solid ${theme.palette.custom.button.darker}`,
        '&:hover': {
          backgroundColor: theme.palette.custom.button.hover,
        },
        ...props.sx, // 사용자가 전달한 sx와 병합
      })}
    />
  );
});

BasicButton.displayName = 'BasicButton';

export default BasicButton;
