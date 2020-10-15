import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  EntityList,
  EntityListItem,
  Notification,
  Subheading,
  TextLink,
} from '@contentful/forma-36-react-components';
import useMarketField from 'use-market-field';
import { style } from './style';

const MainTagsField = ({current, onChange, sdk}) => {
  const [mainTags, setMainTags] = useState(null);

  const { lang, locale } = useMarketField(
    sdk,
    sdk.parameters.instance.marketField,
    market => market && setMainTagsInfo(current, `${market.lang}-${market.locale}`)
  );

  const loc = `${lang}-${locale}`;

  const setMainTagsInfo = async (mainTagsSlugs, loc) => {
    if (!loc) {
      return;
    }
    const mainTagsInfo = [];
    const mainTags = await Promise.resolve(sdk.space.getEntries({
      content_type: 'mainTag',
      'fields.slug[in]': mainTagsSlugs.join(),
      locale: loc,
    }));
    for (const item of mainTags.items) {
      mainTagsInfo.push({
        title: item.fields.title[loc],
        slug: item.fields.slug[loc],
      });
    }
    setMainTags(mainTagsInfo);
  };

  useEffect(() => {
    if (current) {
      setMainTagsInfo(current);
    }
  }, []);


  return <>
    <Subheading style={style.label}>Main Tags</Subheading>
    <EntityList>
      {mainTags && mainTags.map(({title, slug}) =>
        <EntityListItem
          key={slug}
          title={title}
          description={slug}
          contentType="mainTag"
        />
      )}
    </EntityList>
    <TextLink
      icon="Link"
      linkType={locale ? 'primary' : 'muted'}
      onClick={() => {
        if (locale) {
          return sdk.dialogs.selectMultipleEntries({
            contentTypes: ['mainTag'],
            locale: loc,
          }).then(select => {
            const mainTags = [];
            for (const tag of select) {
              if (loc in tag.fields.slug) {
                mainTags.push(tag.fields.slug[loc]);
              } else {
                Notification.warning(`The Main Tag ${tag.fields.title[sdk.locales.default]} does not exist for the language ${loc}`)
              }
            }
            setMainTagsInfo(mainTags, loc);
            onChange('mainTags', mainTags);
          })
        }
        sdk.dialogs.openAlert({
          title: 'Select a market first!',
          message: 'Impossible to choose Main Tags: No Market selected.',
          confirmLabel: 'OK, let me select a market',
        });
      }}
      style={style.entryListBtn}
    >
      {mainTags && mainTags.length > 0 ? 'Change' : 'Add'} Main Tags
    </TextLink>
  </>;
};

MainTagsField.propTypes = {
  current: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  sdk: PropTypes.object.isRequired,
};

export default MainTagsField;