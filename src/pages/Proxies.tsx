import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Proxies = () => {
  const { state } = useLocation();
  // We need to factor in MDFC's, adventure cards, and split cards
  const parsedProxyData = JSON.parse(state.data).map((proxy: any) => {
    return {
      cardName: proxy.data.name,
      manaCost: proxy.data.mana_cost,
      typeLine: proxy.data.type_line,
      oracleText: proxy.data.oracle_text,
      power: proxy.data.power,
      toughness: proxy.data.toughness,
    };
  });
  console.log("PARSED PROXY DATA: ", parsedProxyData);
  //   const data = location;
  if (!parsedProxyData || parsedProxyData.length === 0) {
    return (
      <Container maxWidth="sm">
        <Grid justifyContent={"center"} container spacing={2} sx={{ mt: 2 }}>
          <Grid item>
            <Typography variant="h5">
              No proxies found! Return to <Link to="/">the home page</Link>.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1, maxWidth: "50%" }}>
        <h1>Proxies</h1>
        <p>Here are your proxies:</p>
        <Grid container spacing={0}>
          {parsedProxyData.map((proxy: any) => {
            return (
              <Grid item xs={4}>
                <h2>{proxy.cardName}</h2>
                <p>{proxy.manaCost}</p>
                <p>{proxy.typeLine}</p>
                <p>{proxy.oracleText}</p>
                <p>{proxy.power}</p>
                <p>{proxy.toughness}</p>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  }
};

export default Proxies;
