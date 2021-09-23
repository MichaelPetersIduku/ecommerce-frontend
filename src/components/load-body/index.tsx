import Typography from "@material-ui/core/Typography";
import { lazy, Suspense } from "react";
import { useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { actionCreator, ActionTypes } from "../../util/action";
import LoadingComponent from "../loading-component";
import Modal from "../modal";
import ModalChild from "../modal-child";
import LoadingIphones from "../loading-iphones";
import { useGlobalStore } from "../../util/store";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "75%",
      justifyContent: "space-around",
      // paddingRight: theme.spacing(),
      flexWrap: "wrap",
      marginBottom: theme.spacing(5),
      [theme.breakpoints.down("md")]: {
        width: "100%",
        justifyContent: "space-around",
      },
    },
    loadIphones: {
      backgroundColor: "#007ee5",
      color: "#fff",
    },
  })
);

const Search = lazy(() => import("../search"));
const Category = lazy(() => import("../category"));
const HomeComponent = lazy(() => import("../home-component"));
const NoPage = lazy(() => import("../no-page"));

const src =
  "https://res.cloudinary.com/thronetechnologies/image/upload/c_scale,h_200,w_200/v1622142723/Iphones/IphoneGroup_boubqr.webp";

const LoadBody = () => {
  const {
    state: { page },
    dispatch,
  } = useGlobalStore();
  const cs = useStyles();
  const {
    state: { showModal },
  } = useGlobalStore();
  const searchPath = useRouteMatch({
    path: "/search",
    exact: true,
    strict: true,
  });
  const homePath = useRouteMatch({
    path: "/",
    exact: true,
    strict: true,
  });
  const categoryPath = useRouteMatch({
    path: "/category",
    exact: true,
    strict: true,
  });
  const categoryPathWithParam = useRouteMatch({
    path: "/category/:type",
    exact: true,
    strict: true,
  });

  const loadBuyRequest = async () => {
    console.log("LOADING Buy REQUEST");
    // setRequest("sellRequest");
    try {
      const response = await fetch(
        `http://localhost:4321/api/v1/products?request=buyRequest&page=${
          page + 1
        }&limit=20`,
        {
          headers: {
            Authorization: "Basic anVkanNkc3Vfc29zOTpsZG85ZHNqbnM5OA==",
          },
        }
      );
      const responseJson = await response.json();
      const { status, data } = responseJson;
      console.log(responseJson);
      if (!status) return;
      dispatch(actionCreator(ActionTypes.RESET_ALL_RES));
      dispatch(actionCreator(ActionTypes.RESET_CURRENT_DISPLAY));
      dispatch(actionCreator(ActionTypes.HOME_CURRENT_DISPLAY, data.docs));
      dispatch(actionCreator(ActionTypes.HOME_ALL_RES, data.docs));
      dispatch(actionCreator(ActionTypes.HOME_CURRENT_DISPLAY, data.docs));
      dispatch(actionCreator(ActionTypes.PAGINATOR, data));
      dispatch(actionCreator(ActionTypes.STOP_LOADING_MORE_PAGE));
    } catch (error) {
      console.log(error);
    }
  };

  const loadSellRequest = async () => {
    console.log("LOADING SELL REQUEST");
    // setRequest("sellRequest");
    try {
      const response = await fetch(
        `http://localhost:4321/api/v1/products?request=sellRequest&page=${
          page + 1
        }&limit=20`,
        {
          headers: {
            Authorization: "Basic anVkanNkc3Vfc29zOTpsZG85ZHNqbnM5OA==",
          },
        }
      );
      const responseJson = await response.json();
      const { status, data } = responseJson;
      console.log(responseJson);
      if (!status) return;
      dispatch(actionCreator(ActionTypes.RESET_ALL_RES));
      dispatch(actionCreator(ActionTypes.RESET_CURRENT_DISPLAY));
      dispatch(actionCreator(ActionTypes.HOME_CURRENT_DISPLAY, data.docs));
      dispatch(actionCreator(ActionTypes.HOME_ALL_RES, data.docs));
      dispatch(actionCreator(ActionTypes.PAGINATOR, data));
      dispatch(actionCreator(ActionTypes.STOP_LOADING_MORE_PAGE));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Typography component="div" className={cs.root}>
      <Helmet>
        <link rel="icon" href={src} />
      </Helmet>
      {searchPath !== null ? (
        <Suspense
          fallback={
            <LoadingComponent
              width="100%"
              height="100%"
              title="Loading search..."
            />
          }
        >
          <Search />
        </Suspense>
      ) : homePath !== null ? (
        <Suspense
          fallback={
            <LoadingComponent
              width="100%"
              height="100%"
              title="Collecting data ..."
            />
          }
        >
          <Button
            variant="contained"
            className={cs.loadIphones}
            onClick={loadBuyRequest}
          >
            Load Buy Request Data
          </Button>{" "}
          <Button
            variant="contained"
            className={cs.loadIphones}
            onClick={loadSellRequest}
          >
            Load Sell Request Data
          </Button>
          <HomeComponent />
        </Suspense>
      ) : categoryPath !== null ? (
        <Suspense
          fallback={
            <LoadingComponent width="100%" height="100%" title="Loading data" />
          }
        >
          <Category type={null} />
        </Suspense>
      ) : categoryPathWithParam ? (
        <Suspense
          fallback={
            <LoadingComponent width="100%" height="100%" title="Loading data" />
          }
        >
          <Category type={categoryPathWithParam.params} param={true} />
        </Suspense>
      ) : (
        <Suspense fallback={<></>}>
          <NoPage />
        </Suspense>
      )}
      {showModal && (
        <Modal>
          <ModalChild>
            <LoadingIphones />
          </ModalChild>
        </Modal>
      )}
    </Typography>
  );
};

export default LoadBody;
