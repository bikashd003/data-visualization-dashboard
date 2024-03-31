import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { DataContext, DataContextType } from "../Context/ContextStore";

const Cards = () => {
  const context = useContext(DataContext) as DataContextType;
  const { totalProducts, topThreeProducts } = context;
  const theme = useTheme();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5vw",
          flexWrap: "wrap",
        }}
      >
        <Card
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            padding: theme.spacing(2),
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Total Products
            </Typography>
            <Typography variant="h4">{totalProducts || 0}</Typography>
          </CardContent>
        </Card>
        {topThreeProducts?.map((product, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              padding: theme.spacing(2),
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                Top Product {index + 1}
              </Typography>
              <Typography variant="body1">{product.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Cards;