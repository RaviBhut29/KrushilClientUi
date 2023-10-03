import "./App.css";
import RouterComp from "./Routes/Routes";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import MetaComponent from "./MetaComponent";
import { useEffect, useState } from "react";

function App() {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "Flyses",
    alternateName: "Flyses",
    url: "https://flyses.com/",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://flyses.com/{search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
  let data = {
    "@context": "http://schema.org/",
    "@type": "Review",
    itemReviewed: {
      "@type": "Thing",
      name: "Flyses",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "4",
      bestRating: "5",
    },
    publisher: {
      "@type": "Organization",
      name: "Flyses",
    },
  };

  return (
    <>
      <RouterComp />
      <MetaComponent
        jsonLd={data}
        title={"Flyses"}
        description={"Designing, Branding, Experiences and Connecting"}
      />
    </>
  );
}

export default App;
