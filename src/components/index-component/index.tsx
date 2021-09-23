import { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "react-query";

import HeaderBar from "../header-bar";
import { useGlobalStore } from "../../util/store";
import { Colors } from "../../util/store";
import { actionCreator, ActionTypes } from "../../util/action";
// import isJson from '../../util/is-json';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      width: "100vw",
      backgroundColor: (prop: Colors) => prop.backgroundColor,
      overflowY: "scroll",
    },
    flexContainer: {
      display: "flex",
      height: "calc(100vh - 10rem)",
      width: "100%",
      justifyContent: "space-between",
      backgroundColor: (prop: Colors) => prop.backgroundColor,
      [theme.breakpoints.down("md")]: {},
    },
    loading: {
      width: "100vw",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: (props: Colors) => props.color,
    },
  })
);

const Basic: FC = ({ children }) => {
  const {
    state: { themeColor },
  } = useGlobalStore();
  const cs = useStyles(themeColor);

  return (
    <Typography component="div" className={cs.root}>
      <CssBaseline />
      <HeaderBar />
      <Typography component="div" className={cs.flexContainer}>
        {children}
      </Typography>
    </Typography>
  );
};

const IndexHome: FC<{ side: JSX.Element; right: JSX.Element }> = ({
  side,
  right,
}) => {
  const {
    state: { themeColor },
    dispatch,
  } = useGlobalStore();
  const cs = useStyles(themeColor);

  const { isLoading, isError } = useQuery(
    "getAllrecord",
    () => {
      return fetch(
        `https://api-ezewholesale.herokuapp.com/api/v1/products?request=buyRequest`,
        {
          headers: {
            Authorization: "Basic anVkanNkc3Vfc29zOTpsZG85ZHNqbnM5OA==",
          },
        }
      ).then((res) => res.json());
    },
    {
      useErrorBoundary: false,
      onSuccess: async (data: any) => {
        let arr: string[] = [];
        try {
          if (!data.status) return;

          const response = await fetch(
            `https://api-ezewholesale.herokuapp.com/api/v1/products/category`,
            {
              headers: {
                Authorization: "Basic anVkanNkc3Vfc29zOTpsZG85ZHNqbnM5OA==",
              },
            }
          );
          const responseJson = await response.json();
          arr = responseJson.data;
        } catch (error) {
          console.log(error);
        }
        dispatch(actionCreator(ActionTypes.CATEGORY_TAGS, arr));
      },
    }
  );

  if (isLoading) {
    return (
      <Basic>
        <Typography className={cs.loading}>Loading Data</Typography>
      </Basic>
    );
  }
  if (isError) {
    return (
      <Basic>
        <Typography className={cs.loading}>An error has occurred</Typography>
      </Basic>
    );
  }
  return (
    <Basic>
      <>
        {side}
        {right}
      </>
    </Basic>
  );
};

export default IndexHome;
