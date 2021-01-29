import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
  normal: {
    padding: theme.spacing(0.7),
    textAlign: "center",
    minWidth: 40
  },
  title: {
    fontSize: 13,
    fontWeight: 700
  }
}))

function SensorCard({ name,ratio }){
  const classes = useStyles()

  const getCardColor = (maskedRatio) => {
    if(maskedRatio >= 0.5)
       return "hsl(" + String(maskedRatio * 240 - 120) + ",80%,50%)";
    else
        return "hsl(0, 80%, 50%)";
  }

  const getFontColor = (maskedRatio) => {
      if(maskedRatio >= 0.7)
          return "#2E2E2E";
      else
          return "#FFFFFF";
  }

  return (
    <div>
      <Card 
        className={classes.normal}
        style={{ backgroundColor: getCardColor(ratio), color: getFontColor(ratio)
      }}>
        <Typography className={classes.title} component="p">{name}</Typography>
      </Card>
    </div>
  );
}

export default SensorCard;
