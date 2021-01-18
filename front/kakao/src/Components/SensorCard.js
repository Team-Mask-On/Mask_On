import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import { grey, green, amber, red } from "@material-ui/core/colors"

const useStyles = makeStyles(theme => ({
  normal: {
    padding: theme.spacing(0.7),
    color: "#fff",
    textAlign: "center",
    minWidth: 40
  },
  title: {
    fontSize: 13,
    fontWeight: 700
  }
}))

function SensorCard(props){
  const name = props.name;
  const classes = useStyles()
  const cardColor = green[700];

  return (
    <div>
      <Card 
        className={classes.normal}
        style={{ backgroundColor: cardColor, color: grey[100] 
      }}>
        <Typography className={classes.title} component="p">{name}</Typography>
      </Card>
    </div>
  );
}

export default SensorCard;
