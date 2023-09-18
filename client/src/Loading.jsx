import { Box } from '@mui/material';
import {} from 'react';

const Loading = () => {
  return (
    <div className='loading' style={{
      display: 'grid',
      placeItems: 'center',
      width: '100vw',
      height: '100vh',
    }}>
      <div className="loading-logo">
        <Box
          component='img'
          src="./images/loading_logo.png"
          alt="loading image logo"
          sx={
            {
              width: {md: 350, xs: 300}
            }
          }
        />
      </div>
    </div>
  );
}

export {Loading };
