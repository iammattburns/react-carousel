import { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { Carousel } from './Carousel'

export default {
  component: Carousel,
} as Meta<typeof Carousel>

const Template: StoryFn<typeof Carousel> = args => (
  <Carousel {...args}>
    <Carousel.Slide>
      <div
        style={{
          backgroundColor: '#B3B7EE',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '120px',
          color: 'white',
        }}
      >
        Slide 1
      </div>
    </Carousel.Slide>
    <Carousel.Slide>
      <div
        style={{
          backgroundColor: '#9395D3',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '120px',
          color: 'white',
        }}
      >
        Slide 2
      </div>
    </Carousel.Slide>
    <Carousel.Slide>
      <div
        style={{
          backgroundColor: '#C9ADFF',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '120px',
          color: 'white',
        }}
      >
        Slide 3
      </div>
    </Carousel.Slide>
  </Carousel>
)

export const Default = Template.bind({})
Default.args = {
  height: '400px',
  withIndicators: true,
  withControls: true,
  indicatorType: 'dot',
}
