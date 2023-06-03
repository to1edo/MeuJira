import { useContext } from "react";
import type { NextPage } from "next";

import { EntriesContext } from "../context/entries";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { Layout } from "../components/layouts";
import { EntryList, NewEntry } from "../components/ui";

const HomePage: NextPage = () => {
  const { isAdding } = useContext(EntriesContext);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "calc(100vh - 90px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardHeader title={"Pendente"} />

            <NewEntry />

            <CardContent
              sx={{
                flexGrow: "1",
                display: "flex",
                maxHeight: isAdding ? "63%" : "81%",
                '@media (max-width: 899px)': {
                  maxHeight: isAdding ? "76%" : "85%",
                },
              }}
            >
              <EntryList status="pending" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "calc(100vh - 90px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardHeader title={"Em progresso"} />

            <CardContent
              sx={{ flexGrow: "1", display: "flex", maxHeight: "90%" }}
            >
              <EntryList status="in-progress" />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "calc(100vh - 90px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardHeader title={"Completada"} />

            <CardContent
              sx={{ flexGrow: "1", display: "flex", maxHeight: "90%" }}
            >
              <EntryList status="finished" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
