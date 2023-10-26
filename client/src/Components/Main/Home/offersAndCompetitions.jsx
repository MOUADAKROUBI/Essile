import { Typography } from '@mui/material';
import {} from 'react';
import { motion } from 'framer-motion';

const OffersAndCompetitions = () => {

  return (
    <section className='my-5 offersComp'>
      <Typography
        variant='h2'
        mb={2}
        className='fw-bold'
        sx={
          {
            fontSize: {
              md: '3.75rem',
              sm: '3rem',
              xs: '2rem'
            }
          }
        }
      >
        عروض و مسابقات
      </Typography>
      <motion.div 
        initial={
          {opacity: 0, x:80}
        }
        transition={{duration: 1}}
        whileInView= {
          {opacity: 1, x:0}
        }
      >
        <ul className='me-5'>
          <Typography
            variant='h3'
            component='li'
            mb={2}
            className='fw-bold'
            sx={
              {
                fontSize: {
                  md: '3rem',
                  sm: '2.5rem',
                  xs: '1.5rem'
                }
              }
            }
          >
            عروض
          </Typography>
          <Typography
            paragraph
            mb={2}
            className='fw-bold fs-4 text-muted'
            sx={
              {
                fontSize: {
                  md: '2rem',
                  sm: '1rem',
                  xs: '.2rem'
                }
              }
            }
          >
          لا توجد عروض بعد المرجو الانتظار حتى يتحين الموقع
          </Typography>
          <Typography
            variant='h3'
            component='li'
            mb={2}
            className='fw-bold'
            sx={
              {
                fontSize: {
                  md: '3rem',
                  sm: '2.5rem',
                  xs: '1.5rem'
                }
              }
            }
          >
          مسابقات
          </Typography>
          <Typography
            paragraph
            mb={2}
            className='fw-bold fs-4 text-muted'
            sx={
              {
                fontSize: {
                  md: '2rem',
                  sm: '1rem',
                  xs: '.2rem'
                }
              }
            }
          >
            لا توجد مسابقات بعد  المرجو الانتظار حتى يتحين الموقع
          </Typography>
        </ul>
      </motion.div>
    </section>
  );
}

export default OffersAndCompetitions;
