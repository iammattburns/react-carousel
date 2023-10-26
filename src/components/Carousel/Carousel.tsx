import React, { Children, useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { CarouselProvider, useCarouselContext } from './Carousel.context'

export type IndicatorButtonTypes = 'dot' | 'line'

export interface CarouselProps {
  /** <Carousel.Slide /> components */
  children?: React.ReactNode

  className?: string

  /** Called when user clicks next button */
  onNextSlide?(): void

  /** Called when user clicks previous button */
  onPreviousSlide?(): void

  /** Called with slide index when slide changes */
  onSlideChange?(index: number): void

  /** Determines whether indicators should be displayed, false by default */
  withIndicators?: boolean

  /** The type of indicator */
  indicatorType?: IndicatorButtonTypes

  /** Determines whether next/previous controls should be displayed, true by default */
  withControls?: boolean

  /** Slides container height, required for vertical orientation */
  height?: React.CSSProperties['height']

  renderNextControl?: (props: { onClick: () => void }) => React.ReactNode
}

interface StyledCarouselProps {
  /** Slides container height, required for vertical orientation */
  height?: React.CSSProperties['height']
}

interface CarouselSlideProps {
  children?: React.ReactNode
}

type CarouselSubComponents = {
  Slide: React.FC<CarouselSlideProps>
  SlideIndicators: React.FC
  SlideControls: React.FC<SlideControlsPropType>
}

const StyledCarousel = styled.div<StyledCarouselProps>(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
)

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`

const ContentWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`

const Content = styled.div<StyledCarouselProps>(
  ({ height }) => css`
    display: flex;

    transition: all 250ms linear;
    -ms-overflow-style: none; /* hide scrollbar in IE and Edge */
    scrollbar-width: none; /* hide scrollbar in Firefox */
    height: ${height};
    &::-webkit-scrollbar {
      display: none;
    }

    > * {
      width: 100%;
      flex-shrink: 0;
      flex-grow: 1;
      display: flex;
    }
  `,
)

const ButtonPrevious = styled.button`
  background-color: transparent;
  border: none;
  background-color: transparent;
  position: absolute;
  cursor: pointer;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  left: 24px;
  svg {
    width: 24px;
    height: 24px;
  }
`

const ButtonNext = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  right: 24px;
  svg {
    width: 24px;
    height: 24px;
  }
`

const Indicators = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 24px;
  left: 0;
  right: 0;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  gap: 12px;
`

interface IndicatorButtonProps {
  indicatorType?: IndicatorButtonTypes
  currentSlide?: boolean
}

const IndicatorButton = styled.button<IndicatorButtonProps>(
  ({ indicatorType = 'dot', currentSlide }) => css`
    display: block;
    background-color: ${currentSlide ? '#000807' : '#A2A3BB'};
    border-radius: 100%;
    cursor: pointer;
    ${(() => {
      switch (indicatorType) {
        case 'dot':
          return css`
            width: 8px;
            height: 8px;
            border: none;
            padding: 0;
            @media (max-width: 768px) {
              width: 10px;
              height: 10px;
            }
          `
        case 'line':
          return css`
            width: 32px;
            height: 6px;
            border-radius: 6px;
            border: none;
            padding: 0;
            @media (max-width: 768px) {
              width: 40px;
              height: 8px;
              border-radius: 8px;
            }
          `
        default:
          throw new Error(
            `Missing indicator type variant styles for ${indicatorType}.`,
          )
      }
    })()}
  `,
)

const StyledCarouselSlide = styled.div(
  () => `

  @media (max-width: 768px) {

        }
    `,
)

const CarouselSlide: React.FC<CarouselSlideProps> = ({ children }) => {
  return <StyledCarouselSlide>{children}</StyledCarouselSlide>
}

export const SlideIndicators: React.FC = () => {
  const { currentSlide, slidesCount, setCurrentSlide } = useCarouselContext()

  return (
    <>
      {Array(slidesCount)
        .fill(0)
        .map((_, index) => (
          <IndicatorButton
            key={index}
            data-active={index === currentSlide || undefined}
            aria-hidden
            tabIndex={-1}
            onClick={() => setCurrentSlide(index)}
            currentSlide={index === currentSlide}
          />
        ))}
    </>
  )
}

interface SlideControlsPropType {
  nextControl: React.ReactElement
  previousControl: React.ReactElement
}

export const SlideControls: React.FC<SlideControlsPropType> = ({
  nextControl,
  previousControl,
}) => {
  const { currentSlide, slidesCount, scrollNext, scrollPrevious } =
    useCarouselContext()

  if (nextControl && previousControl) {
    const NextControl = (): React.ReactElement =>
      React.cloneElement(nextControl, {
        onClick: () => scrollNext(),
        disabled: currentSlide >= slidesCount - 1,
      })
    const PreviousControl = (): React.ReactElement =>
      React.cloneElement(previousControl, {
        onClick: () => scrollPrevious(),
        disabled: currentSlide === 0,
      })

    return (
      <>
        <PreviousControl />
        <NextControl />
      </>
    )
  }
  return (
    <>
      {currentSlide > 0 && (
        <ButtonPrevious onClick={scrollPrevious}>Previous</ButtonPrevious>
      )}
      {currentSlide < slidesCount - 1 && (
        <ButtonNext onClick={scrollNext}>Next</ButtonNext>
      )}
    </>
  )
}

export const Carousel: React.FC<CarouselProps> & CarouselSubComponents = ({
  children,
  className,
  withIndicators,
  withControls,
  indicatorType,
  height,
  onNextSlide,
  onPreviousSlide,
  onSlideChange,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesCount, setSlidesCount] = useState(Children.count(children))
  const [touchPosition, setTouchPosition] = useState(0)

  // Set the length to match current children from props
  useEffect(() => {
    setSlidesCount(Children.count(children))
  }, [children])

  const scrollNext = useCallback(() => {
    if (currentSlide < slidesCount - 1) {
      setCurrentSlide(prevState => prevState + 1)
      onNextSlide?.()
    }
  }, [currentSlide, onNextSlide, slidesCount])

  const scrollPrevious = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prevState => prevState - 1)
      onPreviousSlide?.()
    }
  }, [currentSlide, onPreviousSlide])

  const scrollTo = useCallback(
    (index: number) => {
      setCurrentSlide(index)
      onSlideChange?.(index)
    },
    [onSlideChange],
  )

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchDown = e.touches[0].clientX
    setTouchPosition(touchDown)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchDown = touchPosition

    if (touchDown === 0) {
      return
    }

    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch

    if (diff > 5) {
      scrollNext()
    }

    if (diff < -5) {
      scrollPrevious()
    }

    setTouchPosition(0)
  }

  const indicators = Array(slidesCount)
    .fill(0)
    .map((_, index) => (
      <IndicatorButton
        key={index}
        data-active={index === currentSlide || undefined}
        aria-hidden
        tabIndex={-1}
        onClick={() => scrollTo(index)}
        currentSlide={index === currentSlide}
        indicatorType={indicatorType}
      />
    ))

  return (
    <CarouselProvider
      value={{
        currentSlide,
        setCurrentSlide,
        slidesCount,
        scrollNext,
        scrollPrevious,
        scrollTo,
      }}
    >
      <StyledCarousel className={className}>
        <Wrapper>
          {withControls && currentSlide > 0 && (
            <ButtonPrevious onClick={scrollPrevious}>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M14 18L8 12L14 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonPrevious>
          )}
          <ContentWrapper
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <Content
              height={height}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {children}
            </Content>
          </ContentWrapper>
          {withControls && currentSlide < slidesCount - 1 && (
            <ButtonNext onClick={scrollNext}>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M10 18L16 12L10 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ButtonNext>
          )}
          {withIndicators && <Indicators>{indicators}</Indicators>}
        </Wrapper>
      </StyledCarousel>
    </CarouselProvider>
  )
}

Carousel.Slide = CarouselSlide
Carousel.SlideIndicators = SlideIndicators
Carousel.SlideControls = SlideControls
