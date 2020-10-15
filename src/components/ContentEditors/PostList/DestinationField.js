import React from 'react';
import PropTypes from 'prop-types';
import { Pill, Subheading } from '@contentful/forma-36-react-components';
import AlgoliaPlaces from 'algolia-places';
import useMarketField from 'use-market-field';
import { style } from './style';

const DestinationField = ({current, index, onChange, sdk}) => {
  const { section, row, column } = index;

  const { locale } = useMarketField(
    sdk,
    sdk.parameters.instance.marketField,
  );

  const addPlace = place => {
    const current = sdk.field.getValue()[section].rows[row].columns[column].value.destinations;
    if (current && current.includes(place)) {
      return;
    }
    const selection = current
      ? [...current, place]
      : [place];
    onChange('destinations', selection);
  };

  const removePlace = place => {
    const selection = current.filter(item => item !== place);
    onChange('destinations', selection);
  };

  return <>
    <Subheading style={style.label}>Destinations</Subheading>
    {current && current.map(place => <Pill
      key={place}
      label={place}
      icon="Close"
      onClose={() => removePlace(place)}
      style={style.pill}
    />)}
    <AlgoliaPlaces
      appId={sdk.parameters.installation.appID}
      apiKey={sdk.parameters.installation.apiKey}
      lang={locale}
      onSelect={addPlace}
    />
  </>;
};

DestinationField.propTypes = {
  current: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  sdk: PropTypes.object.isRequired,
};

export default DestinationField;