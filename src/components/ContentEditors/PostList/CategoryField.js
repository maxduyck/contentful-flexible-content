import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  EntityList,
  EntityListItem,
  Subheading,
  TextLink,
} from '@contentful/forma-36-react-components';
import { style } from './style';

const CategoryField = ({current, onChange, sdk}) => {
  const [category, setCategory] = useState(null);

  const setCategoryInfo = async categoryId => {
    const category = await Promise.resolve(sdk.space.getEntry(categoryId));
    setCategory({
      title: category.fields.title[sdk.locales.default],
      description: category.sys.id,
      contentType: category.sys.contentType.sys.id,
    });
  };

  useEffect(() => {
    if (current) {
      setCategoryInfo(current);
    }
  }, []);

  return <>
    <Subheading style={style.label}>Category</Subheading>
    <EntityList>
      {category &&
        <EntityListItem
          title={category.title}
          description={category.description}
          contentType={category.contentType}
        />
      }
    </EntityList>
    {!category &&
      <TextLink
        icon="Link"
        linkType="primary"
        onClick={() => {
          sdk.dialogs.selectSingleEntry({
            contentTypes: ['category']
          })
          .then(select => {
            setCategoryInfo(select.sys.id);
            onChange('categoryId', select.sys.id);
          })
        }}
        style={style.entryListBtn}
      >
        {category ? 'Change' : 'Add a'} Category
      </TextLink>
    }
    {category &&
      <TextLink
        linkType="negative"
        onClick={() => {
          setCategory(null);
          onChange('categoryId', null);
        }}
        style={style.entryListBtn}
      >
        Remove
      </TextLink>
    }
  </>;
};

CategoryField.propTypes = {
  current: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  sdk: PropTypes.object.isRequired,
};

export default CategoryField;