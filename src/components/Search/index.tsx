import React from "react";
import { MessageErr, NotFoundContent, Spiner } from "../Message/Notification";
import MVLink from "../Location/Link";
const SearchResults = ({ data: { doc, isError, isLoading } }: any) => {
  if (isLoading) {
    return (
      <Spiner
        size={undefined}
        children={undefined}
      />
    );
  }
  if (isError) {
    return <MessageErr />;
  }
  return (
    <div style={{ height: "100%" }}>
      <div className="container">
        {doc ? (
          doc.map((item: any, index: any) => (
            <div style={{ padding: "20px 0" }} key={index}>
              <div className="searhValue" key={index}>
                <MVLink to={"/q/" + item._id}>
                  <div className="searchValueImg">
                    <img
                      src={item.linkImg}
                      style={{ borderRadius: "5px" }}
                      alt={item.name}
                      loading="lazy"
                    />
                  </div>
                </MVLink>
                <MVLink to={"/q/" + item._id}>
                  <div className="des">
                    {item.name}
                    <p>{item.updatedAt}</p>
                    <p>{item.sumSeri}</p>
                  </div>
                </MVLink>
              </div>
            </div>
          ))
        ) : (
          <NotFoundContent />
        )}
      </div>
    </div>
  );
};

export default SearchResults;
