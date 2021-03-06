import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import ProductDetailsComponent from "./ProductDetailsComponent";
import NoImage from "../../assets/img/oops-no-image.jpg";
import { getPlants } from "../../store/actions/plants";
import { addPlantToCart, removePlantFromCart } from "../../store/actions/cart";
import { createOrder } from "../../store/actions/orders";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    // height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    // flexGrow: 1,
  },
  plant: {
    marginBottom: theme.spacing(5),
  },
}));

function AllPlantsComponent(props) {
  const classes = useStyles();

  const {
    plants,
    cartPlants,
    getPlants,
    addPlantToCart,
    removePlantFromCart,
    createOrder,
    isUiLoading,
  } = props;

  React.useEffect(() => {
    getPlants();
  }, [getPlants]);

  const handleAddPlantToCart = (plantId) => {
    addPlantToCart(plantId);
  };

  const handleRemovePlantFromCart = (plantId) => {
    removePlantFromCart(plantId);
  };

  const handleBuyNow = (plantId) => {
    createOrder([plantId]);
  };

  return (
    <>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5">All Plants</Typography>
          </Grid>
          {plants.map((plant, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              className={classes.plant}
            >
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={plant.image || NoImage}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    ₹ {plant.price}
                  </Typography>
                  <Typography>{plant.name}</Typography>
                </CardContent>
                <CardActions>
                  {cartPlants.includes(plant.id) ? (
                    <Button
                      size="small"
                      color="secondary"
                      fullWidth
                      onClick={() => handleRemovePlantFromCart(plant.id)}
                      disabled={isUiLoading}
                    >
                      Remove from Cart
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      color="secondary"
                      fullWidth
                      onClick={() => handleAddPlantToCart(plant.id)}
                      disabled={isUiLoading}
                    >
                      Add to Cart
                    </Button>
                  )}
                </CardActions>
              </Card>
              <ProductDetailsComponent
                plant={plant}
                buyNow={() => handleBuyNow(plant.id)}
                isUiLoading={isUiLoading}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

AllPlantsComponent.propTypes = {
  plants: PropTypes.array.isRequired,
  cartPlants: PropTypes.array.isRequired,
  addPlantToCart: PropTypes.func.isRequired,
  removePlantFromCart: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
  isUiLoading: PropTypes.bool.isRequired,
};

const matpStateToProps = (state) => ({
  plants: state.plants.plants,
  cartPlants: state.cart.cart.plants,
  isUiLoading: state.ui.isUiLoading,
});

export default connect(matpStateToProps, {
  getPlants,
  addPlantToCart,
  removePlantFromCart,
  createOrder,
})(AllPlantsComponent);
