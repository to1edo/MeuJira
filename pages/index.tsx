import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import type { NextPage } from 'next';
import { Layout } from '../components/layouts';
import {EntryList} from '../components/ui/EntryList';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Grid container spacing={2}>

        <Grid item xs={12} md={4} >
          <Card sx={{height:'calc(100vh - 90px)'}}>
            <CardHeader title={'Pendentes'}/>

            <CardContent>
              <EntryList status='pending'/>
            </CardContent>
          </Card>
        </Grid> 

        <Grid item xs={12} md={4}>
          <Card sx={{height:'calc(100vh - 90px)'}}>
            <CardHeader title={'Em progresso'}/>

            <CardContent>
              <EntryList status='in-progress'/>
            </CardContent>
          </Card>
        </Grid> 

        <Grid item xs={12} md={4}>
          <Card sx={{height:'calc(100vh - 90px)'}}>
            <CardHeader title={'Completadas'}/>

            <CardContent>
              <EntryList status='finished'/>
            </CardContent>
          </Card>
        </Grid> 

      </Grid>
    </Layout>
  )
}

export default HomePage;
