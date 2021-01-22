import React, { useState } from "react"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import { fade, makeStyles } from "@material-ui/core/styles"
import SearchIcon from "@material-ui/icons/Search"
import Card from "@material-ui/core/Card"

const useStyles = makeStyles(theme => ({
    normal: {
        padding: theme.spacing(1),
        height: "100px",
        width: "500px",
        textAlign: "center"
    },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",  width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}))

const SearchBar = ({ onSearch }) => {
  const classes = useStyles()
  const [searchText, setSearchText] = useState("")

  const title = "마스크 ON"
  const searchPlaceholder = "건물, 지역 검색..."

  return (
    <div className={classes.root}>
        <Card
            className={classes.normal}
            style={{ backgroundColor: "#84B637", color: "#000000"
        }}>
            <div>
                <Typography className={classes.title} variant="h6" noWrap>
                    {title}
                </Typography>
            </div>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase
                placeholder={searchPlaceholder}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
                onKeyPress={e => {
                    const enterPressed = e.charCode === 13
                    if (enterPressed) {
                    onSearch(searchText)
                    e.target.blur();
                    }
                }}
                />
            </div>
        </Card>
    </div>
  )
}

SearchBar.defaultProps = {
  onSearch: () => {}
}

export default SearchBar
