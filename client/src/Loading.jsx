import { Box } from '@mui/material';
import {  } from 'react';

const Loading = () => {
  if (window.localStorage.getItem('mode') === null) 
    window.localStorage.setItem('mode', 'light')
  
  let color = window.localStorage.getItem('mode') === 'dark'? '#000':'#fff';

  return (
    <div className='loading' style={{
      display: 'grid',
      placeItems: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: color,
    }}>
        <Box
          component='img'
          src="https://firebasestorage.googleapis.com/v0/b/essile-85c38.appspot.com/o/loading_logo.svg?alt=media&token=cb5f4bc1-110d-4174-b5ee-7a097109d215"
          alt="loading image logo"
          sx={
            {
              width: {md: 350, xs: 300}
            }
          }
        />
    </div>
  );
}

export { Loading };
