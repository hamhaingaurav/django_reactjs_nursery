import { makeStyles } from "@material-ui/core/styles";

import HeaderComponent from "../components/HeaderComponent";
import FooterComponent from "../components/FooterComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function BaseLayout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HeaderComponent classes={classes} />
      {children}
      <FooterComponent classes={classes} />
    </div>
  );
}
