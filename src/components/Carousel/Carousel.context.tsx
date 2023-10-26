import React, { createContext, useContext } from "react";

function CarouselContext() {
    type CarouselContextProps = {
        slidesCount: number;
        currentSlide: number;
        setCurrentSlide: (index: number) => void;
        scrollNext: () => void;
        scrollPrevious: () => void;
        scrollTo: (index: number) => void;
    };

    const Context = createContext<CarouselContextProps>({
        slidesCount: 0,
        currentSlide: 0,
        setCurrentSlide: () => {},
        scrollNext: () => {},
        scrollPrevious: () => {},
        scrollTo: () => {},
    });

    const useCarouselContext = () => {
        return useContext(Context);
    };

    const CarouselProvider = ({ children, value }: { value: CarouselContextProps; children: React.ReactNode }) => (
        <Context.Provider value={value}>{children}</Context.Provider>
    );

    return [CarouselProvider, useCarouselContext] as const;
}

export const [CarouselProvider, useCarouselContext] = CarouselContext();
