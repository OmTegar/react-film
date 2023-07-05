import React from "react";
import { useLocation } from "react-router-dom";

const BreadcrumbComponent = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter((segment) => segment !== "");

  return (
    <div className="breadcrumb-option">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb__links">
              <a href="/">
                <i className="fa fa-home"></i> Home
              </a>
              {pathSegments.map((segment, index) => {
                const isLastSegment = index === pathSegments.length - 1;
                const linkText = segment.replace(/-/g, " ");
                const linkClass = isLastSegment ? "" : "breadcrumb__links--segment";

                return (
                  <React.Fragment key={index}>
                    {isLastSegment ? (
                      <span>{linkText}</span>
                    ) : (
                      <a href={`/${segment}`} className={linkClass}>
                        {linkText}
                      </a>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbComponent;
