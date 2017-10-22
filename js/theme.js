/*!
 * Bootstrap v4.0.0-beta (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.')
}

(function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
  }
})(jQuery);

(function () {
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Util = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'

    // shoutout AngusCroll (https://goo.gl/pxwQGp)
  };function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var name in TransitionEndEvent) {
      if (el.style[name] !== undefined) {
        return {
          end: TransitionEndEvent[name]
        };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));
      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');
      if (!selector || selector === '#') {
        selector = element.getAttribute('href') || '';
      }

      try {
        var $selector = $(selector);
        return $selector.length > 0 ? selector : null;
      } catch (error) {
        return null;
      }
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Alert = function () {
    function Alert(element) {
      _classCallCheck(this, Alert);

      this._element = element;
    }

    // getters

    // public

    Alert.prototype.close = function close(element) {
      element = element || this._element;

      var rootElement = this._getRootElement(element);
      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    Alert.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Alert.prototype._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = $(selector)[0];
      }

      if (!parent) {
        parent = $(element).closest('.' + ClassName.ALERT)[0];
      }

      return parent;
    };

    Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);

      $(element).trigger(closeEvent);
      return closeEvent;
    };

    Alert.prototype._removeElement = function _removeElement(element) {
      var _this2 = this;

      $(element).removeClass(ClassName.SHOW);

      if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);
        return;
      }

      $(element).one(Util.TRANSITION_END, function (event) {
        return _this2._destroyElement(element, event);
      }).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Alert.prototype._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    };

    // static

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Button = function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    // getters

    // public

    Button.prototype.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = $(this._element).find(Selector.INPUT)[0];

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

              if (activeElement) {
                $(activeElement).removeClass(ClassName.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
              return;
            }
            input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
      }

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName.ACTIVE);
      }
    };

    Button.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // static

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'carousel';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key
  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };

  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };

  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };

  var Event = {
    SLIDE: 'slide' + EVENT_KEY,
    SLID: 'slid' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
    TOUCHEND: 'touchend' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item'
  };

  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Carousel = function () {
    function Carousel(element, config) {
      _classCallCheck(this, Carousel);

      this._items = null;
      this._interval = null;
      this._activeElement = null;

      this._isPaused = false;
      this._isSliding = false;

      this.touchTimeout = null;

      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    }

    // getters

    // public

    Carousel.prototype.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    Carousel.prototype.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      if (!document.hidden) {
        this.next();
      }
    };

    Carousel.prototype.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    Carousel.prototype.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    Carousel.prototype.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    Carousel.prototype.to = function to(index) {
      var _this3 = this;

      this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event.SLID, function () {
          return _this3.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    Carousel.prototype.dispose = function dispose() {
      $(this._element).off(EVENT_KEY);
      $.removeData(this._element, DATA_KEY);

      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    };

    // private

    Carousel.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Carousel.prototype._addEventListeners = function _addEventListeners() {
      var _this4 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN, function (event) {
          return _this4._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $(this._element).on(Event.MOUSEENTER, function (event) {
          return _this4.pause(event);
        }).on(Event.MOUSELEAVE, function (event) {
          return _this4.cycle(event);
        });
        if ('ontouchstart' in document.documentElement) {
          // if it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          $(this._element).on(Event.TOUCHEND, function () {
            _this4.pause();
            if (_this4.touchTimeout) {
              clearTimeout(_this4.touchTimeout);
            }
            _this4.touchTimeout = setTimeout(function (event) {
              return _this4.cycle(event);
            }, TOUCHEVENT_COMPAT_WAIT + _this4._config.interval);
          });
        }
      }
    };

    Carousel.prototype._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;
        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;
        default:
          return;
      }
    };

    Carousel.prototype._getItemIndex = function _getItemIndex(element) {
      this._items = $.makeArray($(element).parent().find(Selector.ITEM));
      return this._items.indexOf(element);
    };

    Carousel.prototype._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;
      var activeIndex = this._getItemIndex(activeElement);
      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;

      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    Carousel.prototype._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);
      var fromIndex = this._getItemIndex($(this._element).find(Selector.ACTIVE_ITEM)[0]);
      var slideEvent = $.Event(Event.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });

      $(this._element).trigger(slideEvent);

      return slideEvent;
    };

    Carousel.prototype._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName.ACTIVE);
        }
      }
    };

    Carousel.prototype._slide = function _slide(direction, element) {
      var _this5 = this;

      var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
      var activeElementIndex = this._getItemIndex(activeElement);
      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);
      var nextElementIndex = this._getItemIndex(nextElement);
      var isCycling = Boolean(this._interval);

      var directionalClassName = void 0;
      var orderClassName = void 0;
      var eventDirectionName = void 0;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName.LEFT;
        orderClassName = ClassName.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName.RIGHT;
        orderClassName = ClassName.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);
      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

        $(nextElement).addClass(orderClassName);

        Util.reflow(nextElement);

        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);

        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + ' ' + orderClassName).addClass(ClassName.ACTIVE);

          $(activeElement).removeClass(ClassName.ACTIVE + ' ' + orderClassName + ' ' + directionalClassName);

          _this5._isSliding = false;

          setTimeout(function () {
            return $(_this5._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        $(activeElement).removeClass(ClassName.ACTIVE);
        $(nextElement).addClass(ClassName.ACTIVE);

        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    };

    // static

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Default, $(this).data());

        if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object') {
          $.extend(_config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (data[action] === undefined) {
            throw new Error('No method named "' + action + '"');
          }
          data[action]();
        } else if (_config.interval) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
        return;
      }

      var config = $.extend({}, $(target).data(), $(this).data());
      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Collapse = function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));
      var tabToggles = $(Selector.DATA_TOGGLE);
      for (var i = 0; i < tabToggles.length; i++) {
        var elem = tabToggles[i];
        var selector = Util.getSelectorFromElement(elem);
        if (selector !== null && $(selector).filter(element).length > 0) {
          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    // getters

    // public

    Collapse.prototype.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    Collapse.prototype.show = function show() {
      var _this6 = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var actives = void 0;
      var activesData = void 0;

      if (this._parent) {
        actives = $.makeArray($(this._parent).children().children(Selector.ACTIVES));
        if (!actives.length) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).data(DATA_KEY);
        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event.SHOW);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives), 'hide');
        if (!activesData) {
          $(actives).data(DATA_KEY, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this6._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);

        _this6._element.style[dimension] = '';

        _this6.setTransitioning(false);

        $(_this6._element).trigger(Event.SHOWN);
      };

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = 'scroll' + capitalizedDimension;

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

      this._element.style[dimension] = this._element[scrollSize] + 'px';
    };

    Collapse.prototype.hide = function hide() {
      var _this7 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event.HIDE);
      $(this._element).trigger(startEvent);
      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + 'px';

      Util.reflow(this._element);

      $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

      if (this._triggerArray.length) {
        for (var i = 0; i < this._triggerArray.length; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);
          if (selector !== null) {
            var $elem = $(selector);
            if (!$elem.hasClass(ClassName.SHOW)) {
              $(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this7.setTransitioning(false);
        $(_this7._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
      };

      this._element.style[dimension] = '';

      if (!Util.supportsTransitionEnd()) {
        complete();
        return;
      }

      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
    };

    Collapse.prototype.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    Collapse.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    };

    // private

    Collapse.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      config.toggle = Boolean(config.toggle); // coerce string values
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Collapse.prototype._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    Collapse.prototype._getParent = function _getParent() {
      var _this8 = this;

      var parent = $(this._config.parent)[0];
      var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

      $(parent).find(selector).each(function (i, element) {
        _this8._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });

      return parent;
    };

    Collapse.prototype._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      if (element) {
        var isOpen = $(element).hasClass(ClassName.SHOW);

        if (triggerArray.length) {
          $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
        }
      }
    };

    // static

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? $(selector)[0] : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);
        var _config = $.extend({}, Default, $this.data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    if (!/input|textarea/i.test(event.target.tagName)) {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    $(selector).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY);
      var config = data ? 'toggle' : $trigger.data();
      Collapse._jQueryInterface.call($target, config);
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
}(jQuery);

/* global Popper */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = function ($) {

  /**
   * Check for Popper dependency
   * Popper - https://popper.js.org
   */
  if (typeof Popper === 'undefined') {
    throw new Error('Bootstrap dropdown require Popper.js (https://popper.js.org)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + '|' + ARROW_DOWN_KEYCODE + '|' + ESCAPE_KEYCODE);

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY,
    KEYUP_DATA_API: 'keyup' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left'
  };

  var Selector = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled)'
  };

  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end'
  };

  var Default = {
    placement: AttachmentMap.BOTTOM,
    offset: 0,
    flip: true
  };

  var DefaultType = {
    placement: 'string',
    offset: '(number|string)',
    flip: 'boolean'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Dropdown = function () {
    function Dropdown(element, config) {
      _classCallCheck(this, Dropdown);

      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    }

    // getters

    // public

    Dropdown.prototype.toggle = function toggle() {
      if (this._element.disabled || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);
      var isActive = $(this._menu).hasClass(ClassName.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event.SHOW, relatedTarget);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      var element = this._element;
      // for dropup with alignment we use the parent as popper container
      if ($(parent).hasClass(ClassName.DROPUP)) {
        if ($(this._menu).hasClass(ClassName.MENULEFT) || $(this._menu).hasClass(ClassName.MENURIGHT)) {
          element = parent;
        }
      }
      this._popper = new Popper(element, this._menu, this._getPopperConfig());

      // if this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
      if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {
        $('body').children().on('mouseover', null, $.noop);
      }

      this._element.focus();
      this._element.setAttribute('aria-expanded', true);

      $(this._menu).toggleClass(ClassName.SHOW);
      $(parent).toggleClass(ClassName.SHOW).trigger($.Event(Event.SHOWN, relatedTarget));
    };

    Dropdown.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._element).off(EVENT_KEY);
      this._element = null;
      this._menu = null;
      if (this._popper !== null) {
        this._popper.destroy();
      }
      this._popper = null;
    };

    Dropdown.prototype.update = function update() {
      this._inNavbar = this._detectNavbar();
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    };

    // private

    Dropdown.prototype._addEventListeners = function _addEventListeners() {
      var _this9 = this;

      $(this._element).on(Event.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();
        _this9.toggle();
      });
    };

    Dropdown.prototype._getConfig = function _getConfig(config) {
      var elementData = $(this._element).data();
      if (elementData.placement !== undefined) {
        elementData.placement = AttachmentMap[elementData.placement.toUpperCase()];
      }

      config = $.extend({}, this.constructor.Default, $(this._element).data(), config);

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    };

    Dropdown.prototype._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);
        this._menu = $(parent).find(Selector.MENU)[0];
      }
      return this._menu;
    };

    Dropdown.prototype._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element).parent();
      var placement = this._config.placement;

      // Handle dropup
      if ($parentDropdown.hasClass(ClassName.DROPUP) || this._config.placement === AttachmentMap.TOP) {
        placement = AttachmentMap.TOP;
        if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }
      return placement;
    };

    Dropdown.prototype._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    };

    Dropdown.prototype._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: {
            offset: this._config.offset
          },
          flip: {
            enabled: this._config.flip
          }
        }

        // Disable Popper.js for Dropdown in Navbar
      };if (this._inNavbar) {
        popperConfig.modifiers.applyStyle = {
          enabled: !this._inNavbar
        };
      }
      return popperConfig;
    };

    // static

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = $.makeArray($(Selector.DATA_TOGGLE));
      for (var i = 0; i < toggles.length; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);
        var context = $(toggles[i]).data(DATA_KEY);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;
        if (!$(parent).hasClass(ClassName.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);
        if (hideEvent.isDefaultPrevented()) {
          continue;
        }

        // if this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support
        if ('ontouchstart' in document.documentElement) {
          $('body').children().off('mouseover', null, $.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        $(dropdownMenu).removeClass(ClassName.SHOW);
        $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent = void 0;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = $(selector)[0];
      }

      return parent || element.parentNode;
    };

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      if (!REGEXP_KEYDOWN.test(event.which) || /button/i.test(event.target.tagName) && event.which === SPACE_KEYCODE || /input|textarea/i.test(event.target.tagName)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);
      var isActive = $(parent).hasClass(ClassName.SHOW);

      if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {

        if (event.which === ESCAPE_KEYCODE) {
          var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

      if (!items.length) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Dropdown;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + ' ' + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();
    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'modal';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    NAVBAR_TOGGLER: '.navbar-toggler'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Modal = function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    // getters

    // public

    Modal.prototype.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    Modal.prototype.show = function show(relatedTarget) {
      var _this10 = this;

      if (this._isTransitioning) {
        return;
      }

      if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: relatedTarget
      });

      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();
      this._setScrollbar();

      $(document.body).addClass(ClassName.OPEN);

      this._setEscapeEvent();
      this._setResizeEvent();

      $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
        return _this10.hide(event);
      });

      $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
        $(_this10._element).one(Event.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this10._element)) {
            _this10._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this10._showElement(relatedTarget);
      });
    };

    Modal.prototype.hide = function hide(event) {
      var _this11 = this;

      if (event) {
        event.preventDefault();
      }

      if (this._isTransitioning || !this._isShown) {
        return;
      }

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      var hideEvent = $.Event(Event.HIDE);

      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;

      this._setEscapeEvent();
      this._setResizeEvent();

      $(document).off(Event.FOCUSIN);

      $(this._element).removeClass(ClassName.SHOW);

      $(this._element).off(Event.CLICK_DISMISS);
      $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

      if (transition) {

        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this11._hideModal(event);
        }).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        this._hideModal();
      }
    };

    Modal.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);

      $(window, document, this._element, this._backdrop).off(EVENT_KEY);

      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._scrollbarWidth = null;
    };

    Modal.prototype.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    };

    // private

    Modal.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);
      Util.typeCheckConfig(NAME, config, DefaultType);
      return config;
    };

    Modal.prototype._showElement = function _showElement(relatedTarget) {
      var _this12 = this;

      var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // don't move modals dom position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';
      this._element.removeAttribute('aria-hidden');
      this._element.scrollTop = 0;

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this12._config.focus) {
          _this12._element.focus();
        }
        _this12._isTransitioning = false;
        $(_this12._element).trigger(shownEvent);
      };

      if (transition) {
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        transitionComplete();
      }
    };

    Modal.prototype._enforceFocus = function _enforceFocus() {
      var _this13 = this;

      $(document).off(Event.FOCUSIN) // guard against infinite focus loop
      .on(Event.FOCUSIN, function (event) {
        if (document !== event.target && _this13._element !== event.target && !$(_this13._element).has(event.target).length) {
          _this13._element.focus();
        }
      });
    };

    Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
      var _this14 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE) {
            event.preventDefault();
            _this14.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event.KEYDOWN_DISMISS);
      }
    };

    Modal.prototype._setResizeEvent = function _setResizeEvent() {
      var _this15 = this;

      if (this._isShown) {
        $(window).on(Event.RESIZE, function (event) {
          return _this15.handleUpdate(event);
        });
      } else {
        $(window).off(Event.RESIZE);
      }
    };

    Modal.prototype._hideModal = function _hideModal() {
      var _this16 = this;

      this._element.style.display = 'none';
      this._element.setAttribute('aria-hidden', true);
      this._isTransitioning = false;
      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName.OPEN);
        _this16._resetAdjustments();
        _this16._resetScrollbar();
        $(_this16._element).trigger(Event.HIDDEN);
      });
    };

    Modal.prototype._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    Modal.prototype._showBackdrop = function _showBackdrop(callback) {
      var _this17 = this;

      var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

      if (this._isShown && this._config.backdrop) {
        var doAnimate = Util.supportsTransitionEnd() && animate;

        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName.BACKDROP;

        if (animate) {
          $(this._backdrop).addClass(animate);
        }

        $(this._backdrop).appendTo(document.body);

        $(this._element).on(Event.CLICK_DISMISS, function (event) {
          if (_this17._ignoreBackdropClick) {
            _this17._ignoreBackdropClick = false;
            return;
          }
          if (event.target !== event.currentTarget) {
            return;
          }
          if (_this17._config.backdrop === 'static') {
            _this17._element.focus();
          } else {
            _this17.hide();
          }
        });

        if (doAnimate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName.SHOW);

        if (!callback) {
          return;
        }

        if (!doAnimate) {
          callback();
          return;
        }

        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName.SHOW);

        var callbackRemove = function callbackRemove() {
          _this17._removeBackdrop();
          if (callback) {
            callback();
          }
        };

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    };

    // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------

    Modal.prototype._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + 'px';
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + 'px';
      }
    };

    Modal.prototype._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    Modal.prototype._checkScrollbar = function _checkScrollbar() {
      this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    Modal.prototype._setScrollbar = function _setScrollbar() {
      var _this18 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set

        // Adjust fixed content padding
        $(Selector.FIXED_CONTENT).each(function (index, element) {
          var actualPadding = $(element)[0].style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this18._scrollbarWidth + 'px');
        });

        // Adjust navbar-toggler margin
        $(Selector.NAVBAR_TOGGLER).each(function (index, element) {
          var actualMargin = $(element)[0].style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) + _this18._scrollbarWidth + 'px');
        });

        // Adjust body padding
        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $('body').css('padding-right');
        $('body').data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + 'px');
      }
    };

    Modal.prototype._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      $(Selector.FIXED_CONTENT).each(function (index, element) {
        var padding = $(element).data('padding-right');
        if (typeof padding !== 'undefined') {
          $(element).css('padding-right', padding).removeData('padding-right');
        }
      });

      // Restore navbar-toggler margin
      $(Selector.NAVBAR_TOGGLER).each(function (index, element) {
        var margin = $(element).data('margin-right');
        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        }
      });

      // Restore body padding
      var padding = $('body').data('padding-right');
      if (typeof padding !== 'undefined') {
        $('body').css('padding-right', padding).removeData('padding-right');
      }
    };

    Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    };

    // static

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Modal;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this19 = this;

    var target = void 0;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this19).is(':visible')) {
          _this19.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };

  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  var Event = {
    ACTIVATE: 'activate' + EVENT_KEY,
    SCROLL: 'scroll' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  };

  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };

  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var ScrollSpy = function () {
    function ScrollSpy(element, config) {
      var _this20 = this;

      _classCallCheck(this, ScrollSpy);

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.LIST_ITEMS + ',') + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;

      $(this._scrollElement).on(Event.SCROLL, function (event) {
        return _this20._process(event);
      });

      this.refresh();
      this._process();
    }

    // getters

    // public

    ScrollSpy.prototype.refresh = function refresh() {
      var _this21 = this;

      var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

      this._offsets = [];
      this._targets = [];

      this._scrollHeight = this._getScrollHeight();

      var targets = $.makeArray($(this._selector));

      targets.map(function (element) {
        var target = void 0;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = $(targetSelector)[0];
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();
          if (targetBCR.width || targetBCR.height) {
            // todo (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }
        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this21._offsets.push(item[0]);
        _this21._targets.push(item[1]);
      });
    };

    ScrollSpy.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      $(this._scrollElement).off(EVENT_KEY);

      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    };

    // private

    ScrollSpy.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, Default, config);

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');
        if (!id) {
          id = Util.getUID(NAME);
          $(config.target).attr('id', id);
        }
        config.target = '#' + id;
      }

      Util.typeCheckConfig(NAME, config, DefaultType);

      return config;
    };

    ScrollSpy.prototype._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    ScrollSpy.prototype._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    ScrollSpy.prototype._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    ScrollSpy.prototype._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;
      var scrollHeight = this._getScrollHeight();
      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }
        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;
        this._clear();
        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    ScrollSpy.prototype._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',');
      queries = queries.map(function (selector) {
        return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
      });

      var $link = $(queries.join(','));

      if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
        $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        $link.addClass(ClassName.ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(ClassName.ACTIVE);
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ', ' + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE);
      }

      $(this._scrollElement).trigger(Event.ACTIVATE, {
        relatedTarget: target
      });
    };

    ScrollSpy.prototype._clear = function _clear() {
      $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
    };

    // static

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return ScrollSpy;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $(scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = ScrollSpy._jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Tab = function () {
    function Tab(element) {
      _classCallCheck(this, Tab);

      this._element = element;
    }

    // getters

    // public

    Tab.prototype.show = function show() {
      var _this22 = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var target = void 0;
      var previous = void 0;
      var listElement = $(this._element).closest(Selector.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        previous = $.makeArray($(listElement).find(Selector.ACTIVE));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event.HIDE, {
        relatedTarget: this._element
      });

      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = $(selector)[0];
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event.HIDDEN, {
          relatedTarget: _this22._element
        });

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: previous
        });

        $(previous).trigger(hiddenEvent);
        $(_this22._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    Tab.prototype.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };

    // private

    Tab.prototype._activate = function _activate(element, container, callback) {
      var _this23 = this;

      var active = $(container).find(Selector.ACTIVE)[0];
      var isTransitioning = callback && Util.supportsTransitionEnd() && active && $(active).hasClass(ClassName.FADE);

      var complete = function complete() {
        return _this23._transitionComplete(element, active, isTransitioning, callback);
      };

      if (active && isTransitioning) {
        $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      if (active) {
        $(active).removeClass(ClassName.SHOW);
      }
    };

    Tab.prototype._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
      if (active) {
        $(active).removeClass(ClassName.ACTIVE);

        var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName.ACTIVE);
        }

        active.setAttribute('aria-expanded', false);
      }

      $(element).addClass(ClassName.ACTIVE);
      element.setAttribute('aria-expanded', true);

      if (isTransitioning) {
        Util.reflow(element);
        $(element).addClass(ClassName.SHOW);
      } else {
        $(element).removeClass(ClassName.FADE);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

        var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
        if (dropdownElement) {
          $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    };

    // static

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  }();

  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($(this), 'show');
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
}(jQuery);

/* global Popper */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = function ($) {

  /**
   * Check for Popper dependency
   * Popper - https://popper.js.org
   */
  if (typeof Popper === 'undefined') {
    throw new Error('Bootstrap tooltips require Popper.js (https://popper.js.org)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp('(^|\\s)' + CLASS_PREFIX + '\\S+', 'g');

  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)'
  };

  var AttachmentMap = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };

  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip'
  };

  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };

  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Tooltip = function () {
    function Tooltip(element, config) {
      _classCallCheck(this, Tooltip);

      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null;

      // protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    // getters

    // public

    Tooltip.prototype.enable = function enable() {
      this._isEnabled = true;
    };

    Tooltip.prototype.disable = function disable() {
      this._isEnabled = false;
    };

    Tooltip.prototype.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    Tooltip.prototype.toggle = function toggle(event) {
      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {

        if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
          this._leave(null, this);
          return;
        }

        this._enter(null, this);
      }
    };

    Tooltip.prototype.dispose = function dispose() {
      clearTimeout(this._timeout);

      $.removeData(this.element, this.constructor.DATA_KEY);

      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;
      if (this._popper !== null) {
        this._popper.destroy();
      }
      this._popper = null;

      this.element = null;
      this.config = null;
      this.tip = null;
    };

    Tooltip.prototype.show = function show() {
      var _this24 = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);
      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);

        var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);

        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);

        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);
        this.addAttachmentClass(attachment);

        var container = this.config.container === false ? document.body : $(this.config.container);

        $(tip).data(this.constructor.DATA_KEY, this);

        if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $(tip).appendTo(container);
        }

        $(this.element).trigger(this.constructor.Event.INSERTED);

        this._popper = new Popper(this.element, tip, {
          placement: attachment,
          modifiers: {
            offset: {
              offset: this.config.offset
            },
            flip: {
              behavior: this.config.fallbackPlacement
            },
            arrow: {
              element: Selector.ARROW
            }
          },
          onCreate: function onCreate(data) {
            if (data.originalPlacement !== data.placement) {
              _this24._handlePopperPlacementChange(data);
            }
          },
          onUpdate: function onUpdate(data) {
            _this24._handlePopperPlacementChange(data);
          }
        });

        $(tip).addClass(ClassName.SHOW);

        // if this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
        if ('ontouchstart' in document.documentElement) {
          $('body').children().on('mouseover', null, $.noop);
        }

        var complete = function complete() {
          if (_this24.config.animation) {
            _this24._fixTransition();
          }
          var prevHoverState = _this24._hoverState;
          _this24._hoverState = null;

          $(_this24.element).trigger(_this24.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this24._leave(null, _this24);
          }
        };

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
        } else {
          complete();
        }
      }
    };

    Tooltip.prototype.hide = function hide(callback) {
      var _this25 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);
      var complete = function complete() {
        if (_this25._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this25._cleanTipClass();
        _this25.element.removeAttribute('aria-describedby');
        $(_this25.element).trigger(_this25.constructor.Event.HIDDEN);
        if (_this25._popper !== null) {
          _this25._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName.SHOW);

      // if this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support
      if ('ontouchstart' in document.documentElement) {
        $('body').children().off('mouseover', null, $.noop);
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {

        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    Tooltip.prototype.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    };

    // protected

    Tooltip.prototype.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    Tooltip.prototype.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + '-' + attachment);
    };

    Tooltip.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Tooltip.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());
      this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());
      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);
    };

    Tooltip.prototype.setElementContent = function setElementContent($element, content) {
      var html = this.config.html;
      if ((typeof content === 'undefined' ? 'undefined' : _typeof(content)) === 'object' && (content.nodeType || content.jquery)) {
        // content is a DOM node or a jQuery
        if (html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }
      } else {
        $element[html ? 'html' : 'text'](content);
      }
    };

    Tooltip.prototype.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    };

    // private

    Tooltip.prototype._getAttachment = function _getAttachment(placement) {
      return AttachmentMap[placement.toUpperCase()];
    };

    Tooltip.prototype._setListeners = function _setListeners() {
      var _this26 = this;

      var triggers = this.config.trigger.split(' ');

      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this26.element).on(_this26.constructor.Event.CLICK, _this26.config.selector, function (event) {
            return _this26.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this26.constructor.Event.MOUSEENTER : _this26.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this26.constructor.Event.MOUSELEAVE : _this26.constructor.Event.FOCUSOUT;

          $(_this26.element).on(eventIn, _this26.config.selector, function (event) {
            return _this26._enter(event);
          }).on(eventOut, _this26.config.selector, function (event) {
            return _this26._leave(event);
          });
        }

        $(_this26.element).closest('.modal').on('hide.bs.modal', function () {
          return _this26.hide();
        });
      });

      if (this.config.selector) {
        this.config = $.extend({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    Tooltip.prototype._fixTitle = function _fixTitle() {
      var titleType = _typeof(this.element.getAttribute('data-original-title'));
      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    Tooltip.prototype._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    Tooltip.prototype._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;

      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);

      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    Tooltip.prototype._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    Tooltip.prototype._getConfig = function _getConfig(config) {
      config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

      if (config.delay && typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (config.title && typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (config.content && typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    };

    Tooltip.prototype._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    Tooltip.prototype._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    Tooltip.prototype._handlePopperPlacementChange = function _handlePopperPlacementChange(data) {
      this._cleanTipClass();
      this.addAttachmentClass(this._getAttachment(data.placement));
    };

    Tooltip.prototype._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;
      if (tip.getAttribute('x-placement') !== null) {
        return;
      }
      $(tip).removeClass(ClassName.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    };

    // static

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Tooltip;
  }();

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
}(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.0.0-beta';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var CLASS_PREFIX = 'bs-popover';
  var BSCLS_PREFIX_REGEX = new RegExp('(^|\\s)' + CLASS_PREFIX + '\\S+', 'g');

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    SHOW: 'show'
  };

  var Selector = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };
  var Popover = function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    function Popover() {
      _classCallCheck(this, Popover);

      return _possibleConstructorReturn(this, _Tooltip.apply(this, arguments));
    }

    // overrides

    Popover.prototype.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    Popover.prototype.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + '-' + attachment);
    };

    Popover.prototype.getTipElement = function getTipElement() {
      return this.tip = this.tip || $(this.config.template)[0];
    };

    Popover.prototype.setContent = function setContent() {
      var $tip = $(this.getTipElement());

      // we use append for html objects to maintain js events
      this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
      this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

      $tip.removeClass(ClassName.FADE + ' ' + ClassName.SHOW);
    };

    // private

    Popover.prototype._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
    };

    Popover.prototype._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);
      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    // static

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY);
        var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : null;

        if (!data && /destroy|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (data[config] === undefined) {
            throw new Error('No method named "' + config + '"');
          }
          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: 'VERSION',


      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  }(Tooltip);

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
}(jQuery);


})();
/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
( function() {
	var isWebkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
	    isOpera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
	    isIe     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

	if ( ( isWebkit || isOpera || isIe ) && document.getElementById && window.addEventListener ) {
		window.addEventListener( 'hashchange', function() {
			var id = location.hash.substring( 1 ),
				element;

			if ( ! ( /^[A-z0-9_-]+$/.test( id ) ) ) {
				return;
			}

			element = document.getElementById( id );

			if ( element ) {
				if ( ! ( /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) ) ) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false );
	}
})();

(function ( $ ) { 
$.fn.easeScroll = function(options) {
    ! function() {
        function e() {
            var e = !1;
            e && c("keydown", r), v.keyboardSupport && !e && u("keydown", r)
        }

        function t() {
            if (document.body) {
                var t = document.body,
                    o = document.documentElement,
                    n = window.innerHeight,
                    r = t.scrollHeight;
                if (S = document.compatMode.indexOf("CSS") >= 0 ? o : t, w = t, e(), x = !0, top != self) y = !0;
                else if (r > n && (t.offsetHeight <= n || o.offsetHeight <= n)) {
                    var a = !1,
                        i = function() {
                            a || o.scrollHeight == document.height || (a = !0, setTimeout(function() {
                                o.style.height = document.height + "px", a = !1
                            }, 100))
                        };
                    if (o.style.height = "auto", setTimeout(i, 10), S.offsetHeight <= n) {
                        var l = document.createElement("div");
                        l.style.clear = "both", t.appendChild(l)
                    }
                }
                v.fixedBackground || b || (t.style.backgroundAttachment = "scroll", o.style.backgroundAttachment = "scroll")
            }
        }

        function o(e, t, o, n) {
            if (n || (n = 1e3), d(t, o), 1 != v.accelerationMax) {
                var r = +new Date,
                    a = r - C;
                if (a < v.accelerationDelta) {
                    var i = (1 + 30 / a) / 2;
                    i > 1 && (i = Math.min(i, v.accelerationMax), t *= i, o *= i)
                }
                C = +new Date
            }
            if (M.push({
                x: t,
                y: o,
                lastX: 0 > t ? .99 : -.99,
                lastY: 0 > o ? .99 : -.99,
                start: +new Date
            }), !T) {
                var l = e === document.body,
                    u = function() {
                        for (var r = +new Date, a = 0, i = 0, c = 0; c < M.length; c++) {
                            var s = M[c],
                                d = r - s.start,
                                f = d >= v.animationTime,
                                h = f ? 1 : d / v.animationTime;
                            v.pulseAlgorithm && (h = p(h));
                            var m = s.x * h - s.lastX >> 0,
                                w = s.y * h - s.lastY >> 0;
                            a += m, i += w, s.lastX += m, s.lastY += w, f && (M.splice(c, 1), c--)
                        }
                        l ? window.scrollBy(a, i) : (a && (e.scrollLeft += a), i && (e.scrollTop += i)), t || o || (M = []), M.length ? E(u, e, n / v.frameRate + 1) : T = !1
                    };
                E(u, e, 0), T = !0
            }
        }

        function n(e) {
            x || t();
            var n = e.target,
                r = l(n);
            if (!r || e.defaultPrevented || s(w, "embed") || s(n, "embed") && /\.pdf/i.test(n.src)) return !0;
            var a = e.wheelDeltaX || 0,
                i = e.wheelDeltaY || 0;
            return a || i || (i = e.wheelDelta || 0), !v.touchpadSupport && f(i) ? !0 : (Math.abs(a) > 1.2 && (a *= v.stepSize / 120), Math.abs(i) > 1.2 && (i *= v.stepSize / 120), o(r, -a, -i), void e.preventDefault())
        }

        function r(e) {
            var t = e.target,
                n = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== H.spacebar;
            if (/input|textarea|select|embed/i.test(t.nodeName) || t.isContentEditable || e.defaultPrevented || n) return !0;
            if (s(t, "button") && e.keyCode === H.spacebar) return !0;
            var r, a = 0,
                i = 0,
                u = l(w),
                c = u.clientHeight;
            switch (u == document.body && (c = window.innerHeight), e.keyCode) {
                case H.up:
                    i = -v.arrowScroll;
                    break;
                case H.down:
                    i = v.arrowScroll;
                    break;
                case H.spacebar:
                    r = e.shiftKey ? 1 : -1, i = -r * c * .9;
                    break;
                case H.pageup:
                    i = .9 * -c;
                    break;
                case H.pagedown:
                    i = .9 * c;
                    break;
                case H.home:
                    i = -u.scrollTop;
                    break;
                case H.end:
                    var d = u.scrollHeight - u.scrollTop - c;
                    i = d > 0 ? d + 10 : 0;
                    break;
                case H.left:
                    a = -v.arrowScroll;
                    break;
                case H.right:
                    a = v.arrowScroll;
                    break;
                default:
                    return !0
            }
            o(u, a, i), e.preventDefault()
        }

        function a(e) {
            w = e.target
        }

        function i(e, t) {
            for (var o = e.length; o--;) z[N(e[o])] = t;
            return t
        }

        function l(e) {
            var t = [],
                o = S.scrollHeight;
            do {
                var n = z[N(e)];
                if (n) return i(t, n);
                if (t.push(e), o === e.scrollHeight) {
                    if (!y || S.clientHeight + 10 < o) return i(t, document.body)
                } else if (e.clientHeight + 10 < e.scrollHeight && (overflow = getComputedStyle(e, "").getPropertyValue("overflow-y"), "scroll" === overflow || "auto" === overflow)) return i(t, e)
            } while (e = e.parentNode)
        }

        function u(e, t, o) {
            window.addEventListener(e, t, o || !1)
        }

        function c(e, t, o) {
            window.removeEventListener(e, t, o || !1)
        }

        function s(e, t) {
            return (e.nodeName || "").toLowerCase() === t.toLowerCase()
        }

        function d(e, t) {
            e = e > 0 ? 1 : -1, t = t > 0 ? 1 : -1, (k.x !== e || k.y !== t) && (k.x = e, k.y = t, M = [], C = 0)
        }

        function f(e) {
            if (e) {
                e = Math.abs(e), D.push(e), D.shift(), clearTimeout(A);
                var t = D[0] == D[1] && D[1] == D[2],
                    o = h(D[0], 120) && h(D[1], 120) && h(D[2], 120);
                return !(t || o)
            }
        }

        function h(e, t) {
            return Math.floor(e / t) == e / t
        }

        function m(e) {
            var t, o, n;
            return e *= v.pulseScale, 1 > e ? t = e - (1 - Math.exp(-e)) : (o = Math.exp(-1), e -= 1, n = 1 - Math.exp(-e), t = o + n * (1 - o)), t * v.pulseNormalize
        }

        function p(e) {
            return e >= 1 ? 1 : 0 >= e ? 0 : (1 == v.pulseNormalize && (v.pulseNormalize /= m(1)), m(e))
        }

        var settings = $.extend({
            // These are the defaults.
            frameRate: 60,
            animationTime: 1000,
            stepSize: 120,
            pulseAlgorithm: !0,
            pulseScale: 8,
            pulseNormalize: 1,
            accelerationDelta: 20,
            accelerationMax: 1,
            keyboardSupport: !0,
            arrowScroll: 50,
            touchpadSupport: !0,
            fixedBackground: !0
        }, options );

        var w, g = {
            frameRate: settings.frameRate,
            animationTime: settings.animationTime,
            stepSize: settings.stepSize,
            pulseAlgorithm: settings.pulseAlgorithm,
            pulseScale: settings.pulseScale,
            pulseNormalize: settings.pulseNormalize,
            accelerationDelta: settings.accelerationDelta,
            accelerationMax: settings.accelerationMax,
            keyboardSupport: settings.keyboardSupport,
            arrowScroll: settings.arrowScroll,
            touchpadSupport: settings.touchpadSupport,
            fixedBackground: settings.fixedBackground,
            excluded: ""
        },
            v = g,
            b = !1,
            y = !1,
            k = {
                x: 0,
                y: 0
            },
            x = !1,
            S = document.documentElement,
            D = [120, 120, 120],
            H = {
                left: 37,
                up: 38,
                right: 39,
                down: 40,
                spacebar: 32,
                pageup: 33,
                pagedown: 34,
                end: 35,
                home: 36
            },
            v = g,
            M = [],
            T = !1,
            C = +new Date,
            z = {};
        setInterval(function() {
            z = {}
        }, 1e4);
        var A, N = function() {
                var e = 0;
                return function(t) {
                    return t.uniqueID || (t.uniqueID = e++)
                }
            }(),
            E = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(e, t, o) {
                    window.setTimeout(e, o || 1e3 / 60)
                }
            }(),
            K = /chrome|iPad/i.test(window.navigator.userAgent),
            L = "onmousewheel" in document;
        L && K && (u("mousedown", a), u("mousewheel", n), u("load", t))
    }();
}


}( jQuery ));
/*!
 * Masonry PACKAGED v4.2.0
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,a){function h(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,h){var u=a.data(h,i);if(!u)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var d=u[e];if(!d||"_"==e.charAt(0))return void s(r+" is not a valid method");var l=d.apply(u,n);o=void 0===o?l:o}),void 0!==o?o:t}function u(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return h(this,t,e)}return u(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;u>e;e++){var i=h[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);r.isBoxSizeOuter=s=200==t(o.width),i.removeChild(e)}}function r(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var r=n(e);if("none"==r.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==r.boxSizing,l=0;u>l;l++){var c=h[l],f=r[c],m=parseFloat(f);a[c]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,y=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,z=a.borderTopWidth+a.borderBottomWidth,E=d&&s,b=t(r.width);b!==!1&&(a.width=b+(E?0:p+_));var x=t(r.height);return x!==!1&&(a.height=x+(E?0:g+z)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(g+z),a.outerWidth=a.width+y,a.outerHeight=a.height+v,a}}var s,a="undefined"==typeof console?e:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],u=h.length,d=!1;return r}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"object"==typeof t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,o){i.docReady(function(){var r=i.toDashed(o),s="data-"+r,a=document.querySelectorAll("["+s+"]"),h=document.querySelectorAll(".js-"+r),u=i.makeArray(a).concat(i.makeArray(h)),d=s+"-options",l=t.jQuery;u.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(d);try{i=r&&JSON.parse(r)}catch(a){return void(n&&n.error("Error parsing "+s+" on "+t.className+": "+a))}var h=new e(t,i);l&&l.data(t,o,h)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var r=document.documentElement.style,s="string"==typeof r.transition?"transition":"WebkitTransition",a="string"==typeof r.transform?"transform":"WebkitTransform",h={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[s],u={transform:a,transition:s,transitionDuration:s+"Duration",transitionProperty:s+"Property",transitionDelay:s+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=u[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],r=this.layout.size,s=-1!=n.indexOf("%")?parseFloat(n)/100*r.width:parseInt(n,10),a=-1!=o.indexOf("%")?parseFloat(o)/100*r.height:parseInt(o,10);s=isNaN(s)?0:s,a=isNaN(a)?0:a,s-=e?r.paddingLeft:r.paddingRight,a-=i?r.paddingTop:r.paddingBottom,this.position.x=s,this.position.y=a},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",r=i?"left":"right",s=i?"right":"left",a=this.position.x+t[o];e[r]=this.getXValue(a),e[s]="";var h=n?"paddingTop":"paddingBottom",u=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[h];e[u]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=parseInt(t,10),r=parseInt(e,10),s=o===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return void this.layoutPosition();var a=t-i,h=e-n,u={};u.transform=this.getTranslate(a,h),this.transition({to:u,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(h,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var c={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=c[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(h,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var f={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(f)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return s&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function r(t,e){var i=n.getQueryElement(t);if(!i)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,u&&(this.$element=u(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,c[o]=this,this._create();var r=this._getOption("initLayout");r&&this.layout()}function s(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=m[n]||1;return i*o}var h=t.console,u=t.jQuery,d=function(){},l=0,c={};r.namespace="outlayer",r.Item=o,r.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var f=r.prototype;n.extend(f,e.prototype),f.option=function(t){n.extend(this.options,t)},f._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},r.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},f._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},f.reloadItems=function(){this.items=this._itemize(this.element.children)},f._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var r=e[o],s=new i(r,this);n.push(s)}return n},f._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},f.getItemElements=function(){return this.items.map(function(t){return t.element})},f.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},f._init=f.layout,f._resetLayout=function(){this.getSize()},f.getSize=function(){this.size=i(this.element)},f._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},f.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},f._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},f._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},f._getItemLayoutPosition=function(){return{x:0,y:0}},f._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},f.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},f._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},f._postLayout=function(){this.resizeContainer()},f.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},f._getContainerSize=d,f._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},f._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){s++,s==r&&i()}var o=this,r=e.length;if(!e||!r)return void i();var s=0;e.forEach(function(e){e.once(t,n)})},f.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),u)if(this.$element=this.$element||u(this.element),e){var o=u.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},f.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},f.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},f.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},f.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},f._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},f._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},f._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},f._manageStamp=d,f._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),r={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return r},f.handleEvent=n.handleEvent,f.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},f.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},f.onresize=function(){this.resize()},n.debounceMethod(r,"onresize",100),f.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},f.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},f.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},f.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},f.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},f.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},f.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},f.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},f.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},f.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},f.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},f.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},f.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete c[e],delete this.element.outlayerGUID,u&&u.removeData(this.element,this.constructor.namespace)},r.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&c[e]},r.create=function(t,e){var i=s(r);return i.defaults=n.extend({},r.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},r.compatOptions),i.namespace=t,i.data=r.data,i.Item=s(o),n.htmlInit(i,t),u&&u.bridget&&u.bridget(t,i),i};var m={ms:1,s:1e3};return r.Item=o,r}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var n=i.prototype;return n._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},n.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,r=o/n,s=n-o%n,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},n.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},n._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",r=this[o](n,t),s={x:this.columnWidth*r.col,y:r.y},a=r.y+t.size.outerHeight,h=n+r.col,u=r.col;h>u;u++)this.colYs[u]=a;return s},n._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},n._getTopColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++)e[n]=this._getColGroupY(n,t);return e},n._getColGroupY=function(t,e){if(2>e)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},n._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,n=t>1&&i+t>this.cols;i=n?0:i;var o=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=o?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},n._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),r=o?n.left:n.right,s=r+i.outerWidth,a=Math.floor(r/this.columnWidth);a=Math.max(0,a);var h=Math.floor(s/this.columnWidth);h-=s%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var u=this._getOption("originTop"),d=(u?n.top:n.bottom)+i.outerHeight,l=a;h>=l;l++)this.colYs[l]=Math.max(d,this.colYs[l])},n._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},n._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},n.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i});

jQuery(function($){
    var col_width = $(".container").css("width");
    var $window = $(window);
    var winWidth = $window.width();
    var hasAdminBar = $('body').children('#wpadminbar').length > 0;
    var hasFixedAdminBar = false;

    if(hasAdminBar && $("#wpadminbar").css('position') == 'fixed'){
        hasFixedAdminBar = true;
    }


    resizeContent();
    
    $("html").easeScroll({
        frameRate: 45,
        animationTime: 1000,
        touchpadSupport: true
    });

    $(window).resize(function(){
        resizeContent();
        col_width = $(".container").css("width");
        getMasonryColWidth();
    });


    // Parallax background effect
	$('section[data-type="background"]').each(function(){
		var $bgObj = $(this);
		$window.scroll(function() {
            var scroller = 100;
			var yPosition = -($window.scrollTop() / $bgObj.data('speed'));
			var coords = '50% ' + yPosition + 'px';
            $bgObj.css({backgroundPosition: coords});
		});
    });

    
    $('.navbar-nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').fadeIn(150);
    }, function() {
        $(this).find('.dropdown-menu').fadeOut(150);
    });
    


    var mcol_width;
    $('.grid').masonry({
        // options
        itemSelector: '.grid-item',
        columnWidth: mcol_width,
        horizontalOrder: true
    });



    $(".loader").fadeOut(1000);



    var navpos = $('.pt-main-nav').css('top');
    navpos = navpos.replace('px', '');
    if(hasAdminBar){
        var adminNavheight =  $("#wpadminbar").css('height').replace('px', '');
        getNavBarPosition();
    }
    
    $window.scroll(function() {
        if(hasAdminBar){
            if( navpos > 0 && !hasFixedAdminBar){
                navpos-=5;
                $('.pt-main-nav').css('top', navpos);
            }
    
            if(navpos <= 0){
                navpos = 0;
                $('.pt-main-nav').css('top', navpos);
            }
    
            if($window.scrollTop() == 0 && !hasFixedAdminBar){
                navpos = 46;
                $('.pt-main-nav').css('top', 46);
            }
        }

        if ( $window.scrollTop() >= 450 ) {
            $(".s-wrapper").fadeIn(1000);
        } else {
            $(".s-wrapper").fadeOut(1000);
        }
    });

    $(".scroll-to-top").click(function(){
        $('html, body').animate({scrollTop : 0},800);
		return false;
    });



function resizeContent() {
    $height = $(window).height()-5;
    $('.feature-hero').height($height);
    $('.feature-hero .fill-bg-dark').height($height)
    winWidth = $(window).width();
    
    if(hasAdminBar){
        getNavBarPosition();
    }
}

function getMasonryColWidth(){
    temp_container_width = col_width.replace('px','');
    if(temp_container_width >= 1140 ){
        mcol_width = 1140/4;
    } else if(temp_container_width >= 960 ){
        mcol_width = temp_container_width/2;
    } else {
        mcol_width = temp_container_width;
    }
}

function getNavBarPosition(){
    adminNavheight = $("#wpadminbar").css('height').replace('px', '');
    if($("#wpadminbar").css('position') === 'fixed'){
        hasFixedAdminBar = true;
        navpos = adminNavheight;
        if( adminNavheight == 46)
            $('.pt-main-nav').css('top', 46);
        else 
            $('.pt-main-nav').css('top', 32);
    } else {
        hasFixedAdminBar = false;
        if($(window).scrollTop() <= 32 ){
            navpos = 46;
            $('.pt-main-nav').css('top', navpos);
        } else {
            navpos = 0;
            $('.pt-main-nav').css('top', navpos);
        }
    }
}


})

