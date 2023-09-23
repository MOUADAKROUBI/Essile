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
          src="https://firebasestorage.googleapis.com/v0/b/essile-85c38.appspot.com/o/loading_logo.svg?alt=media&token=cb5f4bc1-110d-4174-b5ee-7a097109d215"
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
