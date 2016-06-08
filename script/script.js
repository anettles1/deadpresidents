/*Custom JS goes here*/

/*Script for slide show*/
var counter = 0, // to keep track of current slide
    $items = $('.diy-slideshow figure'), // a collection of all of the slides, caching for performance
    numItems = $items.length; // total number of slides

// this function is what cycles the slides, showing the next or previous slide and hiding all the others
var showCurrent = function(){
    var itemToShow = Math.abs(counter%numItems);// uses remainder (aka modulo) operator to get the actual index of the element to show  
   
  $items.removeClass('show'); // remove .show from whichever element currently has it
  $items.eq(itemToShow).addClass('show');    
};

// add click events to prev & next buttons 
$('.next').on('click', function(){
    counter++;
    showCurrent(); 
});
$('.prev').on('click', function(){
    counter--;
    showCurrent(); 
});

// if touch events are supported then add swipe interactions using TouchSwipe https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
if('ontouchstart' in window){
  $('.diy-slideshow').swipe({
    swipeLeft:function() {
      counter++;
      showCurrent(); 
    },
    swipeRight:function() {
      counter--;
      showCurrent(); 
    }
  });
}

/*Script for charts*/

/*Customer cash payment preference by household income groups*/
var chart = c3.generate({
    bindto: d3.select('#incomeprefchart'),
    padding: {
        bottom: 20,
    },
    data: {
        columns: [
            ['Usage', 57, 33, 33, 33, 35, 33,33],
            ['Preference', 55, 29, 22, 16, 16, 14, 10],
        ],
        types: {
            Usage: 'bar',
            Preference: 'line',
        },
        axes: {
          Usage: 'y',
          Preference: 'y2'
        }
    },
    axis: {
        y:{
            label:'% of monthly transactions',
            max: 59,
            min: 6
        },
        y2: {
            show: true,
            label:'% of customers',
            max: 59,
            min: 6
        },

        x : {
            label: {
                text: '2012 Cash Usage and Preference by Household Income',
                position: 'outer-center'
            },
            type : 'category',
            categories: ['Less than $25K', '$25K to $50K', '$50K to $75K', '$75K to $100K', '$100K to $125K','$125K to $200K', '$200K Plus'],
        },
    },

    grid: {
        y: {
            lines: [
                {value: 33, text: 'one third of monthly transactions', axis:'y1', position:'middle'},
                ]
            },
    },

    color:{
        pattern: ['#484a51','#fec627']
    },
});


/*Non-bill payments payment use by transaction amount; WIP to get the 'Cash', 'Check', 'Credit', 'Debit', 'Other' to show instead of 1, 2, 3, 4, 5*/
var chart = c3.generate({
    bindto: d3.select('#nonbilltranschart'),

    data: {
        columns: [
            ['Cash', 66.0, 47.0, 26.2, 19.1, 16.3 ],
            ['Check', 0.3, 2.8, 5.7, 7.0, 15.5 ],
            ['Credit Card', 10.2, 19.9, 26.7, 31.6, 31.9],
            ['Debit Card',18.4, 27.6, 36.4, 38.0, 27.0 ],
            ['Other', 5.1, 2.7, 5.0, 4.4, 9.2]
            
        ],
        type: 'bar',
        groups: [
            ['Cash', 'Check', 'Credit Card', 'Debit Card', 'Other']
        ]
    },

    grid: {
        y: {
            show:true
        },
        x:{
            show:true
        }
    },

    color:{
        pattern: ['#9bb26c','#2a2b2f', '#484a51', '#6c6f7a', '#fec627']
    },

    axis: {
        x: {
            type: 'category',
            categories: ['$0 to $9.99', '$10 to $24.99', '$25 to $49.99', '$50 to $99.99', '$100 and over']
        },
        y:{
          label:'%',
          max:100,
          min:10

        }
    }
});


/*Non-bill payments payment use by payment type; will copy from #nonbilltranschart once I figure that part out*/

/*Total payments by percentage share*/
var chart = c3.generate({
  bindto: d3.select('#totpaychart'),
  data: {
    x: 'x',
    columns: [
      ['x', '2011', '2012', '2013'],
      ['Check', 9.8,9.5,8.4],
      ['Credit or Charge', 20.3,21.6,22.5],
      ['Debit', 30.5,29.9,31.1],     
      ['Cash', 27.6,26.8,26.3],
      ['Money Order', .5,0.8,0.5],
      ['Prepaid', 0.8,1.2,1]
    ],
    type: 'bar',
  },
  color:{
        pattern: ['#2a2b2f', '#484a51', '#6c6f7a','#9599a5', '#9bb26c', '#47582c', '#fec627' ]
      },
  grid: {
        y: {
            show:true
        },
        x:{
            show:true
        }
    },
  axis: {
  x: {
    label: {
       text: 'Year',
       position: 'outer-center',
          },
      },
  y: {
     label:'% of Consumer Payments',
        },
  
  },
  grid: {
        y: {
            show:true
        },
       
    },                  
});


/*Mobile Payments*/
var chart = c3.generate({
  bindto: d3.select('#mobilechart'),
  data: {
    x: 'x',
    columns: [
      ['x','2011', '2012', '2013'],
      ['Used mobile phone with a web browser', 8.2,12, 21.7],
      ['Used a mobile app', 6,7,8.1],
      ['Text/SMS', 2.2, 2.8, 12.2],
      ['Scanned a barcode', 2.2, 2, 6.7],
      ['Contactless', 1.3, 1, 2.1],
      ['Swiped card in device attached to mobile phone', 0, 6.4,20.5],
      ['Made an in app purchase', 0, 0, 10.8]
   ],
    type: 'bar',
  },
 
  axis: {
    x: {
      label: {
         text: 'Year',
         position: 'outer-center',
            }
        },
    y: {
       label: {
         text: '% of Consumer Payments',
       }
          },
  },
  grid: {
        y: {
            show:true
        }
       
    },      
  color:{
        pattern: ['#2a2b2f', '#484a51', '#6c6f7a','#9599a5', '#babdc4', '#9bb26c', '#fec627' ]
    }
});


/*Share of consumer payments by type*/
var chart = c3.generate({
  bindto: d3.select('#sharechart'),
  data: {
    x: 'x',
    columns: [
      ['x', '2008', '2009', '2010', '2011', '2012', '2013'],
      ['Debit Card', 30.14, 28.92, 31.33, 30.53, 29.93, 31.15],
      ['Cash', 21.83,30.09,28.62,27.6,26.76,26.35],
    ['Credit Card', 20.87,17.08,18.21,20.31,21.63,22.54],
    ['Check', 13.38,12.18,10.25,9.8,9.51,8.41],
    ['Banking', 11.2,8.86,9.01,9.39,9.39,9.21]  
    ]
  },
  color:{
        pattern: ['#6c6f7a', '#9bb26c','#484a51','#2a2b2f', '#fec627']
  },
  axis: {
  x: {
    label: {
       text: 'Share of Consumer Payments by Payment Type, 2008-2013',
       position: 'outer-center',
       }
      },
  y: {
     label: {
       text: '% of Consumer Payments',
     }
        },
  },
   grid: {
        x: {
            lines:[ 
                {value:'2009', text:'Cash outpaced other payment types', position:'middle'},
               ] ,
            show:true

            },
    },                
});

/*non-bill type chart*/
var chart = c3.generate({
    bindto: d3.select('#nonbilltypechart'),
    data: {
        columns: [
            ['Cash', 24.1, 46.1],
            ['Check', 14.1, 3.6],
            ['Credit Card', 27.6, 19.2],
            ['Debit Card', 27.9, 26.4],
            ['Other', 6.3, 4.8]        
        ],
        type: 'bar',
        groups: [
            ['Cash', 'Check', 'Credit Card', 'Debit Card', 'Other']
        ]
    },
    bar:{
        width:{
            ratio:.3
        }
    },
    color:{
        pattern: ['#9bb26c','#2a2b2f', '#484a51', '#6c6f7a', '#fec627']
    },
    axis: {
        x: {
            type: 'category',
            categories: ['Value','Volume']
        },
        y:{
          label:'%',
          max:100,
          min:10
        },
        rotated:true
    },
    grid: {
      y:{
        show:true
      }
    }
});
/*parallax*/

/*!
 * parallax.js v1.4.2 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */

;(function ( $, window, document, undefined ) {

  // Polyfill for requestAnimationFrame
  // via: https://gist.github.com/paulirish/1579671

  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
        || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());


  // Parallax Constructor

  function Parallax(element, options) {
    var self = this;

    if (typeof options == 'object') {
      delete options.refresh;
      delete options.render;
      $.extend(this, options);
    }

    this.$element = $(element);

    if (!this.imageSrc && this.$element.is('img')) {
      this.imageSrc = this.$element.attr('src');
    }

    var positions = (this.position + '').toLowerCase().match(/\S+/g) || [];

    if (positions.length < 1) {
      positions.push('center');
    }
    if (positions.length == 1) {
      positions.push(positions[0]);
    }

    if (positions[0] == 'top' || positions[0] == 'bottom' || positions[1] == 'left' || positions[1] == 'right') {
      positions = [positions[1], positions[0]];
    }

    if (this.positionX != undefined) positions[0] = this.positionX.toLowerCase();
    if (this.positionY != undefined) positions[1] = this.positionY.toLowerCase();

    self.positionX = positions[0];
    self.positionY = positions[1];

    if (this.positionX != 'left' && this.positionX != 'right') {
      if (isNaN(parseInt(this.positionX))) {
        this.positionX = 'center';
      } else {
        this.positionX = parseInt(this.positionX);
      }
    }

    if (this.positionY != 'top' && this.positionY != 'bottom') {
      if (isNaN(parseInt(this.positionY))) {
        this.positionY = 'center';
      } else {
        this.positionY = parseInt(this.positionY);
      }
    }

    this.position =
      this.positionX + (isNaN(this.positionX)? '' : 'px') + ' ' +
      this.positionY + (isNaN(this.positionY)? '' : 'px');

    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      if (this.imageSrc && this.iosFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position
        });
      }
      return this;
    }

    if (navigator.userAgent.match(/(Android)/)) {
      if (this.imageSrc && this.androidFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position
        });
      }
      return this;
    }

    this.$mirror = $('<div />').prependTo('body');

    var slider = this.$element.find('>.parallax-slider');
    var sliderExisted = false;

    if (slider.length == 0)
      this.$slider = $('<img />').prependTo(this.$mirror);
    else {
      this.$slider = slider.prependTo(this.$mirror)
      sliderExisted = true;
    }

    this.$mirror.addClass('parallax-mirror').css({
      visibility: 'hidden',
      zIndex: this.zIndex,
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden'
    });

    this.$slider.addClass('parallax-slider').one('load', function() {
      if (!self.naturalHeight || !self.naturalWidth) {
        self.naturalHeight = this.naturalHeight || this.height || 1;
        self.naturalWidth  = this.naturalWidth  || this.width  || 1;
      }
      self.aspectRatio = self.naturalWidth / self.naturalHeight;

      Parallax.isSetup || Parallax.setup();
      Parallax.sliders.push(self);
      Parallax.isFresh = false;
      Parallax.requestRender();
    });

    if (!sliderExisted)
      this.$slider[0].src = this.imageSrc;

    if (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || slider.length > 0) {
      this.$slider.trigger('load');
    }

  };


  // Parallax Instance Methods

  $.extend(Parallax.prototype, {
    speed:    0.2,
    bleed:    0,
    zIndex:   -100,
    iosFix:   true,
    androidFix: true,
    position: 'center',
    overScrollFix: false,

    refresh: function() {
      this.boxWidth        = this.$element.outerWidth();
      this.boxHeight       = this.$element.outerHeight() + this.bleed * 2;
      this.boxOffsetTop    = this.$element.offset().top - this.bleed;
      this.boxOffsetLeft   = this.$element.offset().left;
      this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;

      var winHeight = Parallax.winHeight;
      var docHeight = Parallax.docHeight;
      var maxOffset = Math.min(this.boxOffsetTop, docHeight - winHeight);
      var minOffset = Math.max(this.boxOffsetTop + this.boxHeight - winHeight, 0);
      var imageHeightMin = this.boxHeight + (maxOffset - minOffset) * (1 - this.speed) | 0;
      var imageOffsetMin = (this.boxOffsetTop - maxOffset) * (1 - this.speed) | 0;

      if (imageHeightMin * this.aspectRatio >= this.boxWidth) {
        this.imageWidth    = imageHeightMin * this.aspectRatio | 0;
        this.imageHeight   = imageHeightMin;
        this.offsetBaseTop = imageOffsetMin;

        var margin = this.imageWidth - this.boxWidth;

        if (this.positionX == 'left') {
          this.offsetLeft = 0;
        } else if (this.positionX == 'right') {
          this.offsetLeft = - margin;
        } else if (!isNaN(this.positionX)) {
          this.offsetLeft = Math.max(this.positionX, - margin);
        } else {
          this.offsetLeft = - margin / 2 | 0;
        }
      } else {
        this.imageWidth    = this.boxWidth;
        this.imageHeight   = this.boxWidth / this.aspectRatio | 0;
        this.offsetLeft    = 0;

        var margin = this.imageHeight - imageHeightMin;

        if (this.positionY == 'top') {
          this.offsetBaseTop = imageOffsetMin;
        } else if (this.positionY == 'bottom') {
          this.offsetBaseTop = imageOffsetMin - margin;
        } else if (!isNaN(this.positionY)) {
          this.offsetBaseTop = imageOffsetMin + Math.max(this.positionY, - margin);
        } else {
          this.offsetBaseTop = imageOffsetMin - margin / 2 | 0;
        }
      }
    },

    render: function() {
      var scrollTop    = Parallax.scrollTop;
      var scrollLeft   = Parallax.scrollLeft;
      var overScroll   = this.overScrollFix ? Parallax.overScroll : 0;
      var scrollBottom = scrollTop + Parallax.winHeight;

      if (this.boxOffsetBottom > scrollTop && this.boxOffsetTop <= scrollBottom) {
        this.visibility = 'visible';
        this.mirrorTop = this.boxOffsetTop  - scrollTop;
        this.mirrorLeft = this.boxOffsetLeft - scrollLeft;
        this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed);
      } else {
        this.visibility = 'hidden';
      }

      this.$mirror.css({
        transform: 'translate3d(0px, 0px, 0px)',
        visibility: this.visibility,
        top: this.mirrorTop - overScroll,
        left: this.mirrorLeft,
        height: this.boxHeight,
        width: this.boxWidth
      });

      this.$slider.css({
        transform: 'translate3d(0px, 0px, 0px)',
        position: 'absolute',
        top: this.offsetTop,
        left: this.offsetLeft,
        height: this.imageHeight,
        width: this.imageWidth,
        maxWidth: 'none'
      });
    }
  });


  // Parallax Static Methods

  $.extend(Parallax, {
    scrollTop:    0,
    scrollLeft:   0,
    winHeight:    0,
    winWidth:     0,
    docHeight:    1 << 30,
    docWidth:     1 << 30,
    sliders:      [],
    isReady:      false,
    isFresh:      false,
    isBusy:       false,

    setup: function() {
      if (this.isReady) return;

      var $doc = $(document), $win = $(window);

      var loadDimensions = function() {
        Parallax.winHeight = $win.height();
        Parallax.winWidth  = $win.width();
        Parallax.docHeight = $doc.height();
        Parallax.docWidth  = $doc.width();
      };

      var loadScrollPosition = function() {
        var winScrollTop  = $win.scrollTop();
        var scrollTopMax  = Parallax.docHeight - Parallax.winHeight;
        var scrollLeftMax = Parallax.docWidth  - Parallax.winWidth;
        Parallax.scrollTop  = Math.max(0, Math.min(scrollTopMax,  winScrollTop));
        Parallax.scrollLeft = Math.max(0, Math.min(scrollLeftMax, $win.scrollLeft()));
        Parallax.overScroll = Math.max(winScrollTop - scrollTopMax, Math.min(winScrollTop, 0));
      };

      $win.on('resize.px.parallax load.px.parallax', function() {
          loadDimensions();
          Parallax.isFresh = false;
          Parallax.requestRender();
        })
        .on('scroll.px.parallax load.px.parallax', function() {
          loadScrollPosition();
          Parallax.requestRender();
        });

      loadDimensions();
      loadScrollPosition();

      this.isReady = true;
    },

    configure: function(options) {
      if (typeof options == 'object') {
        delete options.refresh;
        delete options.render;
        $.extend(this.prototype, options);
      }
    },

    refresh: function() {
      $.each(this.sliders, function(){ this.refresh() });
      this.isFresh = true;
    },

    render: function() {
      this.isFresh || this.refresh();
      $.each(this.sliders, function(){ this.render() });
    },

    requestRender: function() {
      var self = this;

      if (!this.isBusy) {
        this.isBusy = true;
        window.requestAnimationFrame(function() {
          self.render();
          self.isBusy = false;
        });
      }
    },
    destroy: function(el){
      var i,
          parallaxElement = $(el).data('px.parallax');
      parallaxElement.$mirror.remove();
      for(i=0; i < this.sliders.length; i+=1){
        if(this.sliders[i] == parallaxElement){
          this.sliders.splice(i, 1);
        }
      }
      $(el).data('px.parallax', false);
      if(this.sliders.length === 0){
        $(window).off('scroll.px.parallax resize.px.parallax load.px.parallax');
        this.isReady = false;
        Parallax.isSetup = false;
      }
    }
  });


  // Parallax Plugin Definition

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var options = typeof option == 'object' && option;

      if (this == window || this == document || $this.is('body')) {
        Parallax.configure(options);
      }
      else if (!$this.data('px.parallax')) {
        options = $.extend({}, $this.data(), options);
        $this.data('px.parallax', new Parallax(this, options));
      }
      else if (typeof option == 'object')
      {
        $.extend($this.data('px.parallax'), options);
      }
      if (typeof option == 'string') {
        if(option == 'destroy'){
            Parallax['destroy'](this);
        }else{
          Parallax[option]();
        }
      }
    })
  };

  var old = $.fn.parallax;

  $.fn.parallax             = Plugin;
  $.fn.parallax.Constructor = Parallax;


  // Parallax No Conflict

  $.fn.parallax.noConflict = function () {
    $.fn.parallax = old;
    return this;
  };


  // Parallax Data-API

  $(document).on('ready.px.parallax.data-api', function () {
    $('[data-parallax="scroll"]').parallax();
  });

}(jQuery, window, document));


//back to top button
$(window).scroll(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
          $('#top').fadeIn(200);
        } else {
          $('#top').fadeOut(200);
        }
      });
      // Animate the scroll to top
      $('#top').click(function(event) {
        event.preventDefault();
        
        $('html, body').animate({scrollTop: 0}, 300);
      })
    });


//video plug-in//
videojs('bg-video').Background({
      container   : 'full-vid'
    });