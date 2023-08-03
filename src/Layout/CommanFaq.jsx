import React from "react";

const CommanFaq = () => {
  return (
    <div className="container faq-section mt-5">
      <div className="container">
        <h4 className="text-center faq-title">
          <span className="color-pink">F</span>requently
          <span className="color-pink">A</span>sked
          <span className="color-pink">Q</span>uestions
        </h4>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Why should i choose Flyses?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Lorem ipsum dolor sit amet consectetur. A ac lorem massa
                pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra
                eleifend pretium donec in egestas sit. Est cras vitae
                sollicitudin purus mi eu massa sodales.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                How does it work?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Lorem ipsum dolor sit amet consectetur. A ac lorem massa
                pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra
                eleifend pretium donec in egestas sit. Est cras vitae
                sollicitudin purus mi eu massa sodales.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                How can i believe on flyses before payment?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Lorem ipsum dolor sit amet consectetur. A ac lorem massa
                pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra
                eleifend pretium donec in egestas sit. Est cras vitae
                sollicitudin purus mi eu massa sodales.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                How will this help to grow my business?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Lorem ipsum dolor sit amet consectetur. A ac lorem massa
                pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra
                eleifend pretium donec in egestas sit. Est cras vitae
                sollicitudin purus mi eu massa sodales.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFive">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                Can i get my refund if i am not satisfied with work?
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="headingFive"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Lorem ipsum dolor sit amet consectetur. A ac lorem massa
                pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra
                eleifend pretium donec in egestas sit. Est cras vitae
                sollicitudin purus mi eu massa sodales.
              </div>
            </div>
          </div>
        </div>
        {/* <Accordion open={open} toggle={toggle}>
<AccordionItem>
<AccordionHeader targetId="1">Why should i choose Flyses?</AccordionHeader>
<AccordionBody accordionId="1">
Lorem ipsum dolor sit amet consectetur. A ac lorem massa pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra eleifend pretium donec in egestas sit. Est cras vitae sollicitudin purus mi eu massa sodales.
</AccordionBody>
</AccordionItem>
<AccordionItem>
<AccordionHeader targetId="2">How does it work?</AccordionHeader>
<AccordionBody accordionId="2">
Lorem ipsum dolor sit amet consectetur. A ac lorem massa pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra eleifend pretium donec in egestas sit. Est cras vitae sollicitudin purus mi eu massa sodales.
</AccordionBody>
</AccordionItem>
<AccordionItem>
<AccordionHeader targetId="3">How can i believe on flyses before payment? </AccordionHeader>
<AccordionBody accordionId="3">
Lorem ipsum dolor sit amet consectetur. A ac lorem massa pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra eleifend pretium donec in egestas sit. Est cras vitae sollicitudin purus mi eu massa sodales.
</AccordionBody>
</AccordionItem>
<AccordionItem>
<AccordionHeader targetId="4">How will this help to grow my business? </AccordionHeader>
<AccordionBody accordionId="4">
Lorem ipsum dolor sit amet consectetur. A ac lorem massa pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra eleifend pretium donec in egestas sit. Est cras vitae sollicitudin purus mi eu massa sodales.
</AccordionBody>
</AccordionItem>
<AccordionItem>
<AccordionHeader targetId="5">Can i get my refund if i am not satisfied with work? </AccordionHeader>
<AccordionBody accordionId="5">
Lorem ipsum dolor sit amet consectetur. A ac lorem massa pellentesque sit tellus ac. Arcu mauris mauris quam sed. Viverra eleifend pretium donec in egestas sit. Est cras vitae sollicitudin purus mi eu massa sodales.
</AccordionBody>
</AccordionItem>
</Accordion> */}
      </div>
    </div>
  );
};

export default CommanFaq;
