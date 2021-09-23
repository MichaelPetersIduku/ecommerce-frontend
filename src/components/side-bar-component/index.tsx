import { FC } from "react";
import { useHistory } from "react-router";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { Colors, LoadIphoneEnum, useGlobalStore } from "../../util/store";
import SliderComponent from "../slider-component";
import Storage from "../storage";
import RadioButton from "../radio-buttons";

import { actionCreator, ActionTypes } from "../../util/action";

type SideBarProps = {
  modal: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: (prop: Colors) => prop.cardBg,
      color: (prop: Colors) => prop.cardFontColor,
      paddingBottom: theme.spacing(3),
      "& .MuiSlider-colorSecondary": {
        color: "#fff",
      },
      "& .MuiSlider-thumbColorSecondary": {
        color: "red",
      },
      "& .MuiSlider-valueLabel": {
        color: "red",
      },
    },
    list: {},
    header: {
      color: (prop: Colors) => prop.cardFontColor,
    },
    listCategory: {
      paddingLeft: theme.spacing(4),
    },
    listText: {
      fontSize: "0.7rem",
    },
    price: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      padding: theme.spacing(3),
      alignItems: "center",
    },
    priceRange: {
      width: "80%",
    },
    priceFilter: {
      width: "100%",
    },
    themes: {
      marginTop: "2rem",
    },
    loadIphoneContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: theme.spacing(2),
      borderTop: "1px solid #ddd",
      marginBottom: theme.spacing(3),
      paddingTop: theme.spacing(4),
    },
    loadIphones: {
      backgroundColor: "#007ee5",
      color: "#fff",
    },
  })
);

const SideBarComponent: FC<SideBarProps> = ({ modal }) => {
  const {
    state: { themeColor, categoryTags },
    dispatch,
  } = useGlobalStore();
  const cs = useStyles(themeColor);
  const history = useHistory();

  const changeLoc = (item: string) => {
    history.push(`/category/${item.toLowerCase()}`);
    if (modal) dispatch(actionCreator(ActionTypes.CLOSE));
  };

  const loadBuyRequest = async () => {
    try {
      dispatch(actionCreator(ActionTypes.SHOW_MODAL));
      if (modal) dispatch(actionCreator(ActionTypes.CLOSE));
      const data = await fetch(
        `https://api-ezewholesale.herokuapp.com/api/v1/googlesheet/runScript?scriptToRun=buyRequestScript`,
        {
          headers: {
            Authorization: "Basic anVkanNkc3Vfc29zOTpsZG85ZHNqbnM5OA==",
          },
          method: "POST",
        }
      );
      console.log(data);
      dispatch(
        actionCreator(ActionTypes.LOAD_IPHONE_ERROR, LoadIphoneEnum.SUCCESS)
      );
    } catch (e) {
      dispatch(
        actionCreator(ActionTypes.LOAD_IPHONE_ERROR, LoadIphoneEnum.FAILED)
      );
    }
  };

  const loadSellRequest = async () => {
    try {
      dispatch(actionCreator(ActionTypes.SHOW_MODAL));
      if (modal) dispatch(actionCreator(ActionTypes.CLOSE));
      const data = await fetch(
        `https://api-ezewholesale.herokuapp.com/api/v1/googlesheet/runScript?scriptToRun=sellRequestScript`,
        {
          headers: {
            Authorization: "Basic anVkanNkc3Vfc29zOTpsZG85ZHNqbnM5OA==",
          },
          method: "POST",
        }
      );
      console.log(data);
      dispatch(
        actionCreator(ActionTypes.LOAD_IPHONE_ERROR, LoadIphoneEnum.SUCCESS)
      );
    } catch (e) {
      dispatch(
        actionCreator(ActionTypes.LOAD_IPHONE_ERROR, LoadIphoneEnum.FAILED)
      );
    }
  };

  return (
    <Typography component="div" className={cs.root}>
      <List className={cs.list} aria-labelledby="nested-list-subheader">
        <ListItem className={cs.header}>
          <ListItemText className={cs.listText}>Category</ListItemText>
        </ListItem>
        {categoryTags.map((item, i) => (
          <ListItem
          style={{borderBottom: "2px solid"}}
            button
            className={cs.listCategory}
            key={i}
            onClick={() => changeLoc(item)}
          >
            <ListItemText className={cs.listText}>{item}</ListItemText>
          </ListItem>
        ))}
      </List>
      <SliderComponent />
      <Storage title="Storage">
        <RadioButton />
      </Storage>
      <Typography className={cs.loadIphoneContainer} component="div">
        <Button
          variant="contained"
          className={cs.loadIphones}
          onClick={loadBuyRequest}
        >
          Load Buy Request Script
        </Button>
      </Typography>
      <Typography className={cs.loadIphoneContainer} component="div">
        <Button
          variant="contained"
          className={cs.loadIphones}
          onClick={loadSellRequest}
        >
          Load Sell Request Script
        </Button>
      </Typography>
      <Typography className={cs.loadIphoneContainer} component="div">
        <div>
          <a style={{color: "white"}} href="https://docs.google.com/spreadsheets/d/1StAjRtad7E1KeuEV0-QNUCxt6QeBtj-G7YSQRwSZTmk">View Spreadsheet Data</a>
        </div>
      </Typography>
    </Typography>
  );
};

export default SideBarComponent;
