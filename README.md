# React Carousel

React Carousel is a lightweight and customizable carousel component for React applications.

### Installation

You can install React Carousel using npm:

```bash
npm install @iammattburns/react-carousel
```

### Usage
To use React Carousel, import the component and render it with your desired configuration:

```bash
import React from 'react';
import Carousel from 'react-carousel';

const MyCarousel = () => {
  return (
    <Carousel>
      <img src="image1.jpg" alt="Image 1" />
      <img src="image2.jpg" alt="Image 2" />
      <img src="image3.jpg" alt="Image 3" />
    </Carousel>
  );
};

export default MyCarousel;
```

### Props

React Carousel accepts the following props:

- `autoplay`: boolean - Whether the carousel should autoplay (default: `false`)
- `autoplaySpeed`: number - The speed at which the carousel should autoplay (default: `3000`)
- `dots`: boolean - Whether to show navigation dots (default: `true`)
- `infinite`: boolean - Whether to enable infinite looping (default: `true`)
- `speed`: number - The speed of the carousel animation (default: `500`)
- `slidesToShow`: number - The number of slides to show at once (default: `1`)
- `slidesToScroll`: number - The number of slides to scroll at once (default: `1`)

## License

React Carousel is licensed under the MIT License.