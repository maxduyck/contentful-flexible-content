import GoogleMap from './GoogleMap/index';
import Instagram from './Instagram/index';
// import ImageText from './ImageText/index';
// import PageLink from './PageLink/index';
// import PostList from './PostList/index';
// import TextBlock from './TextBlock/index';
import YouTube from './YouTube/index';

export const elements = [
  {
    key: 'instagram',
    label: 'Instagram widget',
    Editor: 'instagram',
    Preview: Instagram.Preview,
  },
  {
    key: 'gmap',
    label: 'Google Map',
    Editor: 'gmap',
    Preview: GoogleMap.Preview,
  },
  {
    key: 'youtube',
    label: 'YouTube Player',
    Editor: 'youtube',
    Preview: YouTube.Preview,
  },
  // {
  //   key: 'text-block',
  //   label: 'Text block',
  //   Editor: TextBlock.Editor,
  //   Preview: null,
  // },
  // {
  //   columnLimit: [ 2 ],
  //   key: 'image-text-vertical',
  //   label: 'Image Text Vertical',
  //   Editor: ImageText.Editor,
  //   Preview: null,
  // },
  // {
  //   columnLimit: [ 1 ],
  //   key: 'image-text-horizontal',
  //   label: 'Image Text Horizontal',
  //   Editor: ImageText.Editor,
  //   Preview: null,
  // },
  // {
  //   columnLimit: [ 1 ],
  //   key: 'post-list',
  //   label: 'Post List',
  //   Editor: PostList.Editor,
  //   Preview: null,
  // },
  // {
  //   columnLimit: [ 2 ],
  //   contentTypes: [ 'seoPage' ],
  //   key: 'page-link',
  //   label: 'Page Link',
  //   Editor: PageLink.Editor,
  //   Preview: null,
  // },
];