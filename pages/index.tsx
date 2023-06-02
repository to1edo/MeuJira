import { Card, CardHeader, Grid } from '@mui/material';
import type { NextPage } from 'next';
import { Layout } from '../components/layouts';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Grid container spacing={2}>

        <Grid item xs={12} md={4} >
          <Card sx={{height:'calc(100vh - 90px)'}}>
            <CardHeader title={'Pendentes'}/>
          </Card>
        </Grid> 

        <Grid item xs={12} md={4}>
          <Card sx={{height:'calc(100vh - 90px)'}}>
            <CardHeader title={'Em progresso'}/>
          </Card>
        </Grid> 

        <Grid item xs={12} md={4}>
          <Card sx={{height:'calc(100vh - 90px)'}}>
            <CardHeader title={'Completadas'}/>
          </Card>
        </Grid> 

      </Grid>
    </Layout>
  )
}

export default HomePage;
