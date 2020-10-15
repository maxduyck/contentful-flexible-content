'use strict';

var React = require('react');
require('@contentful/forma-36-react-components/dist/styles.css');
var PropTypes = require('prop-types');
var forma36ReactComponents = require('@contentful/forma-36-react-components');
var contentfulUiExtensionsSdk = require('contentful-ui-extensions-sdk');
var arrayMove = require('array-move');
var reactSortableHoc = require('react-sortable-hoc');
var isEqual = require('react-fast-compare');
var Collapse = require('@kunukn/react-collapse');
var slugify = require('slugify');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var arrayMove__default = /*#__PURE__*/_interopDefaultLegacy(arrayMove);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var Collapse__default = /*#__PURE__*/_interopDefaultLegacy(Collapse);
var slugify__default = /*#__PURE__*/_interopDefaultLegacy(slugify);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var ConfigContext = /*#__PURE__*/React.createContext(null);

var useConfig = function useConfig() {
  return React.useContext(ConfigContext);
};

var ConfigProvider = function ConfigProvider(_ref) {
  var children = _ref.children,
      columnsPerRow = _ref.columnsPerRow,
      elements = _ref.elements;
  var columnsPerRowLimited = columnsPerRow.filter(function (item) {
    return item <= 6;
  });
  return /*#__PURE__*/React__default['default'].createElement(ConfigContext.Provider, {
    value: {
      columnsPerRow: _toConsumableArray(new Set(columnsPerRowLimited)),
      elements: elements
    }
  }, children);
};

var ConfigConsumer = ConfigContext.Consumer;

var ContentContext = /*#__PURE__*/React.createContext(null);

var ContentProvider = function ContentProvider(_ref) {
  var sdk = _ref.sdk,
      children = _ref.children;

  if (!sdk.location.is(contentfulUiExtensionsSdk.locations.LOCATION_ENTRY_FIELD)) {
    return null;
  }

  var _useState = React.useState(sdk.field.getValue() || []),
      _useState2 = _slicedToArray(_useState, 2),
      content = _useState2[0],
      setContent = _useState2[1];

  var onContentChange = function onContentChange(content) {
    content && setContent(content);
  };

  React.useEffect(function () {
    var contentChangeHandler = sdk.field.onValueChanged(onContentChange);
    return contentChangeHandler;
  }, []);
  return /*#__PURE__*/React__default['default'].createElement(ContentContext.Provider, {
    value: {
      sdk: sdk,
      content: content,
      addElement: function addElement(elementKey, _ref2) {
        var section = _ref2.section,
            row = _ref2.row,
            column = _ref2.column;
        var newContent = content;
        newContent[section].rows[row].columns[column].element = elementKey;
        sdk.field.setValue(newContent);
      },
      addRow: function addRow(index, columnsCount) {
        var newContent = content;
        var newRow = {
          columns: [],
          contentfulTabOpen: true
        };

        for (var i = 0; i < columnsCount; i++) {
          newRow.columns[i] = {
            element: null,
            value: null
          };
        }

        content[index].rows = [].concat(_toConsumableArray(content[index].rows), [newRow]);
        sdk.field.setValue(newContent);
      },
      addSection: function addSection(title, anchor) {
        var newSection = {
          title: title,
          anchor: anchor,
          rows: [],
          contentfulTabOpen: true
        };
        var newContent = [].concat(_toConsumableArray(content), [newSection]);
        sdk.field.setValue(newContent);
      },
      deleteElement: function deleteElement(_ref3) {
        var section = _ref3.section,
            row = _ref3.row,
            column = _ref3.column;
        var newContent = content;
        newContent[section].rows[row].columns[column].element = null;
        newContent[section].rows[row].columns[column].value = null;
        sdk.field.setValue(newContent);
      },
      deleteRow: function deleteRow(_ref4) {
        var section = _ref4.section,
            row = _ref4.row;
        var sectionRows = content[section].rows;
        var newRows = sectionRows.filter(function (item, i) {
          return i !== row;
        });
        var newContent = content;
        newContent[section].rows = newRows;
        sdk.field.setValue(newContent);
      },
      deleteSection: function deleteSection(index) {
        var newContent = content.filter(function (item, i) {
          return i !== index;
        });
        sdk.field.setValue(newContent);
      },
      invertColumns: function invertColumns(_ref5) {
        var section = _ref5.section,
            row = _ref5.row;
        var newColumns = arrayMove__default['default'](content[section].rows[row].columns, 0, 1);
        var newContent = content;
        newContent[section].rows[row].columns = newColumns;
        sdk.field.setValue(newContent);
      },
      openExtension: function openExtension(element, current, callback) {
        sdk.dialogs.openExtension({
          id: element.Editor,
          title: element.label,
          shouldCloseOnOverlayClick: true,
          shouldCloseOnEscapePress: true,
          parameters: {
            current: current
          }
        }).then(callback);
      },
      sortColumns: function sortColumns(oldIndex, newIndex, index) {
        var section = index.section,
            row = index.row;
        var rowColumns = content[section].rows[row].columns;
        var newContent = content;
        newContent[section].rows[row].columns = arrayMove__default['default'](rowColumns, oldIndex, newIndex);
        sdk.field.setValue(newContent);
      },
      sortRows: function sortRows(oldIndex, newIndex, section) {
        var sectionRows = content[section].rows;
        var newContent = content;
        newContent[section].rows = arrayMove__default['default'](sectionRows, oldIndex, newIndex);
        sdk.field.setValue(newContent);
      },
      sortSections: function sortSections(oldIndex, newIndex) {
        var newContent = arrayMove__default['default'](content, oldIndex, newIndex);
        sdk.field.setValue(newContent);
      },
      toggleColumn: function toggleColumn(_ref6, state) {
        var section = _ref6.section,
            row = _ref6.row,
            column = _ref6.column;
        var newContent = content;
        newContent[section].rows[row].columns[column].contentfulTabOpen = state;
        sdk.field.setValue(newContent);
      },
      toggleRow: function toggleRow(_ref7, state) {
        var section = _ref7.section,
            row = _ref7.row;
        var newContent = content;
        newContent[section].rows[row].contentfulTabOpen = state;
        sdk.field.setValue(newContent);
      },
      toggleSection: function toggleSection(section, state) {
        var newContent = content;
        newContent[section].contentfulTabOpen = state;
        sdk.field.setValue(newContent);
      },
      updateContent: function updateContent(value, _ref8) {
        var section = _ref8.section,
            row = _ref8.row,
            column = _ref8.column;
        var newContent = content;
        newContent[section].rows[row].columns[column].value = value;
        sdk.field.setValue(newContent);
      },
      updateSection: function updateSection(title, anchor, index) {
        var newContent = content;
        newContent[index].title = title;
        newContent[index].anchor = anchor;
        sdk.field.setValue(newContent);
      }
    }
  }, children);
};

var ContentConsumer = ContentContext.Consumer;

var style = {
  column: {
    background: '#fff'
  },
  head: {
    alignItems: 'center',
    display: 'flex',
    padding: '8px 0',
    position: 'relative'
  },
  headline: {
    // display: 'inline-block',
    margin: '10px 0 10px 40px' // position: 'relative',

  }
};

var Column = function Column(_ref) {
  var dragHandleComponent = _ref.dragHandleComponent,
      index = _ref.index;
  var section = index.section,
      row = index.row,
      column = index.column;

  var _useConfig = useConfig(),
      elements = _useConfig.elements;

  return /*#__PURE__*/React__default['default'].createElement("div", {
    style: style.column
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    style: style.head
  }, dragHandleComponent, /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.SectionHeading, {
    style: style.headline
  }, "Column ", column + 1)), /*#__PURE__*/React__default['default'].createElement(ContentConsumer, null, function (_ref2) {
    var content = _ref2.content;
    var current = content[section].rows[row].columns[column].value;
    var columnCount = content[section].rows[row].columns.length;
    var elementKey = content[section].rows[row].columns[column].element;
    var element = elementKey !== null && elements.find(function (item) {
      return item.key === elementKey;
    });
    return element ? /*#__PURE__*/React__default['default'].createElement(EditorBuilder, {
      current: current,
      element: element,
      index: index
    }) : /*#__PURE__*/React__default['default'].createElement(ColumnForm, {
      index: index,
      columnCount: columnCount
    });
  }));
};

Column.propTypes = {
  index: PropTypes__default['default'].shape({
    column: PropTypes__default['default'].number.isRequired,
    row: PropTypes__default['default'].number.isRequired,
    section: PropTypes__default['default'].number.isRequired
  }).isRequired
};

var style$1 = {
  form: {
    display: 'flex',
    margin: '10px 0'
  },
  submit: {
    marginLeft: 10
  }
};

var ColumnForm = function ColumnForm(_ref) {
  var columnCount = _ref.columnCount,
      index = _ref.index;

  var _useConfig = useConfig(),
      elements = _useConfig.elements;

  var _useState = React.useState(elements[0].key),
      _useState2 = _slicedToArray(_useState, 2),
      element = _useState2[0],
      setElement = _useState2[1];

  return /*#__PURE__*/React__default['default'].createElement(ContentConsumer, null, function (_ref2) {
    var sdk = _ref2.sdk,
        addElement = _ref2.addElement,
        openExtension = _ref2.openExtension,
        updateContent = _ref2.updateContent;
    var contentTypeId = sdk.contentType.sys.id;

    var handleSubmit = function handleSubmit(element, index) {
      addElement(element, index);
      var addedEl = elements.find(function (_ref3) {
        var key = _ref3.key;
        return element === key;
      });
      addedEl && typeof addedEl.Editor === 'string' && openExtension(addedEl, null, function (data) {
        return data && updateContent(data, index);
      });
    };

    return /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Form, {
      onSubmit: function onSubmit() {
        return handleSubmit(element, index);
      },
      style: style$1.form
    }, /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Select, {
      name: "elements",
      onChange: function onChange(e) {
        return setElement(e.currentTarget.value);
      },
      style: style$1.select,
      value: element,
      width: "medium"
    }, elements.map(function (element) {
      return (!('columnLimit' in element) || element.columnLimit.includes(columnCount)) && (!('contentTypes' in element) || element.contentTypes.includes(contentTypeId)) && /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Option, {
        key: element.key,
        value: element.key
      }, element.label);
    })), /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Button, {
      buttonType: "positive",
      icon: "ChevronRight",
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      style: style$1.submit,
      type: "submit"
    }));
  });
};

ColumnForm.propTypes = {
  columnCount: PropTypes__default['default'].number.isRequired,
  index: PropTypes__default['default'].shape({
    column: PropTypes__default['default'].number.isRequired,
    row: PropTypes__default['default'].number.isRequired,
    section: PropTypes__default['default'].number.isRequired
  }).isRequired
};

var bin = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHZpZXdCb3g9IjAgMCA0NzcuOSA0NzcuOSI+PHBhdGggZD0iTTQ0NCA2OEgzMjRWNTFjMC0yOC0yMy01MS01MS01MWgtNjhjLTI4IDAtNTEgMjMtNTEgNTF2MTdIMzRhMTcgMTcgMCAxMDAgMzRoMTlsMzIgMzYwYzEgOSA5IDE2IDE3IDE2aDI3M2M5IDAgMTctNyAxOC0xNmwzMi0zNjBoMTlhMTcgMTcgMCAxMDAtMzR6TTE4OCA1MWMwLTkgNy0xNyAxNy0xN2g2OGM5IDAgMTcgOCAxNyAxN3YxN0gxODhWNTF6bTE3MiAzOTNIMTE4TDg3IDEwMmgzMDRsLTMxIDM0MnoiLz48cGF0aCBkPSJNMTg4IDM5MWwtMTctMjM5YTE3IDE3IDAgMDAtMzQgM2wxNyAyMzljMCA5IDggMTYgMTcgMTZoMWM5LTEgMTYtOSAxNi0xOXpNMjM5IDEzN2MtOSAwLTE3IDctMTcgMTd2MjM5YTE3IDE3IDAgMTAzNCAwVjE1NGMwLTEwLTgtMTctMTctMTd6TTMyNSAxMzdjLTktMS0xNyA2LTE4IDE1bC0xNyAyMzljLTEgMTAgNyAxOCAxNiAxOWgxYzkgMCAxNy03IDE3LTE2bDE3LTIzOWMxLTEwLTYtMTgtMTYtMTh6Ii8+PC9zdmc+';

var DeleteButton = function DeleteButton(_ref) {
  var onClick = _ref.onClick,
      size = _ref.size,
      style = _ref.style;
  var baseStyle = {
    button: {
      display: 'flex',
      justifyContent: 'center'
    },
    icon: {
      backgroundImage: "url('".concat(bin, "')"),
      backgroundSize: 'contain',
      display: 'block',
      height: size === 'small' ? 12 : 16,
      width: size === 'small' ? 12 : 16
    }
  };
  return /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Button, {
    buttonType: "negative",
    onClick: onClick,
    style: _objectSpread2(_objectSpread2({}, baseStyle.button), style)
  }, /*#__PURE__*/React__default['default'].createElement("span", {
    style: baseStyle.icon
  }));
};

DeleteButton.propTypes = {
  onClick: PropTypes__default['default'].func.isRequired,
  size: PropTypes__default['default'].string,
  style: PropTypes__default['default'].object
};

var DragHandle = reactSortableHoc.SortableHandle(function () {
  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isHover = _useState2[0],
      setHover = _useState2[1];

  return /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Icon, {
    icon: "Drag",
    color: "muted",
    style: {
      background: isHover ? '#d3dce0' : 'transparent',
      boxSizing: 'border-box',
      cursor: 'grab',
      height: '100%',
      padding: 6,
      position: 'absolute',
      top: 0,
      transition: 'background .2s ease-in-out',
      width: 30
    },
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    }
  });
});

var style$2 = {
  head: {
    alignItems: 'center',
    borderBottom: '1px solid #d3dce0',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 10
  },
  element: {
    color: '#536171',
    fontWeight: '400'
  },
  btnGroup: {
    display: 'flex'
  },
  button: {
    height: 22,
    marginLeft: 8,
    width: 32
  }
};

var MemoPreview = /*#__PURE__*/React__default['default'].memo(function (_ref) {
  var Preview = _ref.Preview,
      current = _ref.current;
  return Preview ? /*#__PURE__*/React__default['default'].createElement(Preview, {
    current: current
  }) : null;
}, isEqual__default['default']);

var EditorBuilder = function EditorBuilder(_ref2) {
  var current = _ref2.current,
      element = _ref2.element,
      index = _ref2.index;
  var Editor = element.Editor,
      label = element.label,
      Preview = element.Preview;
  var isExtension = typeof Editor === 'string';

  var _useState = React.useState(!current || !Preview),
      _useState2 = _slicedToArray(_useState, 2),
      isEditing = _useState2[0],
      setEditing = _useState2[1];

  React.useEffect(function () {
    setEditing(!current || !Preview);
  }, [current, element, index]);
  return /*#__PURE__*/React__default['default'].createElement(ContentConsumer, null, function (_ref3) {
    var sdk = _ref3.sdk,
        deleteElement = _ref3.deleteElement,
        openExtension = _ref3.openExtension,
        updateContent = _ref3.updateContent;
    return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", {
      style: style$2.head
    }, /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Subheading, {
      style: style$2.element
    }, label), /*#__PURE__*/React__default['default'].createElement("div", {
      style: style$2.btnGroup
    }, isExtension ? /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Button, {
      icon: "Edit",
      onClick: function onClick() {
        return openExtension(element, current, function (data) {
          return data && updateContent(data, index);
        });
      },
      size: "small",
      style: style$2.button
    }) : isEditing ? Preview && current && /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Button, {
      buttonType: "muted",
      icon: "Close",
      onClick: function onClick() {
        return setEditing(false);
      },
      size: "small",
      style: style$2.button
    }) : /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Button, {
      icon: "Edit",
      onClick: function onClick() {
        return setEditing(true);
      },
      size: "small",
      style: style$2.button
    }), /*#__PURE__*/React__default['default'].createElement(DeleteButton, {
      onClick: function onClick() {
        sdk.dialogs.openConfirm({
          title: element.label,
          message: 'Are you sure you want to delete this element? The data related to this element will be permanently lost.',
          intent: 'negative',
          confirmLabel: 'Delete element',
          cancelLabel: 'Cancel'
        }).then(function (valid) {
          return valid && deleteElement(index);
        });
      },
      size: "small",
      style: style$2.button
    }))), !isExtension && isEditing ? /*#__PURE__*/React__default['default'].createElement(Editor, {
      index: index,
      current: current,
      showPreview: function showPreview() {
        return setEditing(false);
      },
      updateContent: updateContent,
      save: function save(value) {
        updateContent(value, index);
        setEditing(false);
      }
    }) : current && /*#__PURE__*/React__default['default'].createElement(MemoPreview, {
      Preview: Preview,
      current: current
    }));
  });
};

EditorBuilder.propTypes = {
  current: PropTypes__default['default'].object,
  element: PropTypes__default['default'].shape({
    Editor: PropTypes__default['default'].oneOfType([PropTypes__default['default'].func, PropTypes__default['default'].string]).isRequired,
    label: PropTypes__default['default'].string.isRequired,
    Preview: PropTypes__default['default'].func
  }).isRequired,
  index: PropTypes__default['default'].shape({
    column: PropTypes__default['default'].number.isRequired,
    row: PropTypes__default['default'].number.isRequired,
    section: PropTypes__default['default'].number.isRequired
  }).isRequired
};

var style$3 = {
  row: {
    border: '1px solid #b4c3ca',
    borderRadius: 2,
    marginBottom: 10
  },
  head: {
    alignItems: 'center',
    background: '#e5ebed',
    color: '#536171',
    cursor: 'pointer',
    display: 'flex',
    padding: '8px 0',
    position: 'relative'
  },
  arrow: {
    margin: '0 6px 0 30px'
  },
  headText: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    color: '#536171',
    fontSize: 16
  },
  elements: {
    "float": 'right',
    lineHeight: '27px',
    marginRight: 10
  },
  deleteBtn: {
    height: 24,
    marginRight: 8,
    width: 24
  },
  body: {
    background: '#fff',
    borderTop: '1px solid #b4c3ca',
    padding: 10,
    position: 'relative'
  },
  invertBtn: {
    "float": 'right'
  },
  column: {
    marginBottom: 10,
    marginTop: 40
  }
};

var Body = /*#__PURE__*/React__default['default'].memo(function (_ref) {
  var columns = _ref.columns,
      index = _ref.index,
      isOpen = _ref.isOpen;
  var section = index.section,
      row = index.row;

  var _useConfig = useConfig(),
      elements = _useConfig.elements;

  var rowElements = [];

  var _iterator = _createForOfIteratorHelper(columns),
      _step;

  try {
    var _loop = function _loop() {
      var column = _step.value;
      var element = elements.find(function (item) {
        return item.key === column.element;
      });

      if (element) {
        rowElements.push(element.label);
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return /*#__PURE__*/React__default['default'].createElement(Collapse__default['default'], {
    isOpen: isOpen,
    transition: "height 0.2s cubic-bezier(.4, 0, .2, 1)"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    style: style$3.body
  }, columns.length === 1 && /*#__PURE__*/React__default['default'].createElement(Column, {
    index: {
      section: section,
      row: row,
      column: 0
    }
  }), columns.length > 1 && /*#__PURE__*/React__default['default'].createElement(SortableColumns, {
    index: index
  })));
});
Body.propTypes = {
  columns: PropTypes__default['default'].array.isRequired,
  index: PropTypes__default['default'].shape({
    row: PropTypes__default['default'].number.isRequired,
    section: PropTypes__default['default'].number.isRequired
  }).isRequired,
  invertColumns: PropTypes__default['default'].func.isRequired,
  isOpen: PropTypes__default['default'].bool.isRequired
};

var Head = /*#__PURE__*/React__default['default'].memo(function (_ref) {
  var dragHandleComponent = _ref.dragHandleComponent,
      columns = _ref.columns,
      deleteRow = _ref.deleteRow,
      index = _ref.index,
      isOpen = _ref.isOpen,
      sdk = _ref.sdk,
      toggleRow = _ref.toggleRow;

  var _useConfig = useConfig(),
      elements = _useConfig.elements;

  var rowElements = [];

  var _iterator = _createForOfIteratorHelper(columns),
      _step;

  try {
    var _loop = function _loop() {
      var column = _step.value;
      var element = elements.find(function (item) {
        return item.key === column.element;
      });

      if (element) {
        rowElements.push(element.label);
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var deleteMsg = 'Are you sure you want to delete this row?';

  if (rowElements.length > 0) {
    deleteMsg += " By proceeding you will permanently lose following content: ".concat(rowElements.join(', '), ".");
  }

  return /*#__PURE__*/React__default['default'].createElement("div", {
    style: style$3.head,
    onClick: function onClick() {
      return toggleRow(index, !isOpen);
    }
  }, dragHandleComponent, /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Icon, {
    color: "secondary",
    icon: "ArrowDown",
    style: _objectSpread2(_objectSpread2({}, style$3.arrow), {}, {
      transform: "rotate(".concat(isOpen ? '0' : '-90deg', ")")
    })
  }), /*#__PURE__*/React__default['default'].createElement("div", {
    style: style$3.headText
  }, /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Subheading, {
    style: style$3.title
  }, rowElements.join(' | ')), /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Paragraph, {
    style: style$3.elements
  }, columns.length, " column", columns.length > 1 && 's')), /*#__PURE__*/React__default['default'].createElement(DeleteButton, {
    onClick: function onClick(e) {
      e.stopPropagation();
      sdk.dialogs.openConfirm({
        title: "Row deletion (".concat(columns.length, " column").concat(columns.length > 1 ? 's' : '', ")"),
        message: deleteMsg,
        intent: 'negative',
        confirmLabel: 'Delete row',
        cancelLabel: 'Cancel'
      }).then(function (valid) {
        return valid && deleteRow(index);
      });
    },
    size: "small",
    style: style$3.deleteBtn
  }));
});
Head.propTypes = {
  dragHandleComponent: PropTypes__default['default'].node,
  columns: PropTypes__default['default'].array.isRequired,
  deleteRow: PropTypes__default['default'].func.isRequired,
  index: PropTypes__default['default'].shape({
    row: PropTypes__default['default'].number.isRequired,
    section: PropTypes__default['default'].number.isRequired
  }).isRequired,
  isOpen: PropTypes__default['default'].bool.isRequired,
  sdk: PropTypes__default['default'].object.isRequired,
  toggleRow: PropTypes__default['default'].func.isRequired
};

var Row = function Row(_ref) {
  var dragHandleComponent = _ref.dragHandleComponent,
      columns = _ref.columns,
      index = _ref.index;
  var section = index.section,
      row = index.row;
  return /*#__PURE__*/React__default['default'].createElement(ContentConsumer, null, function (_ref2) {
    var sdk = _ref2.sdk,
        content = _ref2.content,
        invertColumns = _ref2.invertColumns,
        deleteRow = _ref2.deleteRow,
        toggleRow = _ref2.toggleRow;
    var isOpen = content[section].rows[row].contentfulTabOpen;
    return /*#__PURE__*/React__default['default'].createElement("div", {
      style: style$3.row
    }, /*#__PURE__*/React__default['default'].createElement(Head, {
      dragHandleComponent: dragHandleComponent,
      columns: columns,
      deleteRow: deleteRow,
      index: index,
      isOpen: isOpen,
      sdk: sdk,
      toggleRow: toggleRow
    }), /*#__PURE__*/React__default['default'].createElement(Body, {
      columns: columns,
      index: index,
      invertColumns: invertColumns,
      isOpen: isOpen
    }));
  });
};

Row.propTypes = {
  dragHandleComponent: PropTypes__default['default'].node,
  columns: PropTypes__default['default'].array.isRequired,
  index: PropTypes__default['default'].shape({
    row: PropTypes__default['default'].number.isRequired,
    section: PropTypes__default['default'].number.isRequired
  }).isRequired
};

var style$4 = {
  form: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    marginTop: 20
  },
  button: {
    marginLeft: 10
  }
};

var RowForm = function RowForm(_ref) {
  var sectionIndex = _ref.sectionIndex;

  var _useState = React.useState('1'),
      _useState2 = _slicedToArray(_useState, 2),
      columns = _useState2[0],
      setColumns = _useState2[1];

  var _useConfig = useConfig(),
      columnsPerRow = _useConfig.columnsPerRow;

  return /*#__PURE__*/React__default['default'].createElement(ContentConsumer, null, function (_ref2) {
    var addRow = _ref2.addRow;
    return /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Form, {
      onSubmit: function onSubmit() {
        return addRow(sectionIndex, columns);
      },
      style: style$4.form
    }, /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Select, {
      name: "columns",
      onChange: function onChange(e) {
        return setColumns(e.currentTarget.value);
      },
      style: style$4.select,
      value: columns,
      width: "medium"
    }, columnsPerRow && columnsPerRow.map(function (n) {
      return /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Option, {
        key: n,
        value: n
      }, n, " column", n > 1 ? 's' : '');
    })), /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Button, {
      buttonType: "positive",
      icon: "EmbeddedEntryBlock",
      style: style$4.button,
      type: "submit"
    }, "Create new row"));
  });
};

RowForm.propTypes = {
  sectionIndex: PropTypes__default['default'].number.isRequired
};

var style$5 = {
  section: {
    border: '1px solid #b4c3ca',
    borderRadius: 2,
    marginBottom: 20
  },
  head: {
    alignItems: 'center',
    background: '#e5ebed',
    color: '#536171',
    cursor: 'pointer',
    display: 'flex',
    padding: '10px 0',
    position: 'relative'
  },
  arrow: {
    margin: '0 6px 0 30px'
  },
  headText: {
    flex: 1
  },
  title: {
    color: '#536171',
    display: 'inline-block',
    fontSize: 18
  },
  anchor: {
    "float": 'right',
    fontStyle: 'italic',
    lineHeight: '27px',
    marginRight: 10
  },
  button: {
    height: 30,
    marginRight: 10,
    width: 30
  },
  body: {
    background: '#fff',
    borderTop: '1px solid #b4c3ca',
    padding: 15
  }
};

var Body$1 = /*#__PURE__*/React__default['default'].memo(function (_ref) {
  var index = _ref.index,
      isOpen = _ref.isOpen;
  return /*#__PURE__*/React__default['default'].createElement(Collapse__default['default'], {
    isOpen: isOpen,
    transition: "height 0.2s cubic-bezier(.4, 0, .2, 1)"
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    style: style$5.body
  }, /*#__PURE__*/React__default['default'].createElement(SortableRows, {
    sectionIndex: index
  }), /*#__PURE__*/React__default['default'].createElement(RowForm, {
    sectionIndex: index
  })));
});
Body$1.propTypes = {
  index: PropTypes__default['default'].number.isRequired,
  isOpen: PropTypes__default['default'].bool.isRequired
};

var Head$1 = /*#__PURE__*/React__default['default'].memo(function (_ref) {
  var anchor = _ref.anchor,
      deleteSection = _ref.deleteSection,
      dragHandleComponent = _ref.dragHandleComponent,
      elementCount = _ref.elementCount,
      index = _ref.index,
      isOpen = _ref.isOpen,
      sdk = _ref.sdk,
      toggleSection = _ref.toggleSection,
      title = _ref.title;

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isEdit = _useState2[0],
      setEdit = _useState2[1];

  var deleteMsg = 'Are you sure you want to permanently delete this section?';

  if (elementCount > 0) {
    deleteMsg += " This action is not revertible and will cause the loss of ".concat(elementCount, " item").concat(elementCount > 1 ? 's' : '', ".");
  }

  return /*#__PURE__*/React__default['default'].createElement("div", {
    style: style$5.head,
    onClick: function onClick() {
      return toggleSection(index, !isOpen);
    }
  }, dragHandleComponent, /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Icon, {
    color: "secondary",
    icon: "ArrowDown",
    style: _objectSpread2(_objectSpread2({}, style$5.arrow), {}, {
      transform: "rotate(".concat(isOpen ? '0' : '-90deg', ")")
    })
  }), !isEdit ? /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/React__default['default'].createElement("div", {
    style: style$5.headText
  }, /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Heading, {
    style: style$5.title
  }, title), /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Paragraph, {
    style: style$5.anchor
  }, "#", anchor)), /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Button, {
    icon: "Edit",
    type: "submit",
    onClick: function onClick(e) {
      e.stopPropagation();
      setEdit(true);
    },
    style: style$5.button
  })) : /*#__PURE__*/React__default['default'].createElement(SectionForm, {
    index: index,
    onSubmit: function onSubmit() {
      return setEdit(false);
    },
    presetTitle: title,
    presetAnchor: anchor
  }), /*#__PURE__*/React__default['default'].createElement(DeleteButton, {
    onClick: function onClick(e) {
      e.stopPropagation();
      sdk.dialogs.openConfirm({
        title: title,
        message: deleteMsg,
        intent: 'negative',
        confirmLabel: 'Delete section',
        cancelLabel: 'Cancel'
      }).then(function (valid) {
        return valid && deleteSection(index);
      });
    },
    style: style$5.button
  }));
});
Head$1.propTypes = {
  anchor: PropTypes__default['default'].string.isRequired,
  deleteSection: PropTypes__default['default'].func.isRequired,
  dragHandleComponent: PropTypes__default['default'].node,
  elementCount: PropTypes__default['default'].number.isRequired,
  index: PropTypes__default['default'].number.isRequired,
  isOpen: PropTypes__default['default'].bool.isRequired,
  sdk: PropTypes__default['default'].object.isRequired,
  toggleSection: PropTypes__default['default'].func.isRequired,
  title: PropTypes__default['default'].string.isRequired
};

var Section = function Section(_ref) {
  var dragHandleComponent = _ref.dragHandleComponent,
      index = _ref.index;
  return /*#__PURE__*/React__default['default'].createElement(ContentConsumer, null, function (_ref2) {
    var sdk = _ref2.sdk,
        content = _ref2.content,
        deleteSection = _ref2.deleteSection,
        toggleSection = _ref2.toggleSection;
    var section = content[index];
    var elCount = 0;

    var _iterator = _createForOfIteratorHelper(section.rows),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var row = _step.value;

        var _iterator2 = _createForOfIteratorHelper(row.columns),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var column = _step2.value;

            if (column.element && column.value) {
              elCount++;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return /*#__PURE__*/React__default['default'].createElement("div", {
      style: style$5.section
    }, /*#__PURE__*/React__default['default'].createElement(Head$1, {
      anchor: section.anchor,
      deleteSection: deleteSection,
      dragHandleComponent: dragHandleComponent,
      elementCount: elCount,
      index: index,
      isOpen: section.contentfulTabOpen,
      sdk: sdk,
      toggleSection: toggleSection,
      title: section.title
    }), /*#__PURE__*/React__default['default'].createElement(Body$1, {
      index: index,
      isOpen: section.contentfulTabOpen
    }));
  });
};

Section.propTypes = {
  dragHandleComponent: PropTypes__default['default'].node,
  index: PropTypes__default['default'].number.isRequired
};

var style$6 = {
  form: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between'
  },
  input: {
    width: '100%'
  },
  editInput: {
    height: 8,
    padding: 10
  },
  editAnchor: {
    height: 10,
    padding: 10
  },
  editSubmit: {
    height: 30,
    marginRight: 10
  }
};

var SectionForm = function SectionForm(_ref) {
  var _ref$index = _ref.index,
      index = _ref$index === void 0 ? null : _ref$index,
      onSubmit = _ref.onSubmit,
      presetAnchor = _ref.presetAnchor,
      presetTitle = _ref.presetTitle;
  var titleFieldId = 'title-field';

  var _useState = React.useState(presetTitle || ''),
      _useState2 = _slicedToArray(_useState, 2),
      title = _useState2[0],
      setTitle = _useState2[1];

  var _useState3 = React.useState(presetAnchor || ''),
      _useState4 = _slicedToArray(_useState3, 2),
      anchor = _useState4[0],
      setAnchor = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      titleError = _useState6[0],
      setTitleError = _useState6[1];

  var _useState7 = React.useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      anchorError = _useState8[0],
      setAnchorError = _useState8[1];

  var isEdit = index !== null;

  var getSlug = function getSlug(string) {
    return slugify__default['default'](string, {
      lower: true,
      locale: 'de'
    });
  };

  var suggestAnchor = function suggestAnchor(title, anchor) {
    if (anchor !== '') {
      return;
    }

    setAnchor(getSlug(title));
  };

  return /*#__PURE__*/React__default['default'].createElement(ContentConsumer, null, function (_ref2) {
    var content = _ref2.content,
        addSection = _ref2.addSection,
        updateSection = _ref2.updateSection;

    var handleSubmit = function handleSubmit(title, anchor, index, action) {
      if (!title) {
        return setTitleError(true);
      }

      if (!anchor) {
        return setAnchorError(true);
      }

      var doubleTitle = content.find(function (section, i) {
        return section.title === title && i !== index;
      });

      if (doubleTitle) {
        setTitleError(true);
        return forma36ReactComponents.Notification.error('Section titles must be unique');
      }

      var slug = getSlug(anchor);
      var doubleAnchor = content.find(function (section, i) {
        return section.anchor === slug && i !== index;
      });

      if (doubleAnchor) {
        setAnchorError(true);
        return forma36ReactComponents.Notification.error('Anchors must be unique');
      }

      action(title, slug, index);

      if (onSubmit && typeof onSubmit === 'function') {
        onSubmit();
      }

      if (index !== null) {
        return;
      }

      setTitle('');
      setAnchor('');
      setTitleError(false);
      setAnchorError(false);
      document.querySelector("#".concat(titleFieldId)).focus();
    };

    return /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Form, {
      onSubmit: function onSubmit() {
        return handleSubmit(title, anchor, index, isEdit ? updateSection : addSection);
      },
      style: style$6.form
    }, /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.TextInput, {
      id: isEdit ? '' : titleFieldId,
      error: titleError,
      onBlur: function onBlur() {
        return suggestAnchor(title, anchor);
      },
      onChange: function onChange(e) {
        return setTitle(e.currentTarget.value);
      },
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      placeholder: "Section title",
      style: isEdit ? style$6.editInput : style$6.input,
      value: title
    }), /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.TextInput, {
      error: anchorError,
      onChange: function onChange(e) {
        return setAnchor(e.currentTarget.value);
      },
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      placeholder: "Anchor",
      style: isEdit ? style$6.editInput : style$6.input,
      value: anchor
    }), /*#__PURE__*/React__default['default'].createElement(forma36ReactComponents.Button, {
      buttonType: "positive",
      icon: isEdit ? 'CheckCircle' : 'Plus',
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      style: isEdit ? style$6.editSubmit : {},
      type: "submit"
    }, isEdit ? 'Save' : 'Add section'));
  });
};

SectionForm.propTypes = {
  index: PropTypes__default['default'].number,
  onSubmit: PropTypes__default['default'].func,
  presetAnchor: PropTypes__default['default'].string,
  presetTitle: PropTypes__default['default'].string
};

var SortableColumns = function SortableColumns(_ref) {
  var index = _ref.index;
  var section = index.section,
      row = index.row;

  var shouldMemo = function shouldMemo(prev, next) {
    if (next.list.length !== prev.list.length) {
      return false;
    }

    return false;
  };

  var SortableColumn = reactSortableHoc.SortableElement(function (_ref2) {
    var value = _ref2.value;
    return /*#__PURE__*/React__default['default'].createElement(Column, {
      key: value.index,
      index: {
        section: section,
        row: row,
        column: value.index
      },
      dragHandleComponent: /*#__PURE__*/React__default['default'].createElement(DragHandle, null)
    });
  });
  var ColumnsList = reactSortableHoc.SortableContainer(function (_ref3) {
    var items = _ref3.items;
    return /*#__PURE__*/React__default['default'].createElement("div", null, items.map(function (row, index) {
      return /*#__PURE__*/React__default['default'].createElement(SortableColumn, {
        key: index,
        index: index,
        value: {
          columns: row.columns,
          index: index
        }
      });
    }));
  });
  var MemoizedList = /*#__PURE__*/React__default['default'].memo(function (_ref4) {
    var list = _ref4.list,
        sortColumns = _ref4.sortColumns;
    return /*#__PURE__*/React__default['default'].createElement(ColumnsList, {
      axis: "y",
      distance: 10,
      items: list,
      onSortEnd: function onSortEnd(_ref5) {
        var oldIndex = _ref5.oldIndex,
            newIndex = _ref5.newIndex;
        return sortColumns(oldIndex, newIndex, index);
      },
      useDragHandle: true
    });
  }, shouldMemo);
  return /*#__PURE__*/React__default['default'].createElement(ContentConsumer, null, function (_ref6) {
    var content = _ref6.content,
        sortColumns = _ref6.sortColumns;
    return /*#__PURE__*/React__default['default'].createElement(MemoizedList, {
      list: content[section].rows[row].columns,
      sortColumns: sortColumns
    });
  });
};

SortableColumns.propTypes = {
  sectionIndex: PropTypes__default['default'].number.isRequired
};

var SortableRows = function SortableRows(_ref) {
  var sectionIndex = _ref.sectionIndex;

  var shouldMemo = function shouldMemo(prev, next) {
    if (next.list.length !== prev.list.length) {
      return false;
    }

    return false;
  };

  var SortableRow = reactSortableHoc.SortableElement(function (_ref2) {
    var _React$createElement;

    var value = _ref2.value;
    return /*#__PURE__*/React__default['default'].createElement(Row, (_React$createElement = {
      key: value.index,
      index: value.index,
      columns: value.columns
    }, _defineProperty(_React$createElement, "index", {
      section: sectionIndex,
      row: value.index
    }), _defineProperty(_React$createElement, "dragHandleComponent", /*#__PURE__*/React__default['default'].createElement(DragHandle, null)), _React$createElement));
  });
  var RowsList = reactSortableHoc.SortableContainer(function (_ref3) {
    var items = _ref3.items;
    return /*#__PURE__*/React__default['default'].createElement("div", null, items.map(function (row, index) {
      return /*#__PURE__*/React__default['default'].createElement(SortableRow, {
        key: index,
        index: index,
        value: {
          columns: row.columns,
          index: index
        }
      });
    }));
  });
  var MemoizedList = /*#__PURE__*/React__default['default'].memo(function (_ref4) {
    var list = _ref4.list,
        sortRows = _ref4.sortRows;
    return /*#__PURE__*/React__default['default'].createElement(RowsList, {
      axis: "y",
      distance: 10,
      items: list,
      onSortEnd: function onSortEnd(_ref5) {
        var oldIndex = _ref5.oldIndex,
            newIndex = _ref5.newIndex;
        return sortRows(oldIndex, newIndex, sectionIndex);
      },
      useDragHandle: true
    });
  }, shouldMemo);
  return /*#__PURE__*/React__default['default'].createElement(ContentConsumer, null, function (_ref6) {
    var content = _ref6.content,
        sortRows = _ref6.sortRows;
    return /*#__PURE__*/React__default['default'].createElement(MemoizedList, {
      list: content[sectionIndex].rows,
      sortRows: sortRows
    });
  });
};

SortableRows.propTypes = {
  sectionIndex: PropTypes__default['default'].number.isRequired
};

var SortableSections = function SortableSections() {
  var shouldMemo = function shouldMemo(prev, next) {
    if (next.list.length !== prev.list.length) {
      return false;
    }

    if (next.list.find(function (item, i) {
      return item.title !== prev.list[i].title;
    })) {
      return false;
    }

    return true;
  };

  var SortableSection = reactSortableHoc.SortableElement(function (_ref) {
    var value = _ref.value;
    return /*#__PURE__*/React__default['default'].createElement(Section, {
      key: value,
      index: value,
      dragHandleComponent: /*#__PURE__*/React__default['default'].createElement(DragHandle, null)
    });
  });
  var SectionsList = reactSortableHoc.SortableContainer(function (_ref2) {
    var items = _ref2.items;
    return /*#__PURE__*/React__default['default'].createElement("div", null, items && items.map(function (item, index) {
      return /*#__PURE__*/React__default['default'].createElement(SortableSection, {
        key: index,
        index: index,
        value: index
      });
    }));
  });
  var MemoizedList = /*#__PURE__*/React__default['default'].memo(function (_ref3) {
    var list = _ref3.list,
        sortSections = _ref3.sortSections;
    return /*#__PURE__*/React__default['default'].createElement(SectionsList, {
      axis: "y",
      distance: 20,
      items: list,
      onSortEnd: function onSortEnd(_ref4) {
        var oldIndex = _ref4.oldIndex,
            newIndex = _ref4.newIndex;
        return sortSections(oldIndex, newIndex);
      },
      useDragHandle: true
    });
  }, shouldMemo);
  return /*#__PURE__*/React__default['default'].createElement(ContentConsumer, null, function (_ref5) {
    var content = _ref5.content,
        sortSections = _ref5.sortSections;
    return /*#__PURE__*/React__default['default'].createElement(MemoizedList, {
      list: content,
      sortSections: sortSections
    });
  });
};

var ContentfulFlexibleContent = function ContentfulFlexibleContent(_ref) {
  var columnsPerRow = _ref.columnsPerRow,
      elements = _ref.elements,
      sdk = _ref.sdk;
  React.useEffect(function () {
    sdk.window.startAutoResizer();
  }, []);
  return /*#__PURE__*/React__default['default'].createElement(ConfigProvider, {
    columnsPerRow: columnsPerRow,
    elements: elements
  }, /*#__PURE__*/React__default['default'].createElement(ContentProvider, {
    sdk: sdk
  }, /*#__PURE__*/React__default['default'].createElement(SortableSections, null), /*#__PURE__*/React__default['default'].createElement(SectionForm, null)));
};

module.exports = ContentfulFlexibleContent;
