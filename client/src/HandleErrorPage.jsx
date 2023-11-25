import { Box, Container, CssBaseline } from '@mui/material';
import {  } from 'react';
import { Helmet } from 'react-helmet';
import Header from './Components/Header';
import Footer from './Components/Footer';

const HandleErrorPage = () => {
  let color = window.localStorage.getItem('mode') === 'dark'? '#fff':'#000';
  let principaleColor = '#B18C50';

  return (
    <>
      <CssBaseline />
      <Container>
        <Helmet>
          <title>إسيل || للهدايا دائما معكم في كل المناسبات</title>
          <meta name="description" content="الصفحة الرئيسية" />
        </Helmet>
        <Header />

        <div className='error-page' style={{
          display: 'grid',
          placeItems: 'center',
          height: 300,
        }}>
          <Box
            component='h3'
            className='fw-bold'
            sx= {
              {
                color: color,
              }
            }
          >
            عفوا! لم نستطع العثور على الصفحة أو العنصر الذي تبحث عنه المرجو
            <a href="" className='fs-3' style={{color: principaleColor}}> إعادة تحميل الصفحة </a> 
            أو العودة إلى
            <a href='/' className='fs-3' style={{color: principaleColor}}> الصفحة الرئيسية</a> 
          </Box>
        </div>

        <Footer />
      </Container>
    </>
  );
}

export default HandleErrorPage;
