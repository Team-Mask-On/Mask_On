import React, { useState } from "react"
import Typography from "@material-ui/core/Typography"
import InputBase from "@material-ui/core/InputBase"
import { fade, makeStyles } from "@material-ui/core/styles"
import SearchIcon from "@material-ui/icons/Search"
import Card from "@material-ui/core/Card"

const useStyles = makeStyles(theme => ({
    base: {
        position: "fixed",
        zIndex: 1000,
        [theme.breakpoints.up("sm")]: {
            top: theme.spacing(2.5),
            left: theme.spacing(2.5)
        }
    },
    card: {
        backgroundColor: "#84B637",
        color: "#000000",
        padding: theme.spacing(1),
        height: "90px",
        width: "400px",
        textAlign: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: 100
    },
    searchBox: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
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
        color: "inherit",
        width: "100%"
    },
    inputMain: {
        padding: theme.spacing(1, 1, 1, 7),
    }
}))

const SearchBar = ({ onSearch }) => {
    const classes = useStyles()
    const [searchText, setSearchText] = useState("")

    return (
        <div className={classes.base}>
        <Card className={classes.card}>
            <Typography className={classes.title}>마스크 ON</Typography>
            <div className={classes.searchBox}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                placeholder={"지역 및 매장명 검색"}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputMain
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
                onKeyPress={e => {
                    if (e.key === "Enter") {
                        if (searchText !== "") {
                            onSearch(searchText)
                            setSearchText("")
                        } else {
                            alert("검색어를 입력해주세요!");
                        }
                    }
                }}
            />
            </div>
        </Card>
        </div>
    )
}

export default SearchBar