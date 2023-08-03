import React, { useState } from 'react'
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';


const FAQSection = () => {

    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    };

    return (
        <div className="faq-section my-5">
            <div className='container'>
                <h4 className='text-center faq-title'> <span className='color-pink'>F</span>requently <span className='color-pink'>A</span>sked <span className='color-pink'>Q</span>uestions</h4>
                <Accordion open={open} toggle={toggle}>
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
                </Accordion>
            </div>
        </div>
    )
}

export default FAQSection