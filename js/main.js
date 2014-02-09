// Generated by CoffeeScript 1.7.1
TimelineLite.prototype.addDelay = function(delay, position) {
  switch ($.type(position)) {
    case 'undefined':
    case 'null':
      return this.set({}, {}, "+=" + delay);
    case 'string':
      return this.set({}, {}, "" + position + "+=" + delay);
    case 'number':
      return this.set({}, {}, delay + position);
    default:
      return console.log("BAD POSITION TYPE for addDelay!");
  }
};

$(function() {
  var $faq, $firstImg, $firstTxt, $service, $slides, $subtitle, $tagline, IMG_WIDTH, SLIDE_IMG_CENTER, SLIDE_PADDING, SLIDE_TXT_CENTER, SLIDE_TXT_LEFT, SLIDE_TXT_PADDING, STAGGER_AMOUNT, TIME_FOR_IMG_DISPLAY, TIME_PER_ANIMATION, TXT_MARGIN, debug, fadeIn, fadeOut, fragment, navBoundary, navNeedsUpdate, tl;
  $(".faq h3").next().hide();
  $(".faq h3").wrap('<a href="#"></a>').click(function(a, obj) {
    var _ref;
    $(this).parent().next().slideToggle({
      duration: "fast",
      complete: (_ref = obj != null ? obj.done : void 0) != null ? _ref : function() {}
    });
    return false;
  });
  $service = $('#service');
  $subtitle = $('#subtitle');
  $tagline = $('#serviceTagline');
  $firstImg = $('.slideshow img').first();
  $firstTxt = $('.slideshow span').first();
  debug = void 0;
  TIME_PER_ANIMATION = 1;
  TIME_FOR_IMG_DISPLAY = 5;
  STAGGER_AMOUNT = TIME_PER_ANIMATION + TIME_FOR_IMG_DISPLAY;
  SLIDE_PADDING = 100;
  SLIDE_TXT_PADDING = $firstTxt.outerHeight(true);
  TXT_MARGIN = ($tagline.outerHeight(true) - $tagline.outerHeight(false)) / 2;
  SLIDE_TXT_CENTER = $subtitle.outerHeight(true) + TXT_MARGIN;
  SLIDE_TXT_LEFT = $service.offset().left;
  IMG_WIDTH = $firstImg.width();
  if ($firstImg.parent().offset().left === $subtitle.offset().left) {
    SLIDE_IMG_CENTER = Math.max($subtitle.width() / 2 - IMG_WIDTH / 2, 0);
  } else {
    SLIDE_IMG_CENTER = 0;
  }
  tl = new TimelineMax({
    repeat: -1,
    paused: true
  });
  fadeIn = function(elements, endLocs, t) {
    var $el, idx, _i, _len, _ref, _results;
    if (elements.length == null) {
      _ref = [[elements], [endLocs]], elements = _ref[0], endLocs = _ref[1];
    }
    _results = [];
    for (idx = _i = 0, _len = elements.length; _i < _len; idx = ++_i) {
      $el = elements[idx];
      if ($el.css('visibility') === 'hidden') {
        if (debug != null) {
          console.log("" + t + ": " + (new Date()) + " fadeIn : " + ($el.attr('src')));
        }
        _results.push(TweenMax.to($el, TIME_PER_ANIMATION, $.extend({}, endLocs[idx], {
          autoAlpha: 1
        })));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };
  fadeOut = function(elements, endLocs, t) {
    var _$el, _i, _idx, _len, _ref, _results;
    if (elements.length == null) {
      _ref = [[elements], [endLocs]], elements = _ref[0], endLocs = _ref[1];
    }
    _results = [];
    for (_idx = _i = 0, _len = elements.length; _i < _len; _idx = ++_i) {
      _$el = elements[_idx];
      _results.push((function() {
        var $el, dir, idx, resetLoc, _ref1;
        _ref1 = [_$el, _idx], $el = _ref1[0], idx = _ref1[1];
        if ($el.css('visibility') !== 'hidden') {
          if (debug != null) {
            console.log("" + t + ": " + (new Date()) + " fadeOut: " + ($el.attr('src')));
          }
          resetLoc = $.extend({}, endLocs[idx]);
          dir = Object.keys(resetLoc)[0];
          resetLoc[dir] = endLocs[idx][dir] + 2 * ($el.position()[dir] - endLocs[idx][dir]);
          return TweenMax.to($el, TIME_PER_ANIMATION, $.extend({}, endLocs[idx], {
            autoAlpha: 0,
            onComplete: function() {
              return $el.css(resetLoc);
            }
          }));
        } else if (debug != null) {
          return console.log("" + t + ": " + (new Date()) + " fadeOut: " + ($el.attr('src')) + " SKIPPING CAUSE: " + ($el.css('visibility')));
        }
      })());
    }
    return _results;
  };
  $slides = $('.slideshow > div');
  $slides.each(function(idx, el) {
    var $img, $text, endImgLoc, endTxtLoc, objs, pt1, pt2, startImgLoc, startTxtLoc, _ref, _ref1;
    _ref = objs = [$(el).find('img'), $(el).find('span')], $img = _ref[0], $text = _ref[1];
    _ref1 = [idx * STAGGER_AMOUNT, STAGGER_AMOUNT + (idx * STAGGER_AMOUNT)], pt1 = _ref1[0], pt2 = _ref1[1];
    if (debug != null) {
      console.log("" + idx + ": [pt1=" + pt1 + ", pt2=" + pt2 + "]");
    }
    $img.css({
      left: startImgLoc = IMG_WIDTH + SLIDE_PADDING
    });
    $text.css({
      top: startTxtLoc = SLIDE_TXT_CENTER + SLIDE_TXT_PADDING
    });
    $text.offset({
      left: SLIDE_TXT_LEFT
    });
    endImgLoc = -startImgLoc;
    endTxtLoc = startTxtLoc - 2 * SLIDE_TXT_PADDING;
    tl.addCallback(fadeIn, pt1, [
      objs, [
        {
          left: SLIDE_IMG_CENTER
        }, {
          top: SLIDE_TXT_CENTER
        }
      ], pt1
    ]);
    if (idx + 1 === $slides.length) {
      tl.addCallback(fadeOut, 0, [
        objs, [
          {
            left: endImgLoc
          }, {
            top: endTxtLoc
          }
        ], 0
      ]);
      return tl.addDelay(TIME_FOR_IMG_DISPLAY, pt1);
    } else {
      return tl.addCallback(fadeOut, pt2, [
        objs, [
          {
            left: endImgLoc
          }, {
            top: endTxtLoc
          }
        ], pt2
      ]);
    }
  });
  tl.play();
  fragment = window.location.hash.slice(1);
  $.scrollTo(0);
  if (fragment && ($faq = $(".faq h3[name='" + fragment + "']")).length !== 0) {
    $.scrollTo($faq, {
      duration: 500,
      margin: true,
      onAfter: function() {
        return $faq.trigger('click', {
          done: function() {
            return TweenMax.to($(this), 0.5, {
              backgroundColor: "yellow",
              onComplete: (function(_this) {
                return function() {
                  return TweenMax.to($(_this), 0.5, {
                    backgroundColor: "inherit"
                  });
                };
              })(this)
            });
          }
        });
      }
    });
  }
  navBoundary = 100;
  navNeedsUpdate = (function() {
    var prevPos;
    prevPos = $(window).scrollTop();
    return function() {
      var curPos, update;
      curPos = $(window).scrollTop();
      update = curPos < navBoundary ? prevPos > navBoundary : prevPos < navBoundary;
      return update && (prevPos = curPos);
    };
  })();
  return $(window).scroll(function() {
    var pos;
    if (typeof (pos = navNeedsUpdate()) === 'number') {
      return TweenMax.to($('nav'), 0.4, {
        overwrite: true,
        autoAlpha: pos >= navBoundary ? 1 : 0
      });
    }
  });
});
