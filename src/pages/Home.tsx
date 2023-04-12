import {
  Alert,
  AlertTitle,
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constants";

const Home = () => {
  const [proxyList, setProxyList] = useState<string>("");
  const [proxyData, setProxyData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorsList, setErrorsList] = useState<any>([]);
  const navigate = useNavigate();
  const placeholderText = `Ragavan, Nimble Pilferer
Soulgorger Orgg
Teferi, Time Raveler
Black Lotus`;

  const ax = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    console.log("Got proxy data: ", proxyData);
    if (proxyData.length > 0 && !loading) {
      console.log("Attempting to navigate...");
      navigate("/proxies", { state: { data: JSON.stringify(proxyData) } });
    }
  }, [proxyData, loading]);

  const getProxyData = async () => {
    setLoading(true);
    const proxyListArray = proxyList.split("\n");
    console.log("PROXY LIST ARRAY: ", proxyListArray);
    await axios
      .all(
        proxyListArray.map((cardName) => {
          return ax.get("/cards/named", {
            params: {
              fuzzy: cardName,
            },
          });
        })
      )
      .then((res) => {
        console.log("RES: ", res);
        setLoading(false);
        setProxyData(res);
      })
      .catch((err) => {
        setHasError(true);
        const errors = errorsList;
        errors.push(err);
        setErrorsList(errors);
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="sm">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {hasError &&
        errorsList.map((error: any) => {
          return (
            <Alert sx={{ mt: 4 }} severity="error">
              <AlertTitle>Error {error.response.data.status}</AlertTitle>
              {error.response.data.details}.
            </Alert>
          );
        })}

      <Card elevation={10} sx={{ minWidth: 275, mt: hasError ? 2 : 4 }}>
        <CardContent>
          <Typography variant="h5">Enter your list of proxies below</Typography>
          <Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">
            Enter the cards you want to proxy, separated by line breaks.
          </Typography>
          <TextField
            value={proxyList}
            onChange={(e) => setProxyList(e.target.value)}
            sx={{ mt: 2 }}
            fullWidth
            placeholder={placeholderText}
            multiline
            rows={6}
          />
        </CardContent>
        <CardActions>
          <Button onClick={() => getProxyData()}>Get Proxies</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Home;
