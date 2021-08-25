# Contentful Flexible Content

React field component to use in Contentful UI extensions or Contentful apps.

## Installation

```shell
yet to come
```
[//]: <> (npm install --save @mdk/contentful-flexible-content)

## Usability

```js
import FlexibleContent from '@mdk/contentful-flexible-content';

const App = ({sdk}) => {
  const onChange = value => {
    console.log(value)

  };

  return (
    <FlexibleContent
      sdk={sdk}
      elements={elements}
      columnsPerRow={[ 1, 1, 2, 3, 5, 10 ]}
      onChange={onChange}
    />
  );
};
```

### Options

