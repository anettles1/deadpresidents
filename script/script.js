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
    data: {
        columns: [
            ['Usage', 57, 33, 33, 33, 35, 33,33],
            ['Preference', 55, 29, 22, 16, 16, 14, 10],
        ],
        types: {
            Usage: 'bar',
            Preference: 'line',
        },
    
    },

    //axis
    axis: {
        y2: {
            show: true,
            label:'% of customers'
        },

        x : {
            type : 'category',
            categories: ['Less than $25K', '$25K to $50K', '$50K to $75K', '$75K to $100K', '$125K to $200K', '$200K Plus'],
        },
    },
    //grid
    grid: {
        y: {
            max: 100,
            min: 0,
            lines: [
                {value: 33, text: 'one third of monthly transactions', axis:'y1', position:'middle'},
                ]
            },
    },

    color:{
        pattern: ['#47582c','#fec627']
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
      ['Debit', 30.5,29.9,31.3],
      ['Payment Cards', 51.7,52.8,54.7],      
      ['Cash', 27.6,26.8,26.3],
      ['Money Order', 5,0.8,0.5],
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
  y: {
     label: {
       text: 'Share of Consumer Payments',
     }
        },
  }
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
      ['Used mobile payments on an annual basis', 12.3, 18, 35.9],
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
         text: 'Share of Consumer Payments',
       }
          },
  },
  grid: {
        y: {
            show:true
        }
       
    },      
  color:{
        pattern: ['#0b0b0b','#2a2b2f', '#484a51', '#6c6f7a','#9599a5', '#babdc4', '#9bb26c', '#fec627' ]
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
  y: {
     label: {
       text: 'Share of Consumer Payments',
     }
        },
  }
  }                  
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
        rotated:true
    },
});
