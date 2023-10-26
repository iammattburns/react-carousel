import React from "react";
import { Carousel, CarouselProps } from "..";
import { itIsAccessible, itRendersChildren, renderWithTheme, itSupportsClassName } from "../../../tests";

const defaultProps: CarouselProps = {};

describe("Carousel", () => {
    itRendersChildren(Carousel, defaultProps);
    itSupportsClassName(Carousel, defaultProps);
    itIsAccessible(Carousel, defaultProps);

    test("Renders the Carousel component", () => {
        renderWithTheme(<Carousel {...defaultProps}>Et duis nulla enim incididunt minim.</Carousel>);
    });
});
