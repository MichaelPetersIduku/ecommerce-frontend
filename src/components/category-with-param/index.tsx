import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { FC, memo } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import LoadingComponent from "../loading-component";
import LoadingError from "../loading-error";
import PhoneCard from "../phone-card";
import NoResultFound from "../no-result-found";
import { useGlobalStore, PageTitle } from "../../util/store";
import { actionCreator, ActionTypes } from "../../util/action";
import isJson from "../../util/is-json";
import { selectImage } from "../image-decider";

type Prop = {
  type: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
    },
    loading: {
      width: "100%",
      backgroundColor: "#fff",
      height: "1.5rem",
    },
  })
);

const errorText = "We do not have your phone of choice yet!";

const CategoryParam: FC<Prop> = ({ type }) => {
  const cs = useStyles();
  const {
    state: { categoryTags, currentDisplay, pageTitle },
    dispatch,
  } = useGlobalStore();
  const { isLoading, error, data } = useQuery(
    ["getCategory", type],
    () => {
      if (pageTitle !== PageTitle.CATEGORY) {
        dispatch(actionCreator(ActionTypes.PAGE_TITLE, PageTitle.CATEGORY));
        dispatch(actionCreator(ActionTypes.RESET_CURRENT_DISPLAY));
        dispatch(actionCreator(ActionTypes.RESET_ALL_RES));
      }
      if (!categoryTags.includes(type)) return Promise.reject(errorText);
      return fetch(
        `https://api-ezewholesale.herokuapp.com/api/v1/products/search?category=${type}&request=buyRequest`,
        {
          headers: {
            Authorization: "Basic anVkanNkc3Vfc29zOTpsZG85ZHNqbnM5OA==",
          },
        }
      ).then((res) => {
        return res.json();
      });
    },
    {
      onSuccess: (data: any) => {
        console.log(data);
        data = isJson(data);
        if (!data.status) return;
        dispatch(actionCreator(ActionTypes.ALL_RES, data.data));
        dispatch(actionCreator(ActionTypes.CURRENT_DISPLAY, data.data));
        dispatch(actionCreator(ActionTypes.PAGINATOR, isJson(data.data)));
      },
    }
  );

  return (
    <div className={cs.root}>
      {isLoading ? (
        <LoadingComponent
          title={`Searching for ${type}`}
          height="100%"
          width="100%"
        />
      ) : error ? (
        <LoadingError
          title={error === errorText ? errorText : " Could not load Resource."}
        />
      ) : data.error ? (
        <LoadingError title={data.error} />
      ) : currentDisplay.length ? (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{type}</title>
            <link rel="icon" href={selectImage(type)} />
          </Helmet>
          {currentDisplay.map((item, i) => {
            return (
              <PhoneCard
                key={i}
                productName={item.productName}
                size={item.size}
                condition={item.condition}
                price={item.price}
              />
            );
          })}
        </>
      ) : (
        <NoResultFound />
      )}
    </div>
  );
};

const CategoryWithParam = memo(CategoryParam);

export default CategoryWithParam;
